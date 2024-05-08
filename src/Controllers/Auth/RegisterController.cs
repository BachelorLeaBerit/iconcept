using MediatR;
using Microsoft.AspNetCore.Mvc;
using iconcept.Domain.Auth.Pipelines.Commands;
using CleanArchitecture.WebUI.Filters;

namespace iconcept.Controllers.Auth
{
    [Route("api/register")]
    [ApiExceptionFilter]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IMediator _mediator;
        public RegisterController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
        {
            try
            {
                var result = await _mediator.Send(command);

                if (result.IsSuccess)
                {
                    return Created(nameof(Register), new RouteResponse<string>(command.Email, null));
                }

                else
                {
                    return BadRequest(new { message = "Registrering mislyktes", errors = result.Errors });
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(new { message = "En feil oppstod under registrering." });
            }
        }
    }
}
