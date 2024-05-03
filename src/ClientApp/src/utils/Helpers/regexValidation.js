export function regexValidation(inputString, allowedCharactersRegex) {
  console.log(inputString);
  for (let i = 0; i < inputString.length; i++) {
    console.log(inputString[i]);
    if (!allowedCharactersRegex.test(inputString[i])) {
      return `Ugyldig tegn funnet: '${inputString[i]}'`;
    }
  }
  return "";
}