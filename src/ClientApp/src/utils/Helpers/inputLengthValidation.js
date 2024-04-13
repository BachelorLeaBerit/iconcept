
export function inputLengthValidation(inputString, maxLength, minLength)
{
    if (inputString.length > maxLength)
    {
        return `Kan ikke være lengre enn ${maxLength}`;
    } else if (inputString.length < minLength)
    {
        return `Kan ikke være kortere enn ${minLength}`
    }
    return "";
}