using System.Text.RegularExpressions;
using FluentValidation;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public class SuggestTranslationCommandValidator : AbstractValidator<SuggestTranslationCommand>
{
    private readonly string ValidCharactersPattern = @"^[a-zA-Z0-9æøåÆØÅ.,!?() \n]*$";
    public SuggestTranslationCommandValidator()
    {

        RuleFor(ct => ct.TermName).Length(2, 50).WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.")
            .NotEmpty().WithMessage("Must have a termName.")
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.Translation).Length(10, 500).WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.")
            .NotEmpty().WithMessage("Must have a translation.")
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.Comment)
            .NotEmpty().When(ct => !string.IsNullOrWhiteSpace(ct.Comment))
            .Length(10, 300).When(ct => !string.IsNullOrWhiteSpace(ct.Comment))
            .WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.")
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.NorwegianDefinition)
            .NotEmpty().When(ct => !string.IsNullOrWhiteSpace(ct.NorwegianDefinition))
            .Length(10, 300).When(ct => !string.IsNullOrWhiteSpace(ct.NorwegianDefinition))
            .WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.")
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.Context)
            .NotEmpty().When(ct => !string.IsNullOrWhiteSpace(ct.Context))
            .Length(10, 300).When(ct => !string.IsNullOrWhiteSpace(ct.Context))
            .WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.")
            .Matches(ValidCharactersPattern);

        RuleFor(ct => ct.EditorEmail).EmailAddress();

        RuleForEach(ct => ct.Countries)
            .Length(2, 20).WithMessage("Each country must be between 2 and 20 characters.")
            .Matches(@"^[a-zA-ZæøåÆØÅ]+$").WithMessage("Each country name must contain only letters.");

        RuleForEach(ct => ct.Feelings)
            .Length(2, 20).WithMessage("Each feeling must be between 2 and 20 characters.")
            .Matches(@"^[a-zA-ZæøåÆØÅ]+$").WithMessage("Each feeling name must contain only letters.");

        RuleForEach(ct => ct.Regions)
            .Length(2, 20).WithMessage("Each region must be between 2 and 20 characters.")
            .Matches(@"^[a-zA-ZæøåÆØÅ]+$").WithMessage("Each region name must contain only letters.");

        RuleForEach(ct => ct.Religions)
            .Length(2, 20).WithMessage("Each religion must be between 2 and 20 characters.")
            .Matches(@"^[a-zA-ZæøåÆØÅ]+$").WithMessage("Each religion name must contain only letters.");
    }

}