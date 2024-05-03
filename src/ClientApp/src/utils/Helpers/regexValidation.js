
export function regexValidation(inputString, allowedCharactersRegex) {
  console.log(inputString);
  if (!allowedCharactersRegex.test(inputString)) {
    return "Inneholder ugyldige tegn!";
  } else {
    return "";
  }
}
