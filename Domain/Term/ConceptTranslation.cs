using System.Text.Json.Serialization;
using iconcept.Domain.Term;

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
    // [JsonIgnore]
    // public Term Term {get; set;} = null!;
    public int TermId { get; set; }
    public List<Religion> Religions { get; set; } = [];
    public List<Region> Regions { get; set; } = [];
}