namespace iconcept.Controllers.Auth
{
    public record RouteResponse<T>(T Data, string[] Errors);
}