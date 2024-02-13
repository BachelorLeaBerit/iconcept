using iconcept.Domain.Term;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iconcept.Domain.Term.Pipelines;
public class GetTermsPipeline
{
    public record Request(string Country, string Region, string Religion) : IRequest<List<Term>>;

    public class Handler : IRequestHandler<Request, List<Term>>
    {
        private readonly ConceptDbContext _db;

        public Handler(ConceptDbContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<List<Term>> Handle(Request request, CancellationToken cancellationToken)
        {
            var terms = await _db.Terms
                .Include(term => term.ConceptTranslations)
                .Where(term =>
                    term.ConceptTranslations.Any(ct =>
                        (string.IsNullOrEmpty(request.Country) || ct.Countries.Any(c => c.CountryName == request.Country)) &&
                        (string.IsNullOrEmpty(request.Region) || ct.Regions.Any(r => r.RegionName == request.Region)) &&
                        (string.IsNullOrEmpty(request.Religion) || ct.Religions.Any(r => r.ReligionName == request.Religion))
                    )
                )
                .ToListAsync(cancellationToken);

            return terms;
        }
    }
}
