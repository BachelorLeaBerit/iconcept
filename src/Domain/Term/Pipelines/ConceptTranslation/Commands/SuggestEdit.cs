using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Domain.Term.Services;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public record SuggestEditCommand : IRequest
{
    public string EditedTranslation { get; init; }
    public int Id { get; set; }
}

public class SuggestEditHandler : IRequestHandler<SuggestEditCommand>
{
    private readonly ConceptDbContext _db;
    private readonly AlgoliaService _algoliaService;
    public SuggestEditHandler(ConceptDbContext db, AlgoliaService algoliaService)
    {
        _db = db;
        _algoliaService = algoliaService;
    }

    public async Task Handle(SuggestEditCommand request, CancellationToken cancellationToken)
    {
        var translation = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id);
        if (translation is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
        translation.EditedTranslation = request.EditedTranslation;
        translation.Status = Status.Edited;
        await _db.SaveChangesAsync();
        await _algoliaService.DeleteRecord(request.Id.ToString());
        return;
    }
}