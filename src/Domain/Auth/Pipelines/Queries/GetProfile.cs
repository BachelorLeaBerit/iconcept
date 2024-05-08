using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using MediatR;
using System.Security.Claims;

namespace iconcept.Domain.Auth.Pipelines.Queries
{
    public class GetUserProfile
    {
        public record Request(ClaimsPrincipal User) : IRequest<IActionResult>;

        public class Handler : IRequestHandler<Request, IActionResult>
        {
            private readonly UserManager<User> _userManager;

            public Handler(UserManager<User> userManager)
            {
                _userManager = userManager;
            }

            public async Task<IActionResult> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _userManager.GetUserAsync(request.User);
                if (user == null)
                {
                    return new NotFoundResult();
                }

                var email = user.Email;
                var role = await _userManager.GetRolesAsync(user);

                var firstNameClaim = request.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName);
                var lastNameClaim = request.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname);
                var firstName = firstNameClaim?.Value;
                var lastName = lastNameClaim?.Value;

                var userProfile = new
                {
                    user.Id,
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    Role = role
                };

                return new OkObjectResult(userProfile);
            }
        }
    }
}
