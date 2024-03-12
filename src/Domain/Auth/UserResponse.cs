namespace iconcept.Domain.Auth
{
    public record UserResponse(bool IsSuccess, string[] Errors);
}