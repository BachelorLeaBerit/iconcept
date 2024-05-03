using MediatR;
using Microsoft.AspNetCore.Mvc;
using iconcept.Domain.Auth.Pipelines.Commands;
using Microsoft.AspNetCore.Authorization;

namespace iconcept.Controllers.Auth;

[ApiController]
[Route("api/logout")]
[Authorize]
public class LogoutController : ControllerBase
{
    private readonly IMediator _mediator;

    public LogoutController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await _mediator.Send(new LogoutUser.Request());
        return Ok();
    }
}

