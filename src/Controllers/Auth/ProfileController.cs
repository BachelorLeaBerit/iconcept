using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using iconcept.Domain.Auth.Pipelines;

namespace iconcept.Controllers.Auth;

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
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var email = User.FindFirstValue(ClaimTypes.Email);
        var role = User.FindFirstValue(ClaimTypes.Role);
        var firstName = User.FindFirstValue("FirstName");
        var lastName = User.FindFirstValue("LastName");

        var request = new GetUserProfile.Request(userId, email, role, firstName, lastName);
        return await _mediator.Send(request);
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

