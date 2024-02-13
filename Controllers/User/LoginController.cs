using iconcept.Domain.User;
using iconcept.Domain.User.Pipelines;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace iconcept.Controllers.User
{
    [Route("api/login")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserData loginData)
        {
            //HttpContext.Log();
            var result = await _mediator.Send(new LoginUser.Request(loginData));
            if (result.IsSuccess)
            {
                return Ok(new RouteResponse<string>(loginData.Email, result.Errors));
            }

            return Unauthorized(new RouteResponse<string>(loginData.Email, result.Errors));
        }
    }
}