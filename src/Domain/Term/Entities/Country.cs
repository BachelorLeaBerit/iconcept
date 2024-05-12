using iconcept.Domain.Term;
using src.Domain.Term.Entities;

namespace iconcept.Domain.Term;

public class Country : BaseEntity
 {
    public string CountryName {get; set;}
    public List<ConceptTranslation> ConceptTranslations {get; set;} = [];
}