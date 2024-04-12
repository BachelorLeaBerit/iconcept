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
[Route("api/suggestions")]
[ApiController]
public class NewSuggestionController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewSuggestionController(IMediator mediator)
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
        var countries = await _mediator.Send(new GetCountriesPipeline.Request());

        var data = new { Terms = terms, Feelings = feelings, Religions = religions, Regions = regions, Countries = countries };

        return Ok(data);
    }

    [HttpPost]
    public async Task<ActionResult<int>> PostSuggestNewTranslation([FromBody] SuggestTranslationCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet("translationToEdit/{id:int}")]
    public async Task<ActionResult<IEnumerable<ConceptTranslation>>> GetTranslationToEdit(int id)
    {
        var translation = await _mediator.Send(new GetTranslationByIdPipeline.Request(id));

        return Ok(translation);
    }

    [HttpPut("translationToEdit")]
    public async Task<IActionResult> UpdateSuggestedTranslation([FromBody] SuggestEditCommand command)
    {
        await _mediator.Send(command);
        return NoContent();
    }
}

