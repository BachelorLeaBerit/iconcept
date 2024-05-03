using iconcept.Domain.Auth;
using iconcept.Domain.Auth.Pipelines.Commands;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace iconcept.Controllers.Auth;

[Route("api/login")]
[ApiController]

public class LoginController : ControllerBase
{
    private readonly IMediator _mediator;

    private readonly UserManager<User> _userManager;

    public LoginController(IMediator mediator, UserManager<User> userManager)
    {
        _mediator = mediator;
        _userManager = userManager;

    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginData loginData)
    {
        var result = await _mediator.Send(new LoginUser.Request(loginData));
        if (result.IsSuccess)
        {
            var user = await _userManager.FindByEmailAsync(loginData.Email);
            if (user != null)
            {
                var role = await _userManager.GetRolesAsync(user);

                var responseData = new
                {
                    user.Email,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    role
                };
                return Ok(new RouteResponse<object>(responseData, result.Errors));
            }
            else
            {
                return NotFound();
            }
        }

        return Unauthorized(new RouteResponse<string>(loginData.Email, result.Errors));
    }
}
