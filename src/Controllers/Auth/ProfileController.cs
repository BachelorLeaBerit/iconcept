using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using iconcept.Domain.Auth.Pipelines.Queries;
using iconcept.Domain.Auth.Pipelines.Commands;

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
        var userClaims = HttpContext.User;

        var request = new GetUserProfile.Request(userClaims);
        var response = await _mediator.Send(request);

        return response;
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