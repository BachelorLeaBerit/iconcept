using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines.SuggestTranslation;

public record SuggestTranslationCommand : IRequest<int>
{
    public string? NorwegianDefinition { get; init; }
    public string? Context { get; init; }
    public string Translation { get; init; }
    public string? Comment { get; init; }
    public IEnumerable<string> Feelings { get; init; }
    public IEnumerable<string> Countries { get; init; }
    public string TermName { get; init; }
    public IEnumerable<string> Religions { get; init; }
    public IEnumerable<string> Regions { get; init; }
}

public class SuggestTranslationHandler : IRequestHandler<SuggestTranslationCommand, int>
{
    private readonly ConceptDbContext _context;
    public SuggestTranslationHandler(ConceptDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(SuggestTranslationCommand request, CancellationToken cancellationToken)
    {
        var term = await _context.Terms.Where(t => t.TermName.ToLower() == request.TermName.ToLower().Trim()).FirstOrDefaultAsync();
        if (term == null)
        {
            var newTerm = new Term
            {
                TermName = request.TermName
            };
            _context.Terms.Add(newTerm);
            await _context.SaveChangesAsync(cancellationToken);
            term = newTerm;
        }


        var countries = new List<Country>();
        if (request.Countries.Count() != 0)
        {
            foreach (string countryName in request.Countries)
            {
                var country = await _context.Countries.Where(c => c.CountryName == countryName).FirstOrDefaultAsync();
                if (country == null){
                    var newCountry = new Country { CountryName = countryName };
                    _context.Countries.Add(newCountry);
                    await _context.SaveChangesAsync(cancellationToken);
                    country = newCountry;
                }
                countries.Add(country);
            }

        }

        var regions = new List<Region>();
        if (request.Regions.Count() != 0)
        {
            foreach (string regionName in request.Regions)
            {
                var region = await _context.Regions.Where(r => r.RegionName == regionName).FirstOrDefaultAsync();
                if (region == null){
                    var newRegion = new Region { RegionName = regionName };
                    _context.Regions.Add(newRegion);
                    await _context.SaveChangesAsync(cancellationToken);
                    region = newRegion;
                }
                regions.Add(region);
            }

        }

        var feelings = new List<Feeling>();
        if (request.Feelings.Count() != 0)
        {
            foreach (string feelingName in request.Feelings)
            {
                var feeling = await _context.Feelings.Where(f => f.FeelingName == feelingName).FirstOrDefaultAsync();
                if (feeling == null){
                    var newFeeling = new Feeling { FeelingName = feelingName };
                    _context.Feelings.Add(newFeeling);
                    await _context.SaveChangesAsync(cancellationToken);
                    feeling = newFeeling;
                }
                feelings.Add(feeling);
            }

        }

        var religions = new List<Religion>();
        if (request.Religions.Count() != 0)
        {
            foreach (string religionName in request.Religions)
            {
                var religion = await _context.Religions.Where(rl => rl.ReligionName == religionName).FirstOrDefaultAsync();
                if (religion == null){
                    var newReligion = new Religion { ReligionName = religionName };
                    _context.Religions.Add(newReligion);
                    await _context.SaveChangesAsync(cancellationToken);
                    religion = newReligion;
                }
                religions.Add(religion);
            }

        }

        var entity = new Domain.Term.ConceptTranslation
        {
            NorwegianDefinition = request.NorwegianDefinition,
            Context = request.Context,
            Translation = request.Translation,
            Status = Status.Suggested,
            LastModified = DateTime.Now,
            Comment = request.Comment,
            Feelings = feelings,
            Countries = countries,
            Religions = religions,
            Regions = regions,
            TermId = term.Id,
        };
        _context.ConceptTranslations.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}