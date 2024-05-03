using iconcept.Domain.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iconcept.Domain.Auth.Pipelines.Commands;

public class RegisterUser
{
    public record Request(RegisterData RegisterData) : IRequest<UserResponse>;

    public class Handler : IRequestHandler<Request, UserResponse>
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public Handler(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<UserResponse> Handle(Request request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.RegisterData.FirstName) || request.RegisterData.FirstName.Length < 2 || request.RegisterData.FirstName.Length > 50)
            {
                return new UserResponse(false, ["Fornavn må være mellom 2 og 50 tegn langt."]);
            }

            if (string.IsNullOrWhiteSpace(request.RegisterData.LastName) || request.RegisterData.LastName.Length < 2 || request.RegisterData.LastName.Length > 50)
            {
                return new UserResponse(false, ["Etternavn må være mellom 2 og 50 tegn langt."]);
            }

            var user = new User
            {
                FirstName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(request.RegisterData.FirstName.ToLower()),
                LastName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(request.RegisterData.LastName.ToLower()),
                Email = request.RegisterData.Email,
                UserName = request.RegisterData.Email
            };

            var result = await _userManager.CreateAsync(user, request.RegisterData.Password);
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
}

