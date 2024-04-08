using iconcept.Domain.Auth;
using iconcept.Domain.Auth.Pipelines;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace iconcept.Controllers.User
{
    [Route("api/login")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly UserManager<Domain.Auth.User> _userManager;

        public LoginController(IMediator mediator, UserManager<Domain.Auth.User> userManager)
        {
            _mediator = mediator;
            _userManager = userManager;

        }

        [HttpPost]
        public async Task<IActionResult> Post(LoginData loginData)
        {
            var result = await _mediator.Send(new LoginUser.Request(loginData));
            if (result.IsSuccess)
            {
                // Fetch user by email
                var user = await _userManager.FindByEmailAsync(loginData.Email);
                if (user != null)
                {
                    // Fetch user roles
                    var role = await _userManager.GetRolesAsync(user);
                    // Include role in response data
                    var responseData = new
                    {
                        Email = user.Email,
                        Role = role.FirstOrDefault() // Assuming user has only one role
                    };
                    return Ok(new RouteResponse<object>(responseData, result.Errors));
                }
                else
                {
                    // User not found
                    return NotFound();
                }
            }

            return Unauthorized(new RouteResponse<string>(loginData.Email, result.Errors));
        }
    }
}