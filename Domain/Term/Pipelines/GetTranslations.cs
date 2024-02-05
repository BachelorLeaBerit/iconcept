// FeelingPipeline.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;

using iconcept.Domain.Term;

namespace iconcept.Domain.Term.Pipelines;
public class GetTranslationsPipeline
{
    public record Request : IRequest<List<ConceptTranslation>> { }

    public class Handler : IRequestHandler<Request, List<ConceptTranslation>>
    {
        private readonly ConceptDbContext _db;

        public Handler(ConceptDbContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<List<ConceptTranslation>> Handle(Request request, CancellationToken cancellationToken)
            => await _db.ConceptTranslations.OrderBy(c => c.Translation).ToListAsync(cancellationToken: cancellationToken);
    }

}
