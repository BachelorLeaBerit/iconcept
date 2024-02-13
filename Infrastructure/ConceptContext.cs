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
}
