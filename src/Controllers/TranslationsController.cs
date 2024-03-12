// FeelingsController.cs
using iconcept.Domain.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using iconcept.Domain.Term.Pipelines;
using iconcept.Infrastructure;
using iconcept.Domain.Term.Pipelines.ConceptTranslation;
using iconcept.Domain.Term.Pipelines.ConceptTranslations.Queries;

namespace iconcept.Controllers
{
    [Route("api/translations")]
    [ApiController]
    public class TranslationsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ConceptDbContext _dbContext;

        public TranslationsController(IMediator mediator, ConceptDbContext dbContext)
        {
            _mediator = mediator;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ConceptTranslationViewModel>>> GetTermsFeelings([FromQuery] string? searchTerm, [FromQuery] string? searchRegion, [FromQuery] string? searchCountry)
        {
            var translations = await _mediator.Send(new GetTranslationsPipeline.Request(searchTerm, searchCountry, searchRegion));
            return Ok(translations);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ConceptTranslationViewModel>> GetTranslation(int id)
        {
            return await _mediator.Send(new GetTranslationByIdPipeline.Request(id));
        }
    }
}
