namespace Domain.Common.Utilities;

public static class StringUtilities
{
    public static string FirstLetterUpperCase(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input;
        return char.ToUpper(input[0]) + input[1..];
    }
}