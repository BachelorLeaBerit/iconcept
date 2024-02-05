using iconcept.Domain.Term;

public class Country {
    public int Id {get; set;}
    public string CountryName {get; set;}
    public Region? RegionName {get; set;}
    public int? RegionId {get; set;}
    public List<ConceptTranslation> ConceptTranslations {get;} = [];
}