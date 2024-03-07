using MediatR;
using Microsoft.AspNetCore.Mvc;
using iconcept.Domain.Auth.Pipelines;

namespace iconcept.Controllers
{
    [ApiController]
    [Route("api/users/logout")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _mediator.Send(new LogoutUser.Request());
            return Ok(); // or return any other appropriate response
        }
    }
}
