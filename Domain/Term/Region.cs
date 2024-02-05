
namespace iconcept.Domain.Term;

public class Region {
    public int Id {get; set;}
    public string RegionName {get; set;}
    public ICollection<Country> Countries { get; } = new List<Country>();
    public List<ConceptTranslation> ConceptTranslations {get;} = [];
}