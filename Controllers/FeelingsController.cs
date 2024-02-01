// FeelingsController.cs
using iconcept.Models.Term;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace YourProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
