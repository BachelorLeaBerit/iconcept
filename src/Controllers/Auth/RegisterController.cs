using MediatR;
using Microsoft.AspNetCore.Mvc;
using iconcept.Domain.Auth.Pipelines.Commands;
using iconcept.Domain.Auth;

namespace iconcept.Controllers.Auth
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
        public async Task<IActionResult> Register(RegisterData registerData)
        {
            try
            {
                // Proceed with user registration
                var result = await _mediator.Send(new RegisterUser.Request(registerData));

                if (result.IsSuccess)
                {
                    return Created(nameof(Register), new { message = "Registrering vellykket" });
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
