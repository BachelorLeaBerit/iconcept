using System.Net.Mail;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.Auth;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

}