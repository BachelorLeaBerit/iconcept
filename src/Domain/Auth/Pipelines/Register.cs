using iconcept.Domain.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;

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
                    FirstName = request.RegisterData.FirstName,
                    LastName = request.RegisterData.LastName,
                    Email = request.RegisterData.Email,
                    UserName = request.RegisterData.Email
                };
                
                // Create the user
                var result = await _userManager.CreateAsync(user, request.RegisterData.Password);
                if (!result.Succeeded)
                {
                    var errList = result.Errors.Select(err => err.Description).ToList();
                    return new UserResponse(false, errList.ToArray());
                }
                
                // Assign default role "bruker" to the user
                var roleExists = await _roleManager.RoleExistsAsync("Bruker");
                if (roleExists)
                {
                    await _userManager.AddToRoleAsync(user, "Bruker");
                }
                else
                {
                    // Handle if "bruker" role does not exist
                    return new UserResponse(false, new[] { "Default role 'bruker' does not exist." });
                }

                return new UserResponse(true, null);
            }
        }
    }
}
