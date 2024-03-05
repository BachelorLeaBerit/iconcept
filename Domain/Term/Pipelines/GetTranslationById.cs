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
public class GetTranslationByIdPipeline
{
    public record Request(int Id) : IRequest<ConceptTranslation?> { }

    public class Handler : IRequestHandler<Request, ConceptTranslation?>
    {
        private readonly ConceptDbContext _db;

        public Handler(ConceptDbContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<ConceptTranslation?> Handle(Request request, CancellationToken cancellationToken)
        {
            var translation = await _db.ConceptTranslations
                .Include(c => c.Term)
                .Include(c => c.Religions)
                .Include(c => c.Regions)
                .Include(c => c.Feelings)
                .Include(c => c.Countries)
                .SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);
            if (translation is null) throw new Exception($"Translation with Id {request.Id} was not found in the database");
            return translation;
        }
    }

}
