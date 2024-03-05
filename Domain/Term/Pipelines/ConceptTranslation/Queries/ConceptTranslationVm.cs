using iconcept.Domain.Term;
using iconcept.Domain.Term.Pipelines;

public class ConceptTranslationViewModel
{
    public int Id { get; set; }
    public string? NorwegianDefinition { get; set; }
    public string? Context { get; set; }
    public string Translation { get; set; }
    public Status Status { get; set; }
    public DateTime LastModified { get; set; }
    public string? Comment { get; set; }
    public List<RegionViewModel> Regions { get; set; }
    public List<CountryViewModel> Countries { get; set; }
    public List<ReligionVm> Religions { get; set; }
    public List<FeelingVm> Feelings { get; set; }
    public string TermName { get; set; }
    public string? EditedTranslation { get; set; }
}