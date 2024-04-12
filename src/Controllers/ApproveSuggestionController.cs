using iconcept.Domain.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using iconcept.Domain.Term.Pipelines.SuggestTranslation;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;
using iconcept.Infrastructure;
using iconcept.Domain.Term.Pipelines.Gets;
using iconcept.Domain.Term.Pipelines.ConceptTranslations.Queries;
using Microsoft.AspNetCore.Authorization;

namespace iconcept.Controllers;
[Route("api/approvesuggestion")]
[Authorize(Roles = "Admin, Redaktør")]
[ApiController]
public class SuggestionController : ControllerBase
{
    private readonly IMediator _mediator;

    public SuggestionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("forApproval")]
    [Authorize(Roles = "Admin, Redaktør")]
    public async Task<ActionResult<IEnumerable<ConceptTranslationDto>>> GetTranslationsForApproval()
    {
        var translations = await _mediator.Send(new Domain.Term.Pipelines.GetTranslationsForApprovalPipeline.Request());

        return Ok(translations);
    }

    [HttpPut]
    [Authorize(Roles = "Admin, Redaktør")]
    public async Task<IActionResult> UpdateSuggestedTranslation([FromBody] ApproveSuggestedCtCommand command)
    {
        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin, Redaktør")]
    public async Task<IActionResult> DeleteSuggestedTranslation(int id)
    {
        await _mediator.Send(new DeleteSuggestedCtCommand(id));
        return NoContent();
    }

    [HttpPut("editNotApproved/{id:int}")]
    [Authorize(Roles = "Admin, Redaktør")]
    public async Task<ActionResult> NotApprovedTranslation(int id)
    {
        await _mediator.Send(new EditNotApprovedCommand(id));
        return NoContent();
    }


}

