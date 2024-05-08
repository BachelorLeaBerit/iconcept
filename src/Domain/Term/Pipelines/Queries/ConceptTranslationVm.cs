using iconcept.Domain.Term;
using iconcept.Domain.Term.Pipelines.Get;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;

public class ConceptTranslationViewModel
{
    public int Id { get; set; }
    public string? NorwegianDefinition { get; set; }
    public string? Context { get; set; }
    public string Translation { get; set; }
    public Status Status { get; set; }
    public DateTime LastModified { get; set; }
    public string? Comment { get; set; }
    public List<string> Regions { get; set; }
    public List<string> Countries { get; set; }
    public List<string> Religions { get; set; }
    public List<string> Feelings { get; set; }
    public string TermName { get; set; }
    public string? EditedTranslation { get; set; }
    public string? EditorEmail { get; set; }
}

public class RegionVm
{
    public string RegionName { get; set; }
}

public class CountryVm
{
    public string CountryName { get; set; }
}

public class FeelingVm
{
    public string FeelingName { get; set; }

}

public class ReligionVm
{
    public string ReligionName { get; set; }
}