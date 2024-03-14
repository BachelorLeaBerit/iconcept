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
        [HttpGet]
        public IActionResult GetUserProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var role = User.FindFirstValue(ClaimTypes.Role);
            var FirstName = User.FindFirstValue("FirstName");
            var LastName = User.FindFirstValue("LastName");


            // Construct the profile object
            var userProfile = new
            {
                Email = email,
                FirstName,
                LastName,
                Role = role
                // Add other profile properties here
            };

            return Ok(userProfile);
        }
    }
}
