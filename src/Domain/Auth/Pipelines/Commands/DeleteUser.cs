using MediatR;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.Auth.Pipelines.Commands;

public class DeleteUser
{
    public record Request(string UserId) : IRequest<bool>;

    public class Handler : IRequestHandler<Request, bool>
    {
        private readonly UserManager<User> _userManager;

        public Handler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> Handle(Request request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
            {
                return false;
            }

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }
    }
}

