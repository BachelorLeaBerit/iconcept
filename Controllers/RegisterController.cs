using System.Threading.Tasks;
using iconcept.Domain.User;
using iconcept.Domain.User.Pipelines;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace iconcept.Controllers
{[Route("api/register")]
[ApiController]
public class RegisterController : ControllerBase
{
    private readonly IMediator _mediator;

    public RegisterController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Post(UserData registerData)
    {
        try
        {
            var result = await _mediator.Send(new RegisterUser.Request(registerData));
            
            if (result.IsSuccess)
            {
                return Created(nameof(Post), new RouteResponse<string>(registerData.Username, null));
            }
            else
            {
                // Handle validation errors
                if (result.Errors.Any())
                {
                    var validationErrors = result.Errors.ToArray();
                    return BadRequest(new RouteResponse<string>(null, validationErrors));
                }
                // Handle other types of errors
                else
                {
                    // Return a generic error message
                    return BadRequest(new RouteResponse<string>(null, new[] { "Registration failed" }));
                }
            }
        }
        catch (Exception ex)
        {
            // Log the exception
            Console.WriteLine(ex);
            // Return a generic error message
            return BadRequest(new RouteResponse<string>(null, new[] { "An error occurred while processing your request" }));
        }
    }
}
}
