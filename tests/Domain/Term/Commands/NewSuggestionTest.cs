// using Moq;
// using Microsoft.EntityFrameworkCore;
// using iconcept.Infrastructure;
// using Xunit;
// using MediatR;
// using System.Linq;
// using System.Threading.Tasks;
// using System.Threading;
// using System.Collections.Generic;
// using System.Data.SqlClient;
// using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;
// using iconcept.tests.Helpers;
// using Xunit.Abstractions;

// namespace iconcept.Tests
// {
//     public class SuggestTranslationHandlerTests : DbTest
//     {
//         public SuggestTranslationHandlerTests(ITestOutputHelper output) : base(output)
//         {
//         }


//         [Fact]
//         public async Task SuggestTranslationHandler_ShouldAddNewEntities()
//         {
//             // Arrange
//             using var context = new ConceptDbContext(ContextOptions);
//             context.Database.Migrate();
//             var mockMediator = new Mock<IMediator>();

//             var request = new SuggestTranslationCommand
//             {
//                 NorwegianDefinition = "definition",
//                 Context = "context",
//                 Translation = "translation",
//                 Comment = "comment",
//                 Feelings = ["feeling1", "feeling2"],
//                 Countries = ["country1", "country2"],
//                 TermName = "term",
//                 Religions = ["religion1", "religion2"],
//                 Regions = ["region1", "region2"],
//                 EditorEmail = "editor@example.com"
//             };

//             mockMediator.Setup(m => m.Send(It.IsAny<SuggestTranslationCommand>(), It.IsAny<CancellationToken>()))
//                         .ReturnsAsync(1);

//             var handler = new SuggestTranslationHandler(context);

//             // Act
//             var result = await handler.Handle(request, new CancellationToken());

//             // Assert
//             Assert.NotEqual(0, result);

//             // Verify DbSet Add is called
//             Assert.Equal(1, context.Terms.Count());
//             Assert.Equal(2, context.Countries.Count());
//             Assert.Equal(2, context.Regions.Count());
//             Assert.Equal(2, context.Feelings.Count());
//             Assert.Equal(2, context.Religions.Count());
//             Assert.Equal(1, context.ConceptTranslations.Count());

//             // Verify SaveChangesAsync is called
//             mockMediator.Verify(m => m.Send(It.IsAny<SuggestTranslationCommand>(), It.IsAny<CancellationToken>()), Times.Once);
//         }
//     }
// }
