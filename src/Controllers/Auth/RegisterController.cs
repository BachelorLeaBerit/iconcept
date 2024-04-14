using System.Threading.Tasks;
using iconcept.Domain.Auth;
using iconcept.Domain.Auth.Pipelines;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace iconcept.Controllers.Auth;
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
            var result = await _mediator.Send(new RegisterUser.Request(registerData));
            
            if (result.IsSuccess)
            {
                return Created(nameof(Register), new RouteResponse<string>(registerData.Email, null));
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
