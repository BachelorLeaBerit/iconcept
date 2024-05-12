using src.Domain.Term.Entities;

namespace iconcept.Domain.Term;
public class Term : BaseEntity
{

    public string TermName { get; set; }
    public ICollection<ConceptTranslation> ConceptTranslations { get; set;} = new List<ConceptTranslation>();
}