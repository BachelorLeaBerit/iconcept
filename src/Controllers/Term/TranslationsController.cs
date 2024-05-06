// FeelingsController.cs
using iconcept.Domain.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using iconcept.Infrastructure;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Commands;
using iconcept.Domain.Term.Pipelines.Get;
using Algolia.Search.Clients;
using iconcept.Domain.Term.Pipelines.ConceptTranslation.Queries;
using Microsoft.AspNetCore.Authorization;

namespace iconcept.Controllers
{
    [Route("api/translations")]
    [ApiController]
    public class TranslationsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TranslationsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ConceptTranslationViewModel>> GetTranslation(int id)
        {
            return await _mediator.Send(new GetTranslationByIdPipeline.Request(id));
        }

        [Authorize(Roles = "Admin, Redaktør")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteTranslation(int id)
        {
            await _mediator.Send(new DeleteTranslationCommand(id));
            return NoContent();
        }
    }
}
