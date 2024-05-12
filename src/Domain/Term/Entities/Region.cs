
using src.Domain.Term.Entities;

namespace iconcept.Domain.Term;

public class Region : BaseEntity
 {
    public string RegionName {get; set;}
    public List<ConceptTranslation> ConceptTranslations {get;} = [];
}