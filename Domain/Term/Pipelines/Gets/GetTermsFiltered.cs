// using iconcept.Domain.Term;
// using MediatR;
// using Microsoft.EntityFrameworkCore;
// using System;
// using System.Collections.Generic;
// using System.IO.Compression;
// using System.Linq;
// using System.Threading;
// using System.Threading.Tasks;

// namespace iconcept.Domain.Term.Pipelines;
// public class GetTermsFilteredPipeline
// {
//     public record Request(string Term, string Region, string Country) : IRequest<List<TermViewModel>>;

//     public class Handler : IRequestHandler<Request, List<TermViewModel>>
//     {
//         private readonly ConceptDbContext _db;

//         public Handler(ConceptDbContext db)
//         {
//             _db = db ?? throw new ArgumentNullException(nameof(db));
//         }

//         public async Task<List<TermViewModel>> Handle(Request request, CancellationToken cancellationToken)
//         {
//             var term = request.Term?.ToLower().Trim();
//             var region = request.Region?.ToLower().Trim();
//             var country = request.Country?.ToLower().Trim();

//             var terms = await _db.Terms
//                 .Include(t => t.ConceptTranslations)
//                 .ThenInclude(ct => ct.Regions)
//                 .Include(t => t.ConceptTranslations)
//                 .ThenInclude(ct => ct.Countries)
//                 .Where(t => t.TermName == term ||
//                     t.ConceptTranslations.Any(ct =>
//                         (string.IsNullOrEmpty(country) || ct.Countries.Any(c => c.CountryName.ToLower().Contains(country))) &&
//                         (string.IsNullOrEmpty(region) || ct.Regions.Any(r => r.RegionName.ToLower().Contains(region)))
//                     )
//                 )
//                 .Select(t => new TermViewModel
//                     {
//                         TermName = t.TermName,
//                         TermId = t.Id,
//                         ConceptTranslations = t.ConceptTranslations.Select(ct => new ConceptTranslationViewModel
//                         {
//                             Regions = ct.Regions.Select(r => new RegionViewModel { RegionName = r.RegionName }).ToList(),
//                             Countries = ct.Countries.Select(c => new CountryViewModel { CountryName = c.CountryName }).ToList()
//                         }).ToList()
//                     })
//                     .ToListAsync(cancellationToken);


//             return terms;
//         }
//     }
// }
