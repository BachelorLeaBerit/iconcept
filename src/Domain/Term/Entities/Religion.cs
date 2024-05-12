
using src.Domain.Term.Entities;

namespace iconcept.Domain.Term;
public class Religion : BaseEntity
 {
    public string ReligionName {get; set;}
    public List<ConceptTranslation> ConceptTranslations {get; } = [];
}