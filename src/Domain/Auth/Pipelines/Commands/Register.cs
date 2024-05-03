using iconcept.Domain.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
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

    public RegisterUserHandler(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
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

