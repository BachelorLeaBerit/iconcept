using iconcept.Domain.Auth.Pipelines;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace iconcept.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/profile")]
    public class UserProfileController : ControllerBase
    {

        private readonly IMediator _mediator;
        
        [HttpGet]
        public IActionResult GetUserProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var role = User.FindFirstValue(ClaimTypes.Role);
            var FirstName = User.FindFirstValue("FirstName");
            var LastName = User.FindFirstValue("LastName");

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var Id = userIdClaim?.Value;

            // Construct the profile object
            var userProfile = new
            {
                Id,
                Email = email,
                FirstName,
                LastName,
                Role = role
                // Add other profile properties here
            };

            return Ok(userProfile);
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
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
