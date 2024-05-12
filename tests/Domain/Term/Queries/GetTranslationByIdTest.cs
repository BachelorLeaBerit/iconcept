using System.Data.Common;
using iconcept.Domain.Term;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;
using iconcept.Infrastructure;
using iconcept.tests.Helpers;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Xunit.Abstractions;

namespace Tests.Domain.Term.Queries;

public class GetTranslationByIdTests : DbTest
{
    private readonly ConceptDbContext _context;
    public GetTranslationByIdTests(ITestOutputHelper output) : base(output)
    {
        _context = new ConceptDbContext(ContextOptions);
        _context.Database.EnsureCreated();
    }

    [Fact]
    public async Task GetTranslationById_ShouldReturnTranslationAsync()
    {
        var term = new iconcept.Domain.Term.Term { Id = 1, TermName = "A term" };

        var translation = new ConceptTranslation
        {
            Id = 1,
            Translation = "Long enough translation.",
            TermId = 1
        };

        await _context.Terms.AddAsync(term);
        await _context.ConceptTranslations.AddAsync(translation);
        await _context.SaveChangesAsync();

        var query = new GetTranslationByIdPipeline.Request(1);

        var handler = new GetTranslationByIdPipeline.Handler(_context);

        var result = await handler.Handle(query, CancellationToken.None);

        Assert.NotNull(result);
        Assert.Equal(translation.Translation, result.Translation);
    }

    [Fact]
    public async Task GetTranslationByWrongId_ShouldReturnError()
    {

        var term = new iconcept.Domain.Term.Term { Id = 1, TermName = "A term" };

        var translation = new ConceptTranslation
        {
            Id = 1,
            Translation = "Long enough translation.",
            TermId = 1
        };

        await _context.Terms.AddAsync(term);
        await _context.ConceptTranslations.AddAsync(translation);
        await _context.SaveChangesAsync();

        var query = new GetTranslationByIdPipeline.Request(2);

        var handler = new GetTranslationByIdPipeline.Handler(_context);

        var exception = await Assert.ThrowsAsync<Exception>(async () => await handler.Handle(query, CancellationToken.None));

        Assert.Equal($"Translation with Id {query.Id} was not found in the database", exception.Message);
    }
}