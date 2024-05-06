using iconcept.Domain.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace iconcept.Domain.Auth.Pipelines;

public record RegisterUserCommand : IRequest<UserResponse>
{
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public string Email { get; init; }
    public string Password { get; init; }
}

public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, UserResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private IOptions<IdentityOptions> _options;

    public RegisterUserHandler(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IOptions<IdentityOptions> options)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _options = options;
    }

    public async Task<UserResponse> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User
        {
            FirstName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(request.FirstName.ToLower()),
            LastName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(request.LastName.ToLower()),
            Email = request.Email,
            UserName = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            var errList = result.Errors.Select(err => err.Description).ToArray();
            return new UserResponse(false, errList);
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.GivenName, user.FirstName),
            new Claim(ClaimTypes.Surname, user.LastName)
        };

        var identityResult = await _userManager.AddClaimsAsync(user, claims);
        if (!identityResult.Succeeded)
        {
            // Handle claim addition failure
            return new UserResponse(false, identityResult.Errors.Select(err => err.Description).ToArray());
        }

        return new UserResponse(true, null);
    }
}

