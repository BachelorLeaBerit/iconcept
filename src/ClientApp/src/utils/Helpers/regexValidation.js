
export function regexValidation(inputString, allowedCharactersRegex) {
  if (!allowedCharactersRegex.test(inputString)) {
    return "Inneholder ugyldige tegn!";
  } else {
    return "";
  }
}
