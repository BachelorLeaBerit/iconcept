using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace iconcept.Domain.Auth.Pipelines.Queries;
public class GetUsers
{
    public record Request : IRequest<List<object>>;

    public class Handler : IRequestHandler<Request, List<object>>
    {
        private readonly UserManager<User> _userManager;

        public Handler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<List<object>> Handle(Request request, CancellationToken cancellationToken)
        {
            var usersWithRoles = await _userManager.Users
                .Select(u => new
                {
                    u.Id,
                    u.FirstName,
                    u.LastName,
                    u.Email,
                    Roles = _userManager.GetRolesAsync(u).Result.ToList()
                })
                .ToListAsync();

            var usersAsObjects = usersWithRoles.Select(u => new
            {
                u.Id,
                u.FirstName,
                u.LastName,
                u.Email,
                Roles = (object)u.Roles
            }).ToList<object>();

            return usersAsObjects;
        }
    }
}
