using System.Threading.Tasks;
using CleanArchitecture.WebUI.Filters;
using iconcept.Domain.Auth;
using iconcept.Domain.Auth.Pipelines;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using static iconcept.Domain.Auth.Pipelines.RegisterUser;

namespace iconcept.Controllers.Auth;
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
                if (result.Errors.Any())
                {
                    var validationErrors = result.Errors.ToArray();
                    return BadRequest(new RouteResponse<string>(null, validationErrors));
                }
                else
                {
                    return BadRequest(new RouteResponse<string>(null, new[] { "Registration failed" }));
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return BadRequest(new RouteResponse<string>(null, new[] { "An error occurred while processing your request" }));
        }
    }
}
