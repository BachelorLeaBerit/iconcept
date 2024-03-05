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
    public IEnumerable<int> Feelings { get; init; }
    public IEnumerable<int> Countries { get; init; }
    public string TermName { get; init; }
    public IEnumerable<int> Religions { get; init; }
    public IEnumerable<int> Regions { get; init; }
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
            foreach (int countryId in request.Countries)
            {
                var country = await _context.Countries.Where(c => c.Id == countryId).FirstOrDefaultAsync();
                countries.Add(country);
            }

        }

        var regions = new List<Region>();
        if (request.Regions.Count() != 0)
        {
            foreach (int regionId in request.Regions)
            {
                var region = await _context.Regions.Where(r => r.Id == regionId).FirstOrDefaultAsync();
                regions.Add(region);
            }

        }

        var feelings = new List<Feeling>();
        if (request.Feelings.Count() != 0)
        {
            foreach (int feelingId in request.Feelings)
            {
                var feeling = await _context.Feelings.Where(f => f.Id == feelingId).FirstOrDefaultAsync();
                feelings.Add(feeling);
            }

        }

        var religions = new List<Religion>();
        if (request.Religions.Count() != 0)
        {
            foreach (int religionId in request.Religions)
            {
                var religion = await _context.Religions.Where(rl => rl.Id == religionId).FirstOrDefaultAsync();
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