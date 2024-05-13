using Microsoft.AspNetCore.Identity;

namespace iconcept.Domain.Auth.Entities;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public ICollection<IdentityUserRole<string>> Roles { get; set; }

}