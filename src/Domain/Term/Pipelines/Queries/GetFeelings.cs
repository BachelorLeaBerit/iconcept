using iconcept.Domain.Term;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines.Get;
public class GetFeelingsPipeline
{
    public record Request() : IRequest<List<Feeling>>;

    public class Handler : IRequestHandler<Request, List<Feeling>>
    {
        private readonly ConceptDbContext _db;

        public Handler(ConceptDbContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<List<Feeling>> Handle(Request request, CancellationToken cancellationToken)
            => await _db.Feelings.ToListAsync();
    }
}
