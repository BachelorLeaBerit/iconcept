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
        try
        {
            await TrySeed();
            await _conceptDbContext.SaveChangesAsync();
        }
        catch (Exception err)
        {
            throw new Exception("Did not work!", err);
        }
    }

    public async Task TrySeed()
    {
        //await SeedFeelingsAsync();
        await SeedTermAndStuff();
    }

    // public async Task SeedFeelingsAsync()
    // {
    //     if (_conceptDbContext.Feelings.Any()) return;
    //     await _conceptDbContext.Feelings.AddRangeAsync(
    //         [new Feeling { FeelingName = "Glad", },
    //         new Feeling {  FeelingName = "Trist" },
    //         new Feeling {  FeelingName = "Lykkelig" },
    //         new Feeling { FeelingName = "Sint" },
    //         new Feeling { FeelingName = "Forvirret" }]
    //     );
    // }

    public async Task SeedTermAndStuff()
    {
        if (_conceptDbContext.Terms.Any()) return;

        List<Feeling> feelings = [new Feeling { FeelingName = "Glad", },
                            new Feeling {  FeelingName = "Trist" },
                            new Feeling {  FeelingName = "Lykkelig" },
                            new Feeling { FeelingName = "Sint" },
                            new Feeling { FeelingName = "Forvirret" },
                            new Feeling { FeelingName = "Håpefull"}];
        
        var term = new Term {Id=1, TermName = "Barnevern", ConceptTranslations = [new ConceptTranslation
            {
                Comment = "Somehing",
                Context = "something les",
                Countries = [new Country{CountryName = "Norway"}],
                Feelings = feelings,
                Translation = "Mordi",
                Religions = [new Religion{ReligionName = "Jahovas vitner"}],
                Regions = [],
                LastModified = DateTime.Now,
                Status = Status.Approved
            },
            new ConceptTranslation{
                Comment = "Nice comment",
                Context = "Amazing context",
                Countries = [new Country{CountryName = "India"}],
                Feelings = [feelings[0], feelings[1]],
                Regions = [],
                Religions = [],
                LastModified = DateTime.Now,
                Translation = "Translated translation lala",
                Status = Status.Approved
            }
            ]};

        await _conceptDbContext.Terms.AddRangeAsync([
            term,
            new Term { Id=2, TermName = "Aksept", ConceptTranslations = [new ConceptTranslation {
                Comment = "A comment",
                Context = "Context lala",
                Countries = [new Country{CountryName = "Sverige"}],
                Feelings = [feelings[2], feelings[3]],
                Translation = "Allaka kakjd f kaj kla fielkak g ",
                Religions = [new Religion{ReligionName = "Kristendom"}],
                Regions = [new Region{RegionName = "Region1"}],
                LastModified = DateTime.Now,
                Status = Status.Approved
            },
            new ConceptTranslation{
                Comment = "Nice comment",
                Context = "Amazing context",
                Countries = [new Country{CountryName = "India"}],
                Feelings = [feelings[0], feelings[1]],
                Regions = [],
                Religions = [new Religion{ReligionName = "Islam"}],
                LastModified = DateTime.Now,
                Translation = "kj gjskjo ag00jio sgiog ijiow djkkgi oerowpw jjksn <se",
                Status = Status.Approved
            }] },
             new Term {Id=3,  TermName = "Arbeid", ConceptTranslations = [new ConceptTranslation {
                Comment = "A comment",
                Context = "Context lala",
                Countries = [new Country{CountryName = "Thailand"}],
                Feelings = [feelings[4], feelings[2]],
                Translation = "Allaka kakjd f kaj kla fielkak g ",
                Religions = [new Religion{ReligionName = "Buddhisme"}],
                Regions = [new Region{RegionName = "Region2"}],
                LastModified = DateTime.Now,
                Status = Status.Approved
             }] },
            // new Term {Id=4, TermName = "Ansatt" },
            // new Term { Id=5,TermName = "Oppfølging"}
        ]);

    }
}