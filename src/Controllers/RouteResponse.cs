namespace iconcept.Controllers
{
    public record RouteResponse<T>(T Data, string[] Errors);
}