using iconcept.Domain.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using iconcept.Domain.Term.Pipelines.SuggestTranslation;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;

namespace iconcept.Controllers;
[Route("api/suggestions")]
[ApiController]
public class SuggestionController : ControllerBase
{
    private readonly IMediator _mediator;

    public SuggestionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetTermsReligionsCountriesRegions()
    {
        var terms = await _mediator.Send(new Domain.Term.Pipelines.GetTermsPipeline.Request());
        var feelings = await _mediator.Send(new Domain.Term.Pipelines.GetFeelingsPipeline.Request());
        var religions = await _mediator.Send(new Domain.Term.Pipelines.GetReligionsPipeline.Request());
        var regions = await _mediator.Send(new Domain.Term.Pipelines.GetRegionsPipeline.Request());
        var countries = await _mediator.Send(new Domain.Term.Pipelines.GetCountriesPipeline.Request());

        var data = new { Terms = terms, Feelings = feelings, Religions = religions, Regions = regions, Countries = countries };

        return Ok(data);
    }

    [HttpPost]
    public async Task<ActionResult<int>> PostSuggestNewTranslation([FromBody] SuggestTranslationCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet("forApproval")]
    public async Task<ActionResult<IEnumerable<ConceptTranslationDto>>> GetTranslationsForApproval()
    {
        var translations = await _mediator.Send(new Domain.Term.Pipelines.GetTranslationsForApprovalPipeline.Request());

        return Ok(translations);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateSuggestedTranslation(int id)
    {
        await _mediator.Send(new ApproveSuggestedCtCommand(id));
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteSuggestedTranslation(int id)
    {
        await _mediator.Send(new DeleteSuggestedCtCommand(id));
        return NoContent();
    }

    [HttpPut("editNotApproved/{id:int}")]
    public async Task<ActionResult> SomethingSmart(int id)
    {
        await _mediator.Send(new EditNotApprovedCommand(id));
        return NoContent();
    }

    [HttpGet("translationToEdit/{id:int}")]
    public async Task<ActionResult<IEnumerable<ConceptTranslation>>> GetTranslationToEdit(int id)
    {
        var translation = await _mediator.Send(new Domain.Term.Pipelines.GetTranslationByIdPipeline.Request(id));

        return Ok(translation);
    }

    [HttpPut("translationToEdit")]
    public async Task<IActionResult> UpdateSuggestedTranslation([FromBody] SuggestEditCommand command)
    {
        await _mediator.Send(command);
        return NoContent();
    }
}

