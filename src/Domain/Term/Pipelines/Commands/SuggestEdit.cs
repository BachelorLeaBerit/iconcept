using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Domain.Term.Services;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public record SuggestEditCommand : IRequest
{
    public string EditedTranslation { get; init; }
    public string EditorEmail { get; set; }
    public int Id { get; set; }
}

public class SuggestEditHandler : IRequestHandler<SuggestEditCommand>
{
    private readonly ConceptDbContext _db;
    private readonly SearchServiceManager _searchService;
    public SuggestEditHandler(ConceptDbContext db, SearchServiceManager searchService)
    {
        _db = db;
        _searchService = searchService;
    }

    public async Task Handle(SuggestEditCommand request, CancellationToken cancellationToken)
    {
        var translation = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id);
        if (translation is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
        translation.EditedTranslation = request.EditedTranslation;
        translation.LastModified = DateTime.Now;
        translation.Status = Status.Edited;
        translation.EditorEmail = request.EditorEmail;
        await _db.SaveChangesAsync();
        await _searchService.DeleteRecord(request.Id.ToString());
        return;
    }
}