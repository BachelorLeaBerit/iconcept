using System.Text.RegularExpressions;
using FluentValidation;
using iconcept.Domain.Auth.Pipelines;
using static iconcept.Domain.Auth.Pipelines.RegisterUser;

namespace iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(u => u.FirstName)
            .NotEmpty()
            .Length(2,50);

        RuleFor(u => u.LastName)
            .NotEmpty()
            .Length(2,50);
    }
}
