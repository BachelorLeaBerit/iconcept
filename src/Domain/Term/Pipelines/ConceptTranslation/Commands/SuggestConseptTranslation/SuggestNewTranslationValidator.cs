using FluentValidation;

namespace iconcept.Domain.Term.Pipelines.SuggestTranslation;

public class SuggestTranslationCommandValidator : AbstractValidator<SuggestTranslationCommand>
{
    public SuggestTranslationCommandValidator()
    {
        RuleFor(ct => ct.TermName).Length(2,50).WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.")
            .NotEmpty().WithMessage("Must have a termName.");

        RuleFor(ct => ct.Translation).Length(10,500).WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.")
            .NotEmpty().WithMessage("Must have a translation.");

        RuleFor(ct => ct.Comment).Length(10,300).WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.");

        RuleFor(ct => ct.NorwegianDefinition).Length(10,300).WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.");

        RuleFor(ct => ct.Context).Length(10,300).WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.");

        RuleFor(ct => ct.EditorEmail).EmailAddress();
    }

}