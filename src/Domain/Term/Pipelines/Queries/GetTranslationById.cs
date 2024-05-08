using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Domain.Term;
using System.IO.Compression;
using iconcept.Infrastructure;
using iconcept.Domain.Term.Pipelines.Get;
using iconcept.Domain.Term.DTO;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;
public class GetTranslationByIdPipeline
{
    public record Request(int Id) : IRequest<ConceptTranslationViewModel?> { }

    public class Handler : IRequestHandler<Request, ConceptTranslationViewModel?>
    {
        private readonly ConceptDbContext _db;

        public Handler(ConceptDbContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<ConceptTranslationViewModel?> Handle(Request request, CancellationToken cancellationToken)
        {
            var translation = await _db.ConceptTranslations
                .Include(c => c.Religions)
                .Include(c => c.Regions)
                .Include(c => c.Feelings)
                .Include(c => c.Countries)
                .Where(c => c.Id == request.Id)
                .Select(t => new ConceptTranslationViewModel
                {
                    Id = request.Id,
                    NorwegianDefinition = t.NorwegianDefinition,
                    Comment = t.Comment,
                    Context = t.Context,
                    Translation = t.Translation,
                    EditedTranslation = t.EditedTranslation,
                    Status = t.Status,
                    LastModified = t.LastModified,
                    Regions = t.Regions.Select(r => r.RegionName).ToList(),
                    Countries = t.Countries.Select(c => c.CountryName).ToList(),
                    Feelings = t.Feelings.Select(f => f.FeelingName).ToList(),
                    Religions = t.Religions.Select(rl => rl.ReligionName).ToList(),
                    TermName = _db.Terms.FirstOrDefault(term => term.Id == t.TermId)!.TermName,
                    EditorEmail = t.EditorEmail
                })
                .SingleOrDefaultAsync(cancellationToken);
            if (translation is null) throw new Exception($"Translation with Id {request.Id} was not found in the database");
            return translation;
        }
    }

}
