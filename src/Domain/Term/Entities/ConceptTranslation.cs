using System.Text.Json.Serialization;

namespace iconcept.Domain.Term;
public class ConceptTranslation
{

    public int Id { get; set; }
    public string? NorwegianDefinition { get; set; }
    public string? Context { get; set; }
    public string Translation { get; set; }
    public string? EditedTranslation { get; set; }
    public Status Status { get; set; }
    public DateTime LastModified { get; set; }
    public string? Comment { get; set; }
    public List<Feeling> Feelings { get; set; } = [];
    public List<Country> Countries { get; set; } = [];
    public int TermId { get; set; }
    public List<Religion> Religions { get; set; } = [];
    public List<Region> Regions { get; set; } = [];
    public string? EditorEmail { get; set; }
}