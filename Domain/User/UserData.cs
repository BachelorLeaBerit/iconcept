using System.Net.Mail;

namespace iconcept.Domain.User
{
    public record UserData(string? FirstName, string? SurName, string Email, string Password);
}