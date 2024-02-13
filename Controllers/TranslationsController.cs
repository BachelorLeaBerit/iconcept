// FeelingsController.cs
using iconcept.Domain.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTermsFeelings()
        {
            var terms = await _mediator.Send(new Domain.Term.Pipelines.GetTermsPipeline.Request("","",""));
            var feelings = await _mediator.Send(new Domain.Term.Pipelines.GetFeelingsPipeline.Request());
            var data = new { Terms = terms, Feelings = feelings };

            return Ok(data);
        }
        [HttpGet("filtered")]
        public async Task<ActionResult<IEnumerable<object>>> GetTermsFeelings(string country, string region, string religion)
        {
            var terms = await _mediator.Send(new Domain.Term.Pipelines.GetTermsPipeline.Request(country, region, religion));
            var feelings = await _mediator.Send(new Domain.Term.Pipelines.GetFeelingsPipeline.Request());
            var data = new { Terms = terms, Feelings = feelings };

            return Ok(data);
        }

        [HttpGet("byTermOrReligion/{id:int}/{byTerm:bool}")]
        public async Task<ActionResult<IEnumerable<ConceptTranslation>>> GetTranslations(int id, bool byTerm)
        {
            if (byTerm)
            {
                return await _mediator.Send(new Domain.Term.Pipelines.GetTranslationsByTermIdPipeline.Request(id));
            }
            return await _mediator.Send(new Domain.Term.Pipelines.GetTranslationsByFeelingIdPipeline.Request(id));
        }



        [HttpGet("{id:int}")]
        public async Task<ActionResult<ConceptTranslation>> GetTranslation(int id)
        {
            return await _mediator.Send(new Domain.Term.Pipelines.GetTranslationByIdPipeline.Request(id));
        }
    }
}
