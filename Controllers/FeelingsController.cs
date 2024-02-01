// FeelingsController.cs
using iconcept.Models.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace iconcept.Controllers
{
    [Route("api/feelings")]
    [ApiController]

    public class FeelingsController : ControllerBase
    {
        private readonly ConceptDbContext _context;

        public FeelingsController(ConceptDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feeling>>> GetFeelings()
        {
            return await _context.Feelings.ToListAsync();
        }
    }
}
