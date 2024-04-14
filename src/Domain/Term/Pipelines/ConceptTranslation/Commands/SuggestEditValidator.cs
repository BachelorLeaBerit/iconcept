using System.Text.RegularExpressions;
using FluentValidation;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public class SuggestEditCommandValidator : AbstractValidator<SuggestEditCommand>
{
    private readonly string ValidCharactersPattern = @"^[a-zA-Z0-9æøåÆØÅ.,!?() \n]*$";
    public SuggestEditCommandValidator()
    {
        RuleFor(ct => ct.EditedTranslation).Length(10, 500).WithMessage("The length of {PropertyName} must be between {MinLength} and {MaxLength}. You entered {TotalLength} characters.")
            .NotEmpty().WithMessage("Must have a translation.")
            .Matches(ValidCharactersPattern);
    }

}