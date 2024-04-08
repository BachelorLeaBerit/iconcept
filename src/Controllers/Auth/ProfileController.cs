using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using iconcept.Domain.Auth.Pipelines;

namespace iconcept.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/profile")]
    public class UserProfileController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public IActionResult GetUserProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var role = User.FindFirstValue(ClaimTypes.Role);
            var FirstName = User.FindFirstValue("FirstName");
            var LastName = User.FindFirstValue("LastName");

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var Id = userIdClaim?.Value;

            var userProfile = new
            {
                Id,
                Email = email,
                FirstName,
                LastName,
                Role = role
            };

            return Ok(userProfile);
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var command = new DeleteUser.Request(userId);
            var result = await _mediator.Send(command);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
