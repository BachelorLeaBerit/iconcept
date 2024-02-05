
public class Term {

    public int Id { get; set; }
    public string TermName { get; set; }
    public ICollection<ConceptTranslation> ConceptTranslations { get; } = new List<ConceptTranslation>();
}