using iconcept.Domain.Term;
using iconcept.Domain.User;
using Microsoft.EntityFrameworkCore;

public class ConceptDbContext : DbContext
{
    public ConceptDbContext(DbContextOptions<ConceptDbContext> options)
        : base(options)
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
        modelBuilder.Entity<Term>()
            .HasMany(t => t.ConceptTranslations)
            .WithOne()
            .HasForeignKey(t => t.TermId)
            .IsRequired();
    }

}
