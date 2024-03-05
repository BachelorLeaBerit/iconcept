using iconcept.Domain.Term;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iconcept.Domain.Term.Pipelines;
public class GetCountriesPipeline
{
    public record Request() : IRequest<List<Country>>;

    public class Handler : IRequestHandler<Request, List<Country>>
    {
        private readonly ConceptDbContext _db;

        public Handler(ConceptDbContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<List<Country>> Handle(Request request, CancellationToken cancellationToken)
            => await _db.Countries.ToListAsync();
    }
}
