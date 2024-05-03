using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace iconcept.Domain.Auth.Pipelines.Queries;

public class GetUserProfile
{
    public record Request(string UserId, string Email, string Role, string FirstName, string LastName) : IRequest<IActionResult>;

    public class Handler : IRequestHandler<Request, IActionResult>
    {
        public async Task<IActionResult> Handle(Request request, CancellationToken cancellationToken)
        {
            var userProfile = new
            {
                Id = request.UserId,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Role = request.Role
            };

            return new OkObjectResult(userProfile);
        }
    }
}

