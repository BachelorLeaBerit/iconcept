using System.Text.RegularExpressions;
using FluentValidation;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public class SuggestEditCommandValidator : AbstractValidator<SuggestEditCommand>
{
    private readonly string ValidCharactersPattern = @"^[a-zA-Z0-9æøåÆØÅ.,!?();:\- \n]*$";
    public SuggestEditCommandValidator()
    {
        RuleFor(ct => ct.EditedTranslation).Length(50, 500)
            .NotEmpty()
            .Matches(ValidCharactersPattern);
    }

}