using iconcept.Domain.Term;
using iconcept.Domain.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MediatR;

namespace iconcept.Infrastructure;
public class ConceptDbContext :  IdentityDbContext<User>
{
    public ConceptDbContext(DbContextOptions configuration) : base(configuration)
    {
    }
    public DbSet<ConceptTranslation> ConceptTranslations { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<Feeling> Feelings { get; set; }
    public DbSet<Region> Regions { get; set; }
    public DbSet<Religion> Religions { get; set; }
    public DbSet<Term> Terms { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Term>()
            .HasMany(t => t.ConceptTranslations)
            .WithOne()
            .HasForeignKey(t => t.TermId)
            .IsRequired();


        modelBuilder.Entity<User>()
                   .HasMany(u => u.Roles)
                   .WithOne()
                   .HasForeignKey(ur => ur.UserId)
                   .IsRequired();

        
                modelBuilder.Entity<User>()
                .Property(u => u.FirstName)
                .IsRequired();

                modelBuilder.Entity<User>()
                .Property(u => u.LastName)
                .IsRequired();
    }

}
