using iconcept.Domain.Term;

namespace iconcept.Domain.Term;

public class Country {
    public int Id {get; set;}
    public string CountryName {get; set;}
    public List<ConceptTranslation> ConceptTranslations {get; set;} = [];
}