using System.Text.RegularExpressions;
using FluentValidation;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public class SuggestTranslationCommandValidator : AbstractValidator<SuggestTranslationCommand>
{
    private readonly string ValidCharactersPattern = @"^[a-zA-Z0-9æøåÆØÅ.,!?();:\- \n]*$";
    private readonly string ValidCharactersPattern2 = @"^[a-zA-ZæøåÆØÅ()\- ]+$";
    public SuggestTranslationCommandValidator()
    {

        RuleFor(ct => ct.TermName).Length(2, 50)
            .NotEmpty()
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.Translation).Length(50, 500)
            .NotEmpty()
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.Comment)
            .NotEmpty().When(ct => !string.IsNullOrWhiteSpace(ct.Comment))
            .Length(50, 300).When(ct => !string.IsNullOrWhiteSpace(ct.Comment))
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.NorwegianDefinition)
            .NotEmpty().When(ct => !string.IsNullOrWhiteSpace(ct.NorwegianDefinition))
            .Length(50, 300).When(ct => !string.IsNullOrWhiteSpace(ct.NorwegianDefinition))
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.Context)
            .NotEmpty().When(ct => !string.IsNullOrWhiteSpace(ct.Context))
            .Length(50, 300).When(ct => !string.IsNullOrWhiteSpace(ct.Context))
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.EditorEmail).EmailAddress();

        RuleForEach(ct => ct.Countries)
            .Length(2, 50)
            .Matches(ValidCharactersPattern2);

        RuleForEach(ct => ct.Feelings)
            .Length(2, 50)
            .Matches(@"^[a-zA-ZæøåÆØÅ();:,.\-\– ]+$");

        RuleForEach(ct => ct.Regions)
            .Length(2, 50)
            .Matches(ValidCharactersPattern2);

        RuleForEach(ct => ct.Religions)
            .Length(2, 50)
            .Matches(ValidCharactersPattern2);
    }

}