using System.Collections;
using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using iconcept.Domain.Term;

namespace iconcept.Infrastructure;

public class DbContextInitializer
{
    private readonly ConceptDbContext _conceptDbContext;
    public DbContextInitializer(ConceptDbContext conceptDbContext)
    {
        _conceptDbContext = conceptDbContext;
    }

    public async Task SeedAsync()
    {

        if (!_conceptDbContext.Countries.Any())
        {
            SeedCountries();
        }

        if (!_conceptDbContext.Feelings.Any())
        {
            SeedFeelings();
        }

        if (!_conceptDbContext.Regions.Any())
        {
            SeedRegions();
        }

        if (!_conceptDbContext.Religions.Any())
        {
            SeedReligions();
        }

        if (!_conceptDbContext.Terms.Any())
        {
            SeedTerms();
        }

        if (!_conceptDbContext.ConceptTranslations.Any())
        {
            SeedTranslations();
        }
    }

    public void SeedCountries()
    {
        if (_conceptDbContext.Countries.Any())
        {
            return; // Database has already been seeded
        }

        using (var reader = new StreamReader("./Infrastructure/Seed/land.csv"))
        using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
        {
            var records = csv.GetRecords<CountryCsvRecord>().ToList();
            foreach (var record in records)
            {
                // Check if country already exists
                var existingCountry = _conceptDbContext.Countries.FirstOrDefault(c => c.CountryName == record.CountryName);
                if (existingCountry == null)
                {
                    // Add country if it doesn't exist
                    var country = new Country { CountryName = record.CountryName };
                    _conceptDbContext.Countries.Add(country);
                }
            }

            _conceptDbContext.SaveChanges();
        }
    }

    public void SeedFeelings()
    {
        if (_conceptDbContext.Feelings.Any())
        {
            return; // Database has already been seeded
        }

        using (var reader = new StreamReader("./Infrastructure/Seed/følelser.csv"))
        using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
        {
            var records = csv.GetRecords<FeelingCsvRecord>().ToList();
            foreach (var record in records)
            {
                // Check if country already exists
                var existingFeeling = _conceptDbContext.Feelings.FirstOrDefault(f => f.FeelingName == record.FeelingName);
                if (existingFeeling == null)
                {
                    // Add country if it doesn't exist
                    var feeling = new Feeling { FeelingName = record.FeelingName };
                    _conceptDbContext.Feelings.Add(feeling);
                }
            }

            _conceptDbContext.SaveChanges();
        }
    }

    public void SeedRegions()
    {
        if (_conceptDbContext.Regions.Any())
        {
            return; // Database has already been seeded
        }

        using (var reader = new StreamReader("./Infrastructure/Seed/regions.csv"))
        using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
        {
            var records = csv.GetRecords<RegionCsvRecord>().ToList();
            foreach (var record in records)
            {
                // Check if country already exists
                var existingRegion = _conceptDbContext.Regions.FirstOrDefault(f => f.RegionName == record.RegionName);
                if (existingRegion == null)
                {
                    // Add country if it doesn't exist
                    var region = new Region { RegionName = record.RegionName };
                    _conceptDbContext.Regions.Add(region);
                }
            }

            _conceptDbContext.SaveChanges();
        }
    }


    public void SeedReligions()
    {
        if (_conceptDbContext.Religions.Any())
        {
            return; // Database has already been seeded
        }

        using (var reader = new StreamReader("./Infrastructure/Seed/religions.csv"))
        using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
        {
            var records = csv.GetRecords<ReligionCsvRecord>().ToList();
            foreach (var record in records)
            {
                // Check if country already exists
                var existingReligion = _conceptDbContext.Religions.FirstOrDefault(f => f.ReligionName == record.ReligionName);
                if (existingReligion == null)
                {
                    // Add country if it doesn't exist
                    var religion = new Religion { ReligionName = record.ReligionName };
                    _conceptDbContext.Religions.Add(religion);
                }
            }

            _conceptDbContext.SaveChanges();
        }
    }

    public void SeedTerms()
    {
        if (_conceptDbContext.Terms.Any())
        {
            return;
        }

        using (var reader = new StreamReader("./Infrastructure/Seed/terms.csv"))
        using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
        {
            var records = csv.GetRecords<TermCsvRecord>().ToList();
            foreach (var record in records)
            {
                var existingTerm = _conceptDbContext.Terms.FirstOrDefault(t => t.TermName == record.TermName);
                if (existingTerm == null)
                {
                    var term = new Term { TermName = record.TermName };
                    _conceptDbContext.Terms.Add(term);
                }
            }

            _conceptDbContext.SaveChanges();
        }
    }

