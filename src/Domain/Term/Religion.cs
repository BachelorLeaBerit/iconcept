
namespace iconcept.Domain.Term;
public class Religion {
    public int Id {get; set;}
    public string ReligionName {get; set;}
    public List<ConceptTranslation> ConceptTranslations {get; } = [];
}