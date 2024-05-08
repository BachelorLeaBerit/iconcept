using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Algolia.Search.Clients;
using Algolia.Search.Http;
using iconcept.Domain.Term.DTO;
using iconcept.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace iconcept.Domain.Term.Services;

public class SearchServiceManager
{
    private readonly ISearchClient _searchClient;
    private readonly ConceptDbContext _db;

    public SearchServiceManager(ISearchClient searchClient, ConceptDbContext dbContext)
    {
        _searchClient = searchClient ?? throw new ArgumentNullException(nameof(searchClient));
        _db = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public async Task SaveRecordsToAlgoliaAsync(CancellationToken cancellationToken = default)
    {
        var index = _searchClient.InitIndex("bachelor_index");

        var records = await _db.ConceptTranslations
            .Include(c => c.Religions)
            .Include(c => c.Regions)
            .Include(c => c.Countries)
            .Select(ct => new AlgoliaDto
            {
                ObjectID = ct.Id.ToString(),
                NorwegianDefinition = ct.NorwegianDefinition,
                Context = ct.Context,
                Translation = ct.Translation,
                Regions = ct.Regions.Select(r => r.RegionName).ToList(),
                Countries = ct.Countries.Select(c => c.CountryName).ToList(),
                Religions = ct.Religions.Select(r => r.ReligionName).ToList(),
                Feelings = ct.Feelings.Select(f => f.FeelingName).ToList(),
                TermName = _db.Terms.FirstOrDefault(term => term.Id == ct.TermId)!.TermName,
                Comment = ct.Comment,
            })
            .ToListAsync();
        bool autoGenerateObjectIDIfNotExist = false;

        index.SaveObjects(records, null, autoGenerateObjectIDIfNotExist);


    }

    public async Task DeleteRecord(string objectId)
    {
        if (string.IsNullOrEmpty(objectId))
            throw new ArgumentException("Object ID cannot be null or empty.", nameof(objectId));

        var index = _searchClient.InitIndex("bachelor_index");
        await index.DeleteObjectAsync(objectId);
    }

    public async Task SaveRecord(ConceptTranslation translation)
    {
        var index = _searchClient.InitIndex("bachelor_index");
        var term = await _db.Terms.FirstOrDefaultAsync(t => t.Id == translation.TermId);
        if (term is null) throw new Exception($"Term with Id {translation.Id} does not exits.");

        var religions = new List<string>();
        if (translation.Religions is not null)
        {
            foreach (Religion religion in translation.Religions)
            {
                religions.Add(religion.ReligionName);
            }
        }

        var regions = new List<string>();
        if (translation.Regions is not null)
        {
            foreach (Region region in translation.Regions)
            {
                regions.Add(region.RegionName);
            }
        }
        var feelings = new List<string>();
        if (translation.Feelings is not null)
        {
            foreach (Feeling feeling in translation.Feelings)
            {
                feelings.Add(feeling.FeelingName);
            }
        }
        var countries = new List<string>();
        if (translation.Countries is not null)
        {
            foreach (Country country in translation.Countries)
            {
                countries.Add(country.CountryName);
            }
        }

        var record = new AlgoliaDto
        {
            ObjectID = translation.Id.ToString(),
            NorwegianDefinition = translation.NorwegianDefinition,
            Context = translation.Context,
            Translation = translation.Translation,
            TermName = term.TermName,
            Regions = regions,
            Feelings = feelings,
            Religions = religions,
            Countries = countries,
            Comment = translation.Comment
        };

        await index.SaveObjectAsync(record, null, default, false);
    }

    public async Task UpdateRecord(int Id, string newTranslation)
    {
        var index = _searchClient.InitIndex("bachelor_index");
        var partialUpdateObject = new AlgoliaDto
        {
            ObjectID = Id.ToString(),
            Translation = newTranslation
        };

        await index.PartialUpdateObjectAsync(partialUpdateObject);

    }
}