    public void SeedTranslations()
    {
        if (_conceptDbContext.ConceptTranslations.Any())
        {
            return;
        }

        Dictionary<int, IEnumerable<string>> Countries = new Dictionary<int, IEnumerable<string>>
        {{1, new List<string>{"Algerie", "Marokko", "Mauritania", "Libya", "Tunisia", "Egypt", "Sudan", "Saudi-Arabia", "Syria", "Jordan", "Jemen", "Irak", "Libanon", "Bangladesh"}},
        {2, new List<string>{"Etiopia", "Eritrea", "Mali", "Niger", "Nigeria", "Ghana","Elfenbenskysten"}},
        {3, new List<string>{ "Iran", "Afghanistan", "Pakistan"}},
        {4, new List<string>{"Tyrkia"}},
        {5, new List<string>{"Polen", "Bulgaria", "Romania", "Belarus (Hviterussland)", "Ukraina", "Moldova", "Russland", "Slovenia", "Tsjekkia", "Latvia", "Litauen", "Estland"}},
        {6, new List<string>{"Turkmenistan", "Kasakhstan", "Kirgisistan", "Tadsjikistan", "Usbekistan"}},
        {7, new List<string>{"India", "Bangaladesh", "Sri Lanka"}},
        {8, new List<string>{"Myanmar (Burma)", "Thailand", "Vietnam", "Malaysia"}},
        {9, new List<string>{"Kina", "Taiwan"}}};

        Dictionary<int, string> Regions = new Dictionary<int, string>
        {{1, "Arabiske beltet"},
        {2, "Det kristne Afrika"},
        {3, "Persiske"},
        {4, "De turkmenske land"},
        {5, "Øst-Europa (Polen)"},
        {6, "Sentralasia"},
        {7, "Det indiske subkontinent"},
        {8, "Sør-øst Asia"},
        {9, "Kinesisk"}};

        using (var reader = new StreamReader("./Infrastructure/Seed/konsepter.csv"))
        using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
        {
            var records = csv.GetRecords<ConceptTranslationCsvRecord>().ToList();
            foreach (var record in records)
            {
                var existingCt = _conceptDbContext.ConceptTranslations.FirstOrDefault(t => t.Translation == record.ConceptTranslation);
                if (existingCt == null)
                {
                    var termId = _conceptDbContext.Terms.FirstOrDefault(t => t.TermName == record.TermName);
                    if (termId != null)
                    {


                        var ct = new ConceptTranslation
                        {
                            TermId = termId.Id,
                            Translation = record.ConceptTranslation,
                            Comment = record.Comment,
                            Context = record.Context,
                            NorwegianDefinition = record.NorwegianDefinition,
                            LastModified = new DateTime(record.Date, 1, 1)
                        };
                        _conceptDbContext.ConceptTranslations.Add(ct);

                        var parts = record.Countries.Split(',').Select(part => part.Trim()).ToList();
                        var countryNames = new List<string>();
                        var regionNames = new List<string>();

                        foreach (var part in parts)
                        {
                            if (int.TryParse(part, out var number))
                            {
                                if (Countries.TryGetValue(number, out var countryList))
                                {
                                    countryNames.AddRange(countryList);
                                }
                                // Check if the number corresponds to a region
                                if (Regions.TryGetValue(number, out var regionName))
                                {
                                    regionNames.Add(regionName);
                                }
                            }
                            else
                            {
                                continue;
                            }
                        }

                        var matchingCountries = _conceptDbContext.Countries
                        .Where(c => countryNames.Contains(c.CountryName))
                        .ToList();

                        ct.Countries = matchingCountries;

                        var matchingRegions = _conceptDbContext.Regions
                        .Where(r => regionNames.Contains(r.RegionName))
                        .ToList();

                        ct.Regions = matchingRegions;

                        // Add feelings
                        var feelings = record.Feeling.Split(';').Select(feeling => feeling.Trim()).ToList();
                        var matchingFeelings = new List<Feeling>();

                        foreach (var feelingName in feelings)
                        {
                            var existingFeeling = _conceptDbContext.Feelings.FirstOrDefault(f => f.FeelingName == feelingName);

                            if (existingFeeling != null)
                            {
                                matchingFeelings.Add(existingFeeling);
                            }
                            else
                            {
                                continue;
                            }
                        }
                        ct.Feelings = matchingFeelings;

                        //Add religion
                        var religions = record.Religion.Split(',').Select(religion => religion.Trim()).ToList();
                        var matchingReligions = new List<Religion>();

                        foreach (var religionName in religions)
                        {
                            var name = religionName;
                            if (name != "Alle")
                            {
                                if (religionName == "kristen")
                                {
                                    name = "Kristendom";
                                }
                                else if (religionName == "katlsk")
                                {
                                    name = "Katolisisme";
                                }

                                var existingReligion = _conceptDbContext.Religions.FirstOrDefault(f => f.ReligionName == name);

                                if (existingReligion != null)
                                {
                                    matchingReligions.Add(existingReligion);
                                }
                                else
                                {
                                    continue;
                                }
                            }
                        }
                        ct.Religions = matchingReligions;


                    }
                }
            }

            _conceptDbContext.SaveChanges();
        }
    }
}

public class CountryCsvRecord
{
    public string CountryName { get; set; }
}
public class FeelingCsvRecord
{
    public string FeelingName { get; set; }
}

public class RegionCsvRecord
{
    public string RegionName { get; set; }
}

public class ReligionCsvRecord
{
    public string ReligionName { get; set; }
}

public class TermCsvRecord
{
    public string TermName { get; set; }
}

public class ConceptTranslationCsvRecord
{
    public string TermName { get; set; }
    public string NorwegianDefinition { get; set; }
    public string Context { get; set; }
    public string Comment { get; set; }
    public string ConceptTranslation { get; set; }
    public int Date { get; set; }
    public string Countries { get; set; }
    public string Feeling { get; set; }
    public string Religion { get; set; }
}