using iconcept.Domain.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;

using System.Globalization; // Add this namespace for TextInfo

namespace iconcept.Domain.Auth.Pipelines
{
    public class RegisterUser
    {
        public record Request(RegisterData RegisterData) : IRequest<UserResponse>;

        public class Handler : IRequestHandler<Request, UserResponse>
        {
            private readonly UserManager<User> _userManager;
            private readonly RoleManager<IdentityRole> _roleManager;

            public Handler(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
            {
                _userManager = userManager;
                _roleManager = roleManager;
            }

            public async Task<UserResponse> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = new User
                {
                    FirstName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(request.RegisterData.FirstName.ToLower()),
                    LastName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(request.RegisterData.LastName.ToLower()),
                    Email = request.RegisterData.Email,
                    UserName = request.RegisterData.Email
                };
                
                var result = await _userManager.CreateAsync(user, request.RegisterData.Password);
                if (!result.Succeeded)
                {
                    var errList = result.Errors.Select(err => err.Description).ToList();
                    return new UserResponse(false, [.. errList]);
                }
                
                var roleExists = await _roleManager.RoleExistsAsync("Bruker");
                if (roleExists)
                {
                    await _userManager.AddToRoleAsync(user, "Bruker");
                }
                else
                {
                    return new UserResponse(false, ["Default rolle 'bruker' eksisterer ikke."]);
                }

                return new UserResponse(true, null);
            }
        }
    }
}
