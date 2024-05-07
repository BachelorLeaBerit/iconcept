using MediatR;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.Auth.Pipelines.Commands;
public class LoginUser
{
    public record Request(LoginData LoginData) : IRequest<UserResponse>;

    public class Handler : IRequestHandler<Request, UserResponse>
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public Handler(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<UserResponse> Handle(Request request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.LoginData.Email);
            var err = new List<string>
                {
                    "E-post eller passord ikke korrekt."
                };
            if (user is null)
            {
                return new UserResponse(false, [.. err]);
            }

            var result = await _signInManager.PasswordSignInAsync(user, request.LoginData.Password, false, false);
            if (!result.Succeeded)
            {
                return new UserResponse(false, [.. err]);
            }

            return new UserResponse(result.Succeeded, []);
        }
    }
}
