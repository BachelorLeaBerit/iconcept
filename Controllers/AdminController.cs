using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using iconcept.Domain.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace iconcept.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    public class AdminUserController : ControllerBase
    {
        private readonly UserManager<Domain.Auth.User> _userManager;

        public AdminUserController(UserManager<Domain.Auth.User> userManager)
        {
            _userManager = userManager;
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

    }

}
