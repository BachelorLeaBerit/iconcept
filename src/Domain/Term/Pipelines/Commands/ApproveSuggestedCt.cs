using System.Collections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using iconcept.Infrastructure;
using iconcept.Domain.Term.Services;
using Domain.Common.Utilities;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public record ApproveSuggestedCtCommand : IRequest
{
    public int Id { get; set; }
    public string? ConceptTranslation { get; set; }
    public string? Comment { get; set; }
    public string? Context { get; set; }
    public string? NorwegianDefinition { get; set; }
    public string EditorEmail { get; set; }
}

public class ApproveSuggestedCtHandler : IRequestHandler<ApproveSuggestedCtCommand>
{
    private readonly ConceptDbContext _db;
    private readonly SearchServiceManager _algoliaService;
    public ApproveSuggestedCtHandler(ConceptDbContext db, SearchServiceManager algoliaService)
    {
        _db = db;
        _algoliaService = algoliaService;
    }

    public async Task Handle(ApproveSuggestedCtCommand request, CancellationToken cancellationToken)
    {
        var translationToBeApproved = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);
        if (translationToBeApproved is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
        if (translationToBeApproved.Status == Status.Edited)
        {
            translationToBeApproved.Translation = translationToBeApproved.EditedTranslation;
            translationToBeApproved.EditedTranslation = "";
        }
        if (translationToBeApproved.Status == Status.Suggested)
        {
            if (request.ConceptTranslation is not null) translationToBeApproved.Translation = StringUtilities.FirstLetterUpperCase(request.ConceptTranslation);
            if (request.Context is not null) translationToBeApproved.Context = StringUtilities.FirstLetterUpperCase(request.Context);
            if (request.Comment is not null) translationToBeApproved.Comment = StringUtilities.FirstLetterUpperCase(request.Comment);
            if (request.NorwegianDefinition is not null) translationToBeApproved.NorwegianDefinition = StringUtilities.FirstLetterUpperCase(request.NorwegianDefinition);
            if (request.EditorEmail is not null) translationToBeApproved.EditorEmail = request.EditorEmail;
            await _db.SaveChangesAsync();
        }
        await _algoliaService.SaveRecord(translationToBeApproved);
        translationToBeApproved.Status = Status.Approved;
        await _db.SaveChangesAsync();

        return;
    }
}