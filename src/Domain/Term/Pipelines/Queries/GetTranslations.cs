// FeelingPipeline.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Infrastructure;

using iconcept.Domain.Term;
using System.Reflection.Metadata.Ecma335;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslations.Queries;
public class GetTranslationsPipeline
{
    public record Request(string searchTerm, string searchCountry, string searchRegion) : IRequest<List<ConceptTranslationViewModel>>;

    public class Handler : IRequestHandler<Request, List<ConceptTranslationViewModel>>
    {
        private readonly ConceptDbContext _db;

        public Handler(ConceptDbContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<List<ConceptTranslationViewModel>> Handle(Request request, CancellationToken cancellationToken)
        {

            var searchTerm = request.searchTerm?.ToLower().Trim();
            var searchRegion = request.searchRegion?.ToLower().Trim();
            var searchCountry = request.searchCountry?.ToLower().Trim();

            var query = _db.ConceptTranslations
            .Include(c => c.Religions)
            .Include(c => c.Regions)
            .Include(c => c.Countries)
            .Include(c => c.Feelings)
            .Where(ct => ct.Status == Status.Approved);

            if (!string.IsNullOrEmpty(searchTerm))
            {
                var term = await _db.Terms.SingleAsync(t => t.TermName.ToLower().Contains(request.searchTerm.ToLower().Trim()));
                if (term != null)
                {
                    query = query.Where(ct => ct.TermId == term.Id);
                }
            }

            if (!string.IsNullOrEmpty(searchRegion))
            {
                query = query.Where(ct => ct.Regions.Any(r => r.RegionName.ToLower().Contains(searchRegion)));
            }

            if (!string.IsNullOrEmpty(searchCountry))
            {
                query = query.Where(ct => ct.Countries.Any(c => c.CountryName.ToLower().Contains(searchCountry)));
            }

            var translations = await query
            .Select(t => new ConceptTranslationViewModel
            {
                Id = t.Id,
                NorwegianDefinition = t.NorwegianDefinition,
                Comment = t.Comment,
                Context = t.Context,
                Translation = t.Translation,
                Status = t.Status,
                LastModified = t.LastModified,
                Regions = t.Regions.Select(r => r.RegionName).ToList(),
                Countries = t.Countries.Select(c => c.CountryName).ToList(),
                Feelings = t.Feelings.Select(f => f.FeelingName).ToList(),
                Religions = t.Religions.Select(rl => rl.ReligionName).ToList(),
                TermName = _db.Terms.FirstOrDefault(term => term.Id == t.TermId)!.TermName
            })
            .OrderBy(t => t.TermName.ToLower())
            .ToListAsync(cancellationToken);

            return translations;
        }
    }
}


