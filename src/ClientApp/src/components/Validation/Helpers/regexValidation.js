export function regexValidation(inputString, allowedCharactersRegex) {
  console.log(allowedCharactersRegex);
  if (!allowedCharactersRegex.test(inputString)) {
    return "Inneholder ugyldige tegn!";
  } else {
    return "";
  }
}
