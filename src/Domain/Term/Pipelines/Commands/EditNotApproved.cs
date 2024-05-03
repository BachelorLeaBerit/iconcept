using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Domain.Term.Services;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public record EditNotApprovedCommand(int Id) : IRequest;

public class EditNotApprovedCommandHandler : IRequestHandler<EditNotApprovedCommand>
{
    private readonly ConceptDbContext _db;
    private readonly SearchServiceManager _algoliaService;
    public EditNotApprovedCommandHandler(ConceptDbContext db, SearchServiceManager algoliaService)
    {
        _db = db;
        _algoliaService = algoliaService;
    }

    public async Task Handle(EditNotApprovedCommand request, CancellationToken cancellationToken)
    {
        var translation = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);
        if (translation is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
        translation.EditedTranslation = "";
        translation.Status = Status.Approved;
        await _db.SaveChangesAsync();
        await _algoliaService.SaveRecord(translation);
        return;
    }
}