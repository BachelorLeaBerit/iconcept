using iconcept.Models.Term;

public class ConceptTranslation {
    public int Id {get; set;}
    public string? NorwegianDefinition {get; set;}
    public string? Context {get; set;}
    public string Translation {get; set;}
    public DateTime LastModified {get; set;}
    public string? Comment {get; set;}
    public List<Feeling> Feelings {get; } = [];
    public List<Country> Countries {get;} = [];
    public Term Term {get; set;} = null!;
    public int TermId {get; set;}
    public List<Religion> Religions {get; } = [];
    public List<Region> Regions {get; } = [];
}