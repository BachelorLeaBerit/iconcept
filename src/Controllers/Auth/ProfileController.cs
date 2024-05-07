using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using iconcept.Domain.Auth.Pipelines.Queries;
using iconcept.Domain.Auth.Pipelines.Commands;

namespace iconcept.Controllers.Auth
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
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
                var userClaims = HttpContext.User;

                var request = new GetUserProfile.Request(userClaims);
                var response = await _mediator.Send(request);

                return response;
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving user profile: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                var command = new DeleteUser.Request(userId);
                var result = await _mediator.Send(command);

                if (result)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Failed to delete user");
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error deleting user: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
