using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public record ApproveSuggestedCtCommand(int Id) : IRequest;

public class ApproveSuggestedCtHandler : IRequestHandler<ApproveSuggestedCtCommand>
{
    private readonly ConceptDbContext _db;
    public ApproveSuggestedCtHandler(ConceptDbContext db)
    {
        _db = db;
    }

    public async Task Handle(ApproveSuggestedCtCommand request, CancellationToken cancellationToken)
    {
        var translationToBeApproved = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);
        if (translationToBeApproved is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
        if (translationToBeApproved.Status == Status.Edited){
            translationToBeApproved.Translation = translationToBeApproved.EditedTranslation;
            translationToBeApproved.EditedTranslation = "";
        }
        translationToBeApproved.Status = Status.Approved;
        await _db.SaveChangesAsync();
        return;
    }
}