// // FeelingPipeline.cs

// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading;
// using System.Threading.Tasks;
// using MediatR;
// using Microsoft.EntityFrameworkCore;

// using iconcept.Domain.Term;

// namespace iconcept.Domain.Term.Pipelines;
// public class GetFeelingsFilteredPipeline
// {
//     public record Request(string Term, string Region, string Country) : IRequest<List<FeelingVm>> { }

//     public class Handler : IRequestHandler<Request, List<FeelingVm>>
//     {
//         private readonly ConceptDbContext _db;

//         public Handler(ConceptDbContext db)
//         {
//             _db = db ?? throw new ArgumentNullException(nameof(db));
//         }

//         public async Task<List<FeelingVm>> Handle(Request request, CancellationToken cancellationToken)
//         {
//             var region = request.Region?.ToLower().Trim();
//             var country = request.Country?.ToLower().Trim();
//             if (request.Term != null)
//             {
//                 var term = await _db.Terms.Where(t => t.TermName.ToLower() == request.Term.ToLower().Trim()).SingleOrDefaultAsync();
//                 if (term != null)
//                 {
//                     var feelings1 = await _db.Feelings
//                         .Include(feeling => feeling.ConceptTranslations)
//                             .ThenInclude(ct => ct.Countries)
//                         .ThenInclude(term => term.ConceptTranslations)
//                             .ThenInclude(ct => ct.Regions)
//                         .Where(f =>
//                             f.ConceptTranslations.Any(ct =>
//                                 (string.IsNullOrEmpty(country) || ct.Countries.Any(c => c.CountryName.ToLower().Contains(country))) &&
//                                 (string.IsNullOrEmpty(region) || ct.Regions.Any(r => r.RegionName.ToLower().Contains(region))) &&
//                                 ct.TermId == term.Id
//                             )
//                         )
//                         .Select(f => new FeelingVm
//                         {
//                             FeelingName = f.FeelingName,
//                             FeelingId = f.Id,
//                             ConceptTranslations = f.ConceptTranslations.Select(ct => new ConceptTranslationViewModel
//                             {
//                                 Regions = ct.Regions.Select(r => new RegionViewModel { RegionName = r.RegionName }).ToList(),
//                                 Countries = ct.Countries.Select(c => new CountryViewModel { CountryName = c.CountryName }).ToList()
//                             }).ToList()
//                         })
//                         .ToListAsync(cancellationToken);

//                     return feelings1;
//                 }
//             }

//             var feelings = await _db.Feelings
//                 .Include(feeling => feeling.ConceptTranslations)
//                     .ThenInclude(ct => ct.Countries)
//                 .ThenInclude(term => term.ConceptTranslations)
//                     .ThenInclude(ct => ct.Regions)
//                 .Where(f =>
//                     f.ConceptTranslations.Any(ct =>
//                         (string.IsNullOrEmpty(country) || ct.Countries.Any(c => c.CountryName.ToLower().Contains(country))) &&
//                         (string.IsNullOrEmpty(region) || ct.Regions.Any(r => r.RegionName.ToLower().Contains(region)))
//                     )
//                 )
//                 .Select(f => new FeelingVm
//                 {
//                     FeelingName = f.FeelingName,
//                     FeelingId = f.Id,
//                     ConceptTranslations = f.ConceptTranslations.Select(ct => new ConceptTranslationViewModel
//                     {
//                         Regions = ct.Regions.Select(r => new RegionViewModel { RegionName = r.RegionName }).ToList(),
//                         Countries = ct.Countries.Select(c => new CountryViewModel { CountryName = c.CountryName }).ToList()
//                     }).ToList()
//                 })
//                         .ToListAsync(cancellationToken);

//             return feelings;


//         }
//     }

// }
