
export function regexValidation(inputString, allowedCharactersRegex) {
  console.error(inputString);
  if (!allowedCharactersRegex.test(inputString)) {
    return "Inneholder ugyldige tegn!";
  } else {
    return "";
  }
}
