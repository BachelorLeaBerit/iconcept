using MediatR;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.Auth.Pipelines.Commands;
public class AssignRole
{
    public record Request(string UserId, string RoleName) : IRequest<bool>;

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
            var existingRoles = await _userManager.GetRolesAsync(user);
            if (existingRoles.Count > 0)
            {
                var removeResult = await _userManager.RemoveFromRolesAsync(user, existingRoles);
                if (!removeResult.Succeeded)
                {
                    return false;
                }
            }
            var result = await _userManager.AddToRoleAsync(user, request.RoleName);
            return result.Succeeded;
        }
    }
}
