// FeelingsController.cs
using iconcept.Domain.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
namespace iconcept.Controllers
{
    [Route("api/feelings")]
    [ApiController]
    public class FeelingsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FeelingsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConceptTranslation>>> GetFeelings()
        {
            return await _mediator.Send(new Domain.Term.Pipelines.GetTranslationsPipeline.Request());
        }
    }
}
