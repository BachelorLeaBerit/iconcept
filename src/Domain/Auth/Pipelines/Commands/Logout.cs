using MediatR;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.Auth.Pipelines.Commands;
public class LogoutUser
{
    public record Request() : IRequest;

    public class Handler : IRequestHandler<Request>
    {
        private readonly SignInManager<User> _signInManager;

        public Handler(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task Handle(Request request, CancellationToken cancellationToken)
        {
            await _signInManager.SignOutAsync();
            return;
        }
    }
}
