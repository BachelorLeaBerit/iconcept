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
// public class GetTranslationsByFeelingIdPipeline
// {
//     public record Request(int Id, string Region, string Country, string Term) : IRequest<List<ConceptTranslationViewModel>> { }

//     public class Handler : IRequestHandler<Request, List<ConceptTranslationViewModel>>
//     {
//         private readonly ConceptDbContext _db;

//         public Handler(ConceptDbContext db)
//         {
//             _db = db ?? throw new ArgumentNullException(nameof(db));
//         }

//         public async Task<List<ConceptTranslationViewModel>> Handle(Request request, CancellationToken cancellationToken)
//         {
//             var country = request.Country?.ToLower().Trim();
//             var region = request.Region?.ToLower().Trim();
//             var term = request.Term?.ToLower().Trim();
//             if (term != "")
//             {
//                 var termByName = await _db.Terms.Where(t => t.TermName.ToLower() == term).SingleOrDefaultAsync();
//                 if (termByName != null)
//                 {
//                     var translations1 = await _db.ConceptTranslations
//                     .Include(c => c.Religions)
//                     .Include(c => c.Regions)
//                     .Include(c => c.Countries)
//                     .Include(c => c.Feelings)
//                     .Where(ct =>
//                         ct.Id == termByName.Id &&
//                         ct.Status == Status.Approved &&
//                         ct.Feelings.Any(r => r.Id == request.Id) &&
//                         (string.IsNullOrEmpty(country) || ct.Countries.Any(c => c.CountryName.ToLower().Contains(country))) &&
//                         (string.IsNullOrEmpty(region) || ct.Regions.Any(r => r.RegionName.ToLower().Contains(region)))
//                     )
//                     .Select(t => new ConceptTranslationViewModel
//                     {
//                         Id = request.Id,
//                         NorwegianDefinition = t.NorwegianDefinition,
//                         Comment = t.Comment,
//                         Context = t.Context,
//                         Translation = t.Translation,
//                         Status = t.Status,
//                         LastModified = t.LastModified,
//                         Regions = t.Regions.Select(r => new RegionViewModel { RegionName = r.RegionName }).ToList(),
//                         Countries = t.Countries.Select(c => new CountryViewModel { CountryName = c.CountryName }).ToList(),
//                         Feelings = t.Feelings.Select(f => new FeelingVm { FeelingName = f.FeelingName }).ToList(),
//                         Religions = t.Religions.Select(rl => new ReligionVm { ReligionName = rl.ReligionName }).ToList()
//                     })
//                     .ToListAsync(cancellationToken);
//                     return translations1;
//                 }
//             }
//             var translations = await _db.ConceptTranslations
//             .Include(c => c.Religions)
//             .Include(c => c.Regions)
//             .Include(c => c.Countries)
//             .Include(c => c.Feelings)
//             .Where(ct =>
//                 ct.Status == Status.Approved &&
//                 ct.Feelings.Any(r => r.Id == request.Id) &&
//                 (string.IsNullOrEmpty(country) || ct.Countries.Any(c => c.CountryName.ToLower().Contains(country))) &&
//                 (string.IsNullOrEmpty(region) || ct.Regions.Any(r => r.RegionName.ToLower().Contains(region)))
//             )
//             .Select(t => new ConceptTranslationViewModel
//                     {
//                         Id = request.Id,
//                         NorwegianDefinition = t.NorwegianDefinition,
//                         Comment = t.Comment,
//                         Context = t.Context,
//                         Translation = t.Translation,
//                         Status = t.Status,
//                         LastModified = t.LastModified,
//                         Regions = t.Regions.Select(r => new RegionViewModel { RegionName = r.RegionName }).ToList(),
//                         Countries = t.Countries.Select(c => new CountryViewModel { CountryName = c.CountryName }).ToList(),
//                         Feelings = t.Feelings.Select(f => new FeelingVm { FeelingName = f.FeelingName }).ToList(),
//                         Religions = t.Religions.Select(rl => new ReligionVm { ReligionName = rl.ReligionName }).ToList()
//                     })
//             .ToListAsync(cancellationToken);
//             return translations;
//         }
//     }

// }
