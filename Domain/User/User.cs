using System.Net.Mail;
using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.User;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

}