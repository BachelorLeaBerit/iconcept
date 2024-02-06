using iconcept.Domain.User;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.User.Pipelines;
public class LoginUser
{
    public record Request(UserData LoginData) : IRequest<UserResponse>;

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
                    "Email or password is wrong"
                };
            if (user is null)
            {
                return new UserResponse(false, err.ToArray());
            }

            var result = await _signInManager.PasswordSignInAsync(user, request.LoginData.Password, false, false);
            if (!result.Succeeded)
            {
                return new UserResponse(false, err.ToArray());
            }

            return new UserResponse(result.Succeeded, Array.Empty<string>());
        }
    }
}