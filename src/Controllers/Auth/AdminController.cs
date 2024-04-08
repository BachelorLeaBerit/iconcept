using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using iconcept.Domain.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using iconcept.Domain.Auth.Pipelines;
using MediatR;
using System.Security.Claims;

namespace iconcept.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    public class AdminUserController : ControllerBase
    {
        private readonly UserManager<Domain.Auth.User> _userManager;

        private readonly IMediator _mediator;

        public AdminUserController(UserManager<Domain.Auth.User> userManager, IMediator mediator)
        {
            _userManager = userManager;
            _mediator = mediator;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var usersWithRoles = await _userManager.Users
            .Select(u => new
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Roles = _userManager.GetRolesAsync(u).Result.ToList()
            })
           .ToListAsync();

            return Ok(usersWithRoles);
        }

        // POST: api/admin/users/{userId}/assign-role
        [HttpPost("{userId}/assign-role")]
        public async Task<IActionResult> AssignRole(string userId, [FromBody] string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            // Remove existing roles for the user
            var existingRoles = await _userManager.GetRolesAsync(user);
            if (existingRoles.Any())
            {
                var removeResult = await _userManager.RemoveFromRolesAsync(user, existingRoles);
                if (!removeResult.Succeeded)
                {
                    return BadRequest(removeResult.Errors);
                }
            }

            // Assign the new role to the user
            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            // Get the current user's ID
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Check if the user to be deleted is the same as the current user
            if (userId == currentUserId)
            {
                return BadRequest("Cannot delete yourself.");
            }

            // Proceed with deletion
            var result = await _mediator.Send(new DeleteUser.Request(userId));
            if (result)
            {
                return Ok("User deleted successfully.");
            }
            else
            {
                return NotFound("User not found or deletion failed.");
            }
        }
    }
}
