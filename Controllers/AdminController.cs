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
    [Authorize]
    [Authorize (Roles = "Admin")]
    [Route("api/admin/users")]
    public class AdminUserController : ControllerBase
    {
        private readonly UserManager<Domain.Auth.User> _userManager;

        public AdminUserController(UserManager<Domain.Auth.User> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/admin/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
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
