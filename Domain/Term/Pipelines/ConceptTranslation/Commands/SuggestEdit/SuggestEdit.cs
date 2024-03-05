using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace iconcept.Domain.Term.Pipelines.SuggestTranslation;

public record SuggestEditCommand : IRequest
{
    public string EditedTranslation { get; init; }
    public int Id { get; set; }
}

public class SuggestEditHandler : IRequestHandler<SuggestEditCommand>
{
    private readonly ConceptDbContext _db;
    public SuggestEditHandler(ConceptDbContext db)
    {
        _db = db;
    }

    public async Task<Unit> Handle(SuggestEditCommand request, CancellationToken cancellationToken)
    {
        var translation = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id);
        if (translation is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
        translation.EditedTranslation = request.EditedTranslation;
        translation.Status = Status.Edited;
        await _db.SaveChangesAsync();

        return Unit.Value;
    }
}