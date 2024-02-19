using iconcept.Domain.User;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.User.Pipelines;
public class RegisterUser
{
    public record Request(UserData RegisterData) : IRequest<UserResponse>;

    public class Handler : IRequestHandler<Request, UserResponse>
    {
        private readonly UserManager<User> _userManager;

        public Handler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<UserResponse> Handle(Request request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                Username = request.RegisterData.Username,
                
            };
            var result = await _userManager.CreateAsync(user, request.RegisterData.Password);
            var errList = new List<string>();
            foreach (var err in result.Errors)
            {
                errList.Add(err.Description);
            }

            return new UserResponse(result.Succeeded, errList.ToArray());
        }
    }
}
