using iconcept.Domain.Term;
using iconcept.Domain.Term.Pipelines;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;

public class ConceptTranslationDto
{
    public int Id { get; set; }
    public string? NorwegianDefinition { get; set; }
    public string? Context { get; set; }
    public string Translation { get; set; }
    public string? EditedTranslation {get; set;}
    public Status Status { get; set; }
    public DateTime LastModified { get; set; }
    public string? Comment { get; set; }
    public List<string> Regions { get; set; }
    public List<string> Countries { get; set; }
    public List<string> Religions { get; set; }
    public List<string> Feelings { get; set; }
    public string TermName { get; set; }
    public string? EditorEmail { get; set; }
}

public class RegionDto
{
    public int RegionId { get; set; }
    public string RegionName { get; set; }

}

public class CountryDto
{
    public int CountryId { get; set; }
    public string CountryName { get; set; }

}

public class ReligionDto
{
    public int ReligionId { get; set; }
    public string ReligionName { get; set; }

}

public class FeelingDto
{
    public int FeelingId { get; set; }
    public string FeelingName { get; set; }

}