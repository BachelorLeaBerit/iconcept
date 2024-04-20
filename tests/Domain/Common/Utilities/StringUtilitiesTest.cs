using Xunit;
using Domain.Common.Utilities;

namespace Domain.Tests.Common.Utilities;
public class StringUtilitiesTests
{
    [Fact]
    public void ShouldCapitalizeFirstLetter()
    {
        string input = "string";
        string expectedOutput = "String";
        string result = StringUtilities.FirstLetterUpperCase(input);

        Assert.Equal(expectedOutput, result);
    }

    [Fact]
    public void ShouldReturnSameStringIfEmpty()
    {
        string input = "";
        string expectedOutput = "";

        string result = StringUtilities.FirstLetterUpperCase(input);

        Assert.Equal(expectedOutput, result);
    }

    [Fact]
    public void ShouldReturnSameStringIfNull()
    {
        string input = null;
        string expectedOutput = null;

        string result = StringUtilities.FirstLetterUpperCase(input);

        Assert.Equal(expectedOutput, result);
    }

    [Fact]
    public void ShouldHandleSingleCharacter()
    {
        string input = "a";
        string expectedOutput = "A";

        string result = StringUtilities.FirstLetterUpperCase(input);

        Assert.Equal(expectedOutput, result);
    }
}
