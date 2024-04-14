// FeelingsController.cs
using iconcept.Domain.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using iconcept.Infrastructure;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;
using iconcept.Domain.Term.Pipelines.Get;
using Algolia.Search.Clients;

namespace iconcept.Controllers
{
    [Route("api/translations")]
    [ApiController]
    public class TranslationsController : ControllerBase
    {
        private readonly IMediator _mediator;
       private readonly ISearchClient _searchClient;
        private ISearchClient? searchClient;

        public TranslationsController(IMediator mediator)
        {
            _mediator = mediator;
            _searchClient = searchClient;
        }

        [HttpGet]
        public async Task<ActionResult<List<ConceptTranslationViewModel>>> GetTermsFeelings([FromQuery] string? searchTerm, [FromQuery] string? searchRegion, [FromQuery] string? searchCountry, [FromQuery] int PageNumber, [FromQuery] int PageSize)
        {
            var translations = await _mediator.Send(new GetTranslationsPipeline.Request(searchTerm, searchCountry, searchRegion, PageNumber, PageSize));
            return Ok(translations);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ConceptTranslationViewModel>> GetTranslation(int id)
        {
            return await _mediator.Send(new GetTranslationByIdPipeline.Request(id));
        }
    }
}
