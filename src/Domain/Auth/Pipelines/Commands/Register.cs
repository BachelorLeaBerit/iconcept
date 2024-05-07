using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Globalization;
using System.Security.Claims;


namespace iconcept.Domain.Auth.Pipelines.Commands;

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
            new(ClaimTypes.GivenName, user.FirstName),
            new(ClaimTypes.Surname, user.LastName)
        };

        var identityResult = await _userManager.AddClaimsAsync(user, claims);
        if (!identityResult.Succeeded)
        {
            return new UserResponse(false, identityResult.Errors.Select(err => err.Description).ToArray());
        }

        var roleExists = await _roleManager.RoleExistsAsync("Bruker");
            if (roleExists)
            {
                await _userManager.AddToRoleAsync(user, "Bruker");
            }
            else
            {
                return new UserResponse(false, ["Standardrollen 'Bruker' eksisterer ikke."]);
            }

        return new UserResponse(true, null);
    }
}

