using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public record DeleteSuggestedCtCommand(int Id) : IRequest;

public class DeleteSuggestedCtHandler : IRequestHandler<DeleteSuggestedCtCommand>
{
    private readonly ConceptDbContext _db;
    public DeleteSuggestedCtHandler(ConceptDbContext db)
    {
        _db = db;
    }

    public async Task Handle(DeleteSuggestedCtCommand request, CancellationToken cancellationToken)
    {
        var translationToBeDeleted = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);
        if (translationToBeDeleted is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
        _db.ConceptTranslations.Remove(translationToBeDeleted);
        await _db.SaveChangesAsync();

        return;
    }
}