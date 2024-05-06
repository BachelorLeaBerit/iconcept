using iconcept.Domain.Term.Services;
using iconcept.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public record DeleteTranslationCommand(int Id) : IRequest;

public class DeleteTodoItemCommandHandler : IRequestHandler<DeleteTranslationCommand>
{
    private readonly ConceptDbContext _db;
    private readonly SearchServiceManager _searchService;

    public DeleteTodoItemCommandHandler(ConceptDbContext db, SearchServiceManager searchService)
    {
        _db = db;
        _searchService = searchService;
    }

    public async Task Handle(DeleteTranslationCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entity = await _db.ConceptTranslations.SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);
            if (entity is null) throw new Exception($"ConceptTranslation with Id {request.Id} was not found in the database");
            _db.ConceptTranslations.Remove(entity);
            await _db.SaveChangesAsync();
            await _searchService.DeleteRecord(request.Id.ToString());
        }
        catch (DbUpdateException ex)
        {
            throw new Exception("An error occurred while updating the database", ex);
        } catch (Exception ex)
        {
            throw new Exception("Unexpected error occured", ex);
        }

    }
}