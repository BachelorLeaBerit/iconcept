namespace iconcept.Domain.Term;
public class Term {

    public int Id { get; set; }
    public string TermName { get; set; }
    public ICollection<ConceptTranslation> ConceptTranslations { get; set;} = new List<ConceptTranslation>();
}