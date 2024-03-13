using FluentValidation;

namespace iconcept.Domain.Term.Pipelines.SuggestTranslation;

public class SuggestTranslationCommandValidator : AbstractValidator<SuggestTranslationCommand>
{
    public SuggestTranslationCommandValidator()
    {
        RuleFor(ct => ct.TermName).MaximumLength(50).WithMessage("Must be shorter than 50 chars")
            .NotEmpty().WithMessage("Must have a termName");
        RuleFor(ct => ct.Translation).MaximumLength(200).WithMessage("Max 200 char")
            .NotEmpty().WithMessage("Cant be empty");
        RuleFor(ct => ct.Comment).MaximumLength(100).WithMessage("Cant be longer than 10 chars");
        RuleFor(ct => ct.NorwegianDefinition).MaximumLength(100).WithMessage("Too long");
        RuleFor(ct => ct.Context).MaximumLength(100).WithMessage("Too long");
    }
}