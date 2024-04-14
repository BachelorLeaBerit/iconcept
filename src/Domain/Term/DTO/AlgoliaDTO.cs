
namespace iconcept.Domain.Term.DTO;
public class AlgoliaDto
{
    public string ObjectID { get; set; }
    public string? NorwegianDefinition { get; set; }
    public string? Context { get; set; }
    public string Translation { get; set; }
    public IEnumerable<string> Regions { get; set; }
    public IEnumerable<string> Countries { get; set; }
    public IEnumerable<string> Religions { get; set; }
    public IEnumerable<string> Feelings { get; set; }
    public string TermName { get; set; }
    public string Comment { get; set; }
}