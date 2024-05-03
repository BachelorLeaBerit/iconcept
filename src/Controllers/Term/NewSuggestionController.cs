using iconcept.Domain.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;
using iconcept.Infrastructure;
using iconcept.Domain.Term.Pipelines.Get;
using Microsoft.AspNetCore.Authorization;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;
using CleanArchitecture.WebUI.Filters;

namespace iconcept.Controllers.Term;

[Route("api/suggestions")]
[ApiExceptionFilter]
[ApiController]
public class NewSuggestionController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewSuggestionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetFeelingsReligionsCountriesRegions()
    {
        var feelings = await _mediator.Send(new GetFeelingsPipeline.Request());
        var religions = await _mediator.Send(new GetReligionsPipeline.Request());
        var regions = await _mediator.Send(new GetRegionsPipeline.Request());
        var countries = await _mediator.Send(new GetCountriesPipeline.Request());

        var data = new { Feelings = feelings, Religions = religions, Regions = regions, Countries = countries };

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

