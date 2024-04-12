using Xunit;
using FluentValidation;
using FluentValidation.TestHelper;
using iconcept.Domain.Term.Pipelines.SuggestTranslation;
using FluentValidation.Validators.UnitTestExtension.Core;

namespace iconcept.Tests.ConceptTranslation.Commands;

public class NewSuggestionValidatorTester
{
  readonly SuggestTranslationCommandValidator validator = new SuggestTranslationCommandValidator();

  [Fact]
  public void Given_When_SuggestTranslationValidatorConstructing_Then_10ropertiesShouldhaveRule()
  {
    //Assert
    validator.ShouldHaveRulesCount(10);
  }

  [Fact]
  public void Should_have_error_when_TermName_is_null()
  {
    var model = new SuggestTranslationCommand
    {
      Translation = "akskalskaløsknkdoafp aodka fkop",
      EditorEmail = "email@email.com",
      TermName = null
    };
    var result = validator.TestValidate(model);
    result.ShouldHaveValidationErrorFor(ct => ct.TermName);
  }

  [Fact]
  public void Should_not_have_error_when_Countries_is_valid()
  {
    var model = new SuggestTranslationCommand
    {
      Translation = "akskalskaløsknkdoafp aodka fkop",
      EditorEmail = "email@email.com",
      TermName = "termname",
      Countries = ["heihei"]
    };
    var result = validator.TestValidate(model);
    result.ShouldNotHaveValidationErrorFor(ct => ct.Countries);
  }

  [Theory]
  [InlineData("TermName", "Konsepttranslation with enough characters.", "email@email.com", new string[] { "x" })]
  [InlineData("TermName", "Konsepttranslation with enough characters.", "email@email.com", new string[] { "xxxxxxxxxxxxxxxxxxxxx" })]
  [InlineData("TermName", "Konsepttranslation with enough characters.", "email@email.com", new string[] { "x@" })]
  [InlineData("TermName", "Konsepttranslation with enough characters.", "email@email.com", new string[] { "xxxxxxxxxxxxxxxxxxx@" })]
  [InlineData("TermName", "Konsepttranslation with enough characters.", "email@email.com", new string[] { "x@xxxxxxxxxxxxxxxxxx" })]
  [InlineData("TermName", "Konsepttranslation with enough characters.", "email@email.com", new string[] { "xxxxxxxxxx$xxxxxxxxx" })]
  [InlineData("TermName", "Konsepttranslation with enough characters.", "email@email.com", new string[] { "123" })]
  public void Should_return_error_for_Countries(string termName, string translation, string editorEmail, string[] countries)
  {
    var model = new SuggestTranslationCommand
    {
        TermName = termName,
        Translation = translation,
        EditorEmail = editorEmail,
        Countries = countries.ToList()
    };
    var result = validator.TestValidate(model);
    result.ShouldHaveValidationErrorFor(ct => ct.Countries);

  }
}