using Moq;
using Microsoft.EntityFrameworkCore;
using iconcept.Infrastructure;
using Xunit;
using MediatR;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using System.Collections.Generic;
using System.Data.SqlClient;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;
using iconcept.tests.Helpers;
using Xunit.Abstractions;
using iconcept.Domain.Term;

namespace iconcept.Tests
{
    public class SuggestTranslationHandlerTests : DbTest
    {
        private readonly ConceptDbContext _context;
        public SuggestTranslationHandlerTests(ITestOutputHelper output) : base(output)
        {
            _context = new ConceptDbContext(ContextOptions);
            _context.Database.EnsureCreated();
        }


        [Fact]
        public async Task SuggestTranslationHandler_ShouldAddNewEntities()
        {
            // Arrange

            var request = new SuggestTranslationCommand
            {
                NorwegianDefinition = "definition",
                Context = "context",
                Translation = "translation",
                Comment = "comment",
                Feelings = ["feeling1", "feeling2"],
                Countries = ["country1", "country2"],
                TermName = "term",
                Religions = ["religion1", "religion2"],
                Regions = ["region1", "region2"],
                EditorEmail = "editor@example.com"
            };
            var handler = new SuggestTranslationHandler(_context);

            // Act
            var result = await handler.Handle(request, new CancellationToken());

            // Assert
            Assert.NotEqual(0, result);

            // Verify DbSet Add is called
            Assert.Equal(1, _context.Terms.Count());
            Assert.Equal(2, _context.Countries.Count());
            Assert.Equal(2, _context.Regions.Count());
            Assert.Equal(2, _context.Feelings.Count());
            Assert.Equal(2, _context.Religions.Count());
            Assert.Equal(1, _context.ConceptTranslations.Count());
        }

        [Fact]
        public async Task ShouldUseExsistingTermIfExsist()
        {

            var term = new Term { TermName = "termName" };
            await _context.Terms.AddAsync(term);
            await _context.SaveChangesAsync();

            var request = new SuggestTranslationCommand
            {
                NorwegianDefinition = "",
                Context = "",
                Translation = "translation",
                Comment = "",
                Feelings = [],
                Countries = [],
                TermName = "termName",
                Religions = [],
                Regions = [],
                EditorEmail = "editor@example.com"
            };

            var handler = new SuggestTranslationHandler(_context);
            var result = await handler.Handle(request, new CancellationToken());

            var translation = await _context.ConceptTranslations.FirstOrDefaultAsync(c => c.Id == result);

            Assert.NotNull(translation);
            Assert.Equal(term.Id, translation.TermId);
        }

        [Fact]
        public async Task ShouldCreateNewTerm_IfNotExsist()
        {
            var request = new SuggestTranslationCommand
            {
                NorwegianDefinition = "",
                Context = "",
                Translation = "translation",
                Comment = "",
                Feelings = [],
                Countries = [],
                TermName = "TermName",
                Religions = [],
                Regions = [],
                EditorEmail = "editor@example.com"
            };

            var handler = new SuggestTranslationHandler(_context);
            var result = await handler.Handle(request, new CancellationToken());
            var term = await _context.Terms.FirstOrDefaultAsync(t => t.TermName == request.TermName);

            Assert.NotNull(term);
            Assert.Equal(term.TermName, "TermName");
        }

        [Fact]
        public async Task RegionDontExsist_ShouldAddToDatabase()
        {
            var term = new Term { TermName = "termName" };
            await _context.Terms.AddAsync(term);
            await _context.SaveChangesAsync();

            var request = new SuggestTranslationCommand
            {
                NorwegianDefinition = "",
                Context = "",
                Translation = "translation",
                Comment = "",
                Feelings = [],
                Countries = [],
                TermName = "termName",
                Religions = [],
                Regions = ["NewRegion"],
                EditorEmail = "editor@example.com"
            };

            var handler = new SuggestTranslationHandler(_context);
            var result = await handler.Handle(request, new CancellationToken());

            var regions = await _context.Regions.ToListAsync();

            Assert.Equal(1, regions.Count());
            Assert.Equal(regions[0].RegionName, request.Regions.First());
        }

        [Fact]
        public async Task RegionExsist_ShouldGetFromDb()
        {
            var term = new Term { TermName = "termName" };
            await _context.Terms.AddAsync(term);

            var region = new Region {RegionName = "NewRegion", Id = 1};
            await _context.Regions.AddAsync(region);
            await _context.SaveChangesAsync();

            var request = new SuggestTranslationCommand
            {
                NorwegianDefinition = "",
                Context = "",
                Translation = "translation",
                Comment = "",
                Feelings = [],
                Countries = [],
                TermName = "termName",
                Religions = [],
                Regions = ["NewRegion"],
                EditorEmail = "editor@example.com"
            };

            var handler = new SuggestTranslationHandler(_context);
            var result = await handler.Handle(request, new CancellationToken());

            var regions = await _context.Regions.ToListAsync();

            Assert.Single(regions);
            Assert.Equal("NewRegion", regions.First().RegionName);
        }
    }
}
