using FluentValidation;

namespace iconcept.Domain.Auth.Pipelines.Commands;

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
