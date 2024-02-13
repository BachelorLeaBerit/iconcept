using iconcept.Domain.Term;
using iconcept.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MediatR;

namespace iconcept.Infrastructure;
public class ConceptDbContext :  IdentityDbContext<User>
{
    public ConceptDbContext(DbContextOptions configuration) : base(configuration)
    {
    }
    public DbSet<User> User { get; set; }
    public DbSet<ConceptTranslation> ConceptTranslations { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<Feeling> Feelings { get; set; }
    public DbSet<Region> Regions { get; set; }
    public DbSet<Religion> Religions { get; set; }
    public DbSet<Term> Terms { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Feeling>().HasData(
            new Feeling { Id=1, FeelingName = "Glad" },
            new Feeling { Id=2, FeelingName = "Trist" },
            new Feeling { Id=3, FeelingName = "Lykkelig" },
            new Feeling { Id=4,FeelingName = "Sint" },
            new Feeling { Id=5,FeelingName = "Forvirret" }
        );
        modelBuilder.Entity<Term>().HasData(
            new Term {Id=1, TermName = "Barnevern"},
            new Term { Id=2, TermName = "Aksept" },
            new Term {Id=3,  TermName = "Arbeid" },
            new Term {Id=4, TermName = "Ansatt" },
            new Term { Id=5,TermName = "Oppfølging"}
        );
        modelBuilder.Entity<Region>().HasData(
            new Region {Id=1, RegionName = "Region1"},
            new Region { Id=2, RegionName = "Region2" }
        );
        modelBuilder.Entity<Religion>().HasData(
            new Religion {Id=1, ReligionName = "Kristendom"},
            new Religion { Id=2, ReligionName = "Islam" }
        );
        modelBuilder.Entity<Country>().HasData(
            new Country {Id=1, CountryName = "Norge"},
            new Country { Id=2, CountryName = "Sverige" }
        );
    }
}
