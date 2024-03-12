using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Infrastructure;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public record EditNotApprovedCommand(int Id) : IRequest;

public class EditNotApprovedCommandHandler : IRequestHandler<EditNotApprovedCommand>
{
    private readonly ConceptDbContext _db;
    public EditNotApprovedCommandHandler(ConceptDbContext db)
    {
        _db = db;
    }

    public async Task Handle(EditNotApprovedCommand request, CancellationToken cancellationToken)
    {
        var translation = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);
        if (translation is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
        translation.EditedTranslation = "";
        translation.Status = Status.Approved;
        await _db.SaveChangesAsync();

        return;
    }
}