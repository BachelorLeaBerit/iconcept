using System.Net.Mail;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.User;

public class User : IdentityUser
{
    public string Username { get; set; }

    public string Password { get; set; }
}