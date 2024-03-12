
namespace iconcept.Domain.Term;

public class Region {
    public int Id {get; set;}
    public string RegionName {get; set;}
    public List<ConceptTranslation> ConceptTranslations {get;} = [];
}