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

    public async Task SeedTermAndStuff()
    {
        if (_conceptDbContext.Terms.Any()) return;

        List<Feeling> feelings = [new Feeling { FeelingName = "Glad", },
                            new Feeling {  FeelingName = "Trist" },
                            new Feeling {  FeelingName = "Lykkelig" },
                            new Feeling { FeelingName = "Sint" },
                            new Feeling { FeelingName = "Forvirret" },
                            new Feeling { FeelingName = "Håpefull"},
                            new Feeling { FeelingName = "Utvikling"},
                            new Feeling { FeelingName = "Trygghet"},
                            new Feeling { FeelingName = "Avslappet"}];
        
           
        await _conceptDbContext.Terms.AddRangeAsync([
            new Term { Id=1, TermName = "Kriminell", ConceptTranslations = [
                new ConceptTranslation {
                NorwegianDefinition = "En person som har gjort handlinger som kommer inn under straffeloven",
                Context = "En som en gang er blitt stemplet som kriminell, kan ha vansker med å bli akseptert – ikke bare av storsamfunnet, men også av familien og minoritetssamfunnet.",
                Countries = [new Country{CountryName = "Algerie, Marokko, Mauretania, Libya, Tunisia, Egypt, Sudan, Saudi-Arabia, Syria, Jordan, Yemen, Irak, Libanon"}],
                Feelings = [feelings[2], feelings[3]], // Alvorlig for både en selv og familien. 
                Translation = "Å være kriminell i Norge er som en som kapper av hånden og spiser haram mat.",
                Religions = [new Religion{ReligionName = "Islam"}],
                Regions = [new Region{RegionName = "Arabiske beltet"}],
                LastModified = new DateTime(2007, 1, 1), // Fix: Change the value to a DateTime object
                Status = Status.Approved
            },
          
            ]},
            new Term { Id=2, TermName = "Aksept", ConceptTranslations = [
                new ConceptTranslation {
                NorwegianDefinition = "Godtaking (av et tilbud, en tilstand el.)",
                Comment = "A comment",
                Context = "Akseptere at for eksempel barnet er døvt eller har en uopprettelig skade.",
                Countries = [new Country{CountryName = "Algerie, Marokko, Mauretania, Libya, Tunisia, Egypt, Sudan, Saudi-Arabia, Syria, Jordan, Yemen, Irak, Libanon"}],
                Feelings = [feelings[2], feelings[3]], // Alvorlig for både en selv og familien. 
                Translation = "Det sies at sannheten er som en sol, og på same måte som du ikke kan dekke solen med to fingre, må du akseptere sannheten om at barnet ditt ikke kan høre. På samme måte som du ikke kan holde to vannmeloner med en hånd, må du akseptere at barnet ditt er døvt. Ikke tenk som kabk (en fugl) som gjemmer hodet i snøen eller under steinen. Eller som strutsen som når farene kommer, gjemmer hodet i sanden.",
                Religions = [new Religion{ReligionName = "Islam"}, new Religion{ReligionName = "Kristendommen"}],
                Regions = [new Region{RegionName = "Arabiske beltet"}, new Region{RegionName = "Kristine Afrika"}],
                LastModified = new DateTime(2007, 1, 1), // Fix: Change the value to a DateTime object
                Status = Status.Approved
            },
          
            ]},
            new Term {Id=3, TermName = "Barnehage", ConceptTranslations = [
            new ConceptTranslation
            {
                NorwegianDefinition = "En pedagogisk virksomhet for barn under skolepliktig alder; vanligvis åpen 4—9 timer pr. dag ",
                Comment = "Barnehager kan være ukjent for folk i noen land",
                Context = "En barnehage er et sted for barn under skolealder",
                Countries = [new Country{CountryName = "Norge"}],
                Feelings = [feelings[6], feelings[7]],
                Translation = "I vårt hjemland er det vanlig at andre familiemedlemmer – f.eks. en tante eller en søster, tar seg av barna når foreldrene arbeider. I Norge fungerer barnehagen nesten på samme måte. Barnehagen er som et bestemors hjem og barna er trygge som i et fuglereir.",
                Religions = [new Religion{ReligionName = "Islam"}, new Religion{ReligionName = "Kristendommen"}],
                Regions = [],
                LastModified = DateTime.Now,
                Status = Status.Approved
            },
            ]},
            new Term {Id=4, TermName = "Arbeidstid i Norge", ConceptTranslations = [
            new ConceptTranslation
            {
                NorwegianDefinition = "Normaltiden man jobber i Norge er på 7,5 timer ",
                Context = "Det er lover som regulerer arbeidstiden og man må søke om dispensasjon dersom man ikke kan holde seg innenfor denne tiden.",
                Countries = [new Country{CountryName = "Algerie, Marokko, Mauretania, Libya, Tunisia, Egypt, Sudan, Saudi-Arabia, Syria, Jordan, Yemen, Irak, Libanon"}],
                Feelings = [feelings[6], feelings[7]],
                Translation = "I mange land kan man jobbe så mye man orker. I Norge er det annerledes. På samme måte som Ramadan varer en måned varer en arbeidsdag 7,5 timer.",
                Religions = [new Religion{ReligionName = "Islam"}],
                Regions =  [new Region{RegionName = "Arabiske beltet"}],
                LastModified = new DateTime(2003, 1, 1), // Fix: Change the value to a DateTime object
                Status = Status.Approved
            }
            ]},
        ]);

    }
}