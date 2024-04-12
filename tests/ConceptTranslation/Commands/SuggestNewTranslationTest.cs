// using iconcept.Domain.Term.Pipelines.SuggestTranslation;
// using Xunit;
// using iconcept.tests.Helpers;
// using Xunit.Abstractions;

// namespace iconcept.tests.ConceptTranslation.Commands;

// public class SuggestNewTranslationTest : DbTest
// {
//     public SuggestNewTranslationTest(ITestOutputHelper output) : base(output)
// 	{
// 	}

//     [Fact]
//     public async void ShouldCreateSuggestCt() {
//         var command = new SuggestTranslationCommand
//         {
//             Translation = "A translation",
//             TermName = "A term"
//         };

//         var id = await SendAsync(command);
//     }
// }