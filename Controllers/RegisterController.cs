using System.Threading.Tasks;
using iconcept.Domain.User;
using iconcept.Domain.User.Pipelines;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace iconcept.Controllers
{
    [Route("api/register")]
    [ApiController]

    public class RegisterController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RegisterController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Post( UserData registerData)
        {
            var result = await _mediator.Send(new RegisterUser.Request(registerData));
            if (result.IsSuccess)
            {
                return Created(nameof(Post), new RouteResponse<string>(registerData.Username, result.Errors));
            }

            return Ok(new RouteResponse<string>(registerData.Username, result.Errors));        }
    }

    
}
