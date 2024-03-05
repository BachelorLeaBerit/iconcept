// FeelingPipeline.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;

using iconcept.Domain.Term;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines;
public class GetTranslationsByFeelingIdPipeline
{
    public record Request(int id) : IRequest<List<ConceptTranslation>> { }

    public class Handler : IRequestHandler<Request, List<ConceptTranslation>>
    {
        private readonly ConceptDbContext _db;

        public Handler(ConceptDbContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<List<ConceptTranslation>> Handle(Request request, CancellationToken cancellationToken)
            => await _db.ConceptTranslations
            .Include(c => c.Term)
            .Include(c => c.Religions)
            .Include(c => c.Regions)
            .Include(c => c.Countries)
            .Include(c => c.Feelings)
            .Where(c => c.Feelings.Any(f => f.Id == request.id)).AsSplitQuery()
            .OrderBy(c => c.Term.TermName)
            .ToListAsync(cancellationToken);
    }

}
