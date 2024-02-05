// FeelingRepository.cs
using iconcept.Models.Term;


public class FeelingRepository
{
    private readonly ConceptDbContext _dbContext;

    public FeelingRepository(ConceptDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<Feeling> GetAllFeelings()
    {
        return _dbContext.Feelings.ToList();
    }
}
