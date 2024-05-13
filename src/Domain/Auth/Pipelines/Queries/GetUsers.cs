using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using iconcept.Domain.Auth.Entities;


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
                    User = u 
                })
                .ToListAsync();

            var usersAsObjects = new List<object>();

            foreach (var user in usersWithRoles)
            {
                var roles = await _userManager.GetRolesAsync(user.User);

                var userObject = new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    Roles = (object)roles
                };

                usersAsObjects.Add(userObject);
            }

            return usersAsObjects;
        }
    }
}
