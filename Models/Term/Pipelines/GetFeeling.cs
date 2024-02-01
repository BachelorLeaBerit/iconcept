// FeelingPipeline.cs

using iconcept.Models.Term;

public class FeelingPipeline
{
    private readonly FeelingRepository _feelingRepository;

    public FeelingPipeline(FeelingRepository feelingRepository)
    {
        _feelingRepository = feelingRepository;
    }

    public List<Feeling> FetchFeelings()
    {
        // Additional logic can be added here if needed
        return _feelingRepository.GetAllFeelings();
    }
}
