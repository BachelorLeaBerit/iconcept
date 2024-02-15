using System.Threading.Tasks;
using iconcept.Domain.User;
using iconcept.Domain.User.Pipelines;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace iconcept.Controllers.User
{
    [Route("api/register")]
    [ApiController]

    public class RegisterController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Post(UserData registerData)
        {
            var result = await _mediator.Send(new RegisterUser.Request(registerData));
            if (result.IsSuccess)
            {
                return Created(nameof(Post), new RouteResponse<string>(registerData.FirstName, result.Errors));
            }

            return Ok(new RouteResponse<string>(registerData.FirstName, result.Errors));
        }
    }
}
