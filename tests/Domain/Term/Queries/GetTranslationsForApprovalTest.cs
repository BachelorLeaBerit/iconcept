using System.Data.Common;
using iconcept.Domain.Term;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;
using iconcept.Infrastructure;
using iconcept.tests.Helpers;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Xunit.Abstractions;

namespace Tests.Domain.Term.Queries;

public class GetTranslationForApprovalTests : DbTest
{
    private readonly ConceptDbContext _context;
    public GetTranslationForApprovalTests(ITestOutputHelper output) : base(output)
    {
        _context = new ConceptDbContext(ContextOptions);
        _context.Database.EnsureCreated();
    }

    [Fact]
    public async Task NoOtherEntriesThanStatusApproved_ShouldReturnEmptyList()
    {
        var term = new iconcept.Domain.Term.Term { TermName = "TermName", Id = 1 };
        await _context.Terms.AddAsync(term);
        var conceptTranslation = new ConceptTranslation
        {
            Id = 1,
            Status = Status.Approved,
            TermId = 1,
            Translation = "This translation is hopefully more than long enough, cause 50 chars is really alot"
        };

        await _context.ConceptTranslations.AddAsync(conceptTranslation);
        await _context.SaveChangesAsync();

        var handler = new GetTranslationsForApprovalPipeline.Handler(_context);
        var result = await handler.Handle(new GetTranslationsForApprovalPipeline.Request(), CancellationToken.None);

        Assert.Equal(0, result.Count());

    }

    [Fact]
    public async Task OtherEntriesThanStatusApproved_ShouldNotReturnEmptyList()
    {
        var term = new iconcept.Domain.Term.Term { TermName = "TermName", Id = 1 };
        await _context.Terms.AddAsync(term);
        var conceptTranslation = new ConceptTranslation
        {
            Id = 1,
            Status = Status.Edited,
            TermId = 1,
            Translation = "This translation is hopefully more than long enough, cause 50 chars is really alot"
        };

        await _context.ConceptTranslations.AddAsync(conceptTranslation);
        await _context.SaveChangesAsync();

        var handler = new GetTranslationsForApprovalPipeline.Handler(_context);
        var result = await handler.Handle(new GetTranslationsForApprovalPipeline.Request(), CancellationToken.None);

        Assert.Equal(1, result.Count());

    }
}