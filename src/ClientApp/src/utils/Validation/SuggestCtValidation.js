import { regexValidation } from "../Helpers/regexValidation";
import { inputLengthValidation } from "../Helpers/inputLengthValidation";

export const ValidateForm = (formData) => {
  const errors = {};

  const allowedCharactersRegex = /^[a-zA-Z0-9æøåÆØÅ;:.,!?()\- \n]*$/;
  const regex = /^[a-zA-ZæøåÆØÅ()\- ]*$/;
  // Sanitize and validate Begrep field
  let termNameData = formData.termName.trim();
  let termNameLengthError = inputLengthValidation(termNameData, 50, 2);
  let termNameRegexError = regexValidation(termNameData, regex);
  if (!termNameData) {
    errors.termName = "Må inneholde et begrep!";
  } else if (termNameRegexError !== "") {
    errors.termName = termNameRegexError;
  } else if (termNameLengthError !== "") {
    errors.termName = termNameLengthError;
  }

  // Sanitize and validate Konseptoversettelse field
  let translationData = formData.translation.trim();
  let translationLengthError = inputLengthValidation(translationData, 500, 50);
  let translationRegexError = regexValidation(translationData, allowedCharactersRegex)
  if (!translationData) {
    errors.translation = "Må inneholde en konseptoversettelse!";
  } else if (translationRegexError !== "") {
    errors.translation = translationRegexError;
  } else if (translationLengthError !== "") {
    errors.translation = translationLengthError;
  }

  // Sanitize and validate Kommentar field
  let max = 300;
  let min = 50;

  let contextData = formData.context.trim();
  let contextLengthError = inputLengthValidation(contextData, max, min);
  let contextRegexError = regexValidation(contextData, allowedCharactersRegex);
  if (contextData) {
    if (contextLengthError !== "") {
      errors.context = contextLengthError;
    } else if (contextRegexError !== "") {
      errors.context = contextRegexError;
    }
  }

  let commentData = formData.comment.trim();
  let commentLengthError = inputLengthValidation(commentData, max, min);
  let commentRegexError = regexValidation(commentData, allowedCharactersRegex);
  if (commentData) {
    if (commentLengthError !== "") {
      errors.comment = commentLengthError;
    } else if (commentRegexError !== "") {
      errors.comment = commentRegexError;
    }
  }

  let norwegianDefinitionData = formData.norwegianDefinition.trim();
  let norwegianDefinitionLengthError = inputLengthValidation(norwegianDefinitionData, max, min);
  let norwegianDefinitionRegexError = regexValidation(norwegianDefinitionData, allowedCharactersRegex);
  if (norwegianDefinitionData) {
    if (norwegianDefinitionLengthError !== "") {
      errors.norwegianDefinition = norwegianDefinitionLengthError;
    } else if (norwegianDefinitionRegexError !== "") {
      errors.norwegianDefinition = norwegianDefinitionRegexError;
    }
  }

  // Validate and sanitize editor email field
  let emailRegex =
    /^[a-zA-Z0-9æøåÆØÅ._%+-]+@[a-zA-Z0-9æøåÆØÅ.-]+\.[a-zA-Z]{2,}$/;
  let editorEmailData = formData.editorEmail.trim();
  if (!editorEmailData) {
    errors.editorEmail = "Må inneholde en e-postadresse!";
  } else if (!emailRegex.test(editorEmailData)) {
    errors.editorEmail = "Ugyldig e-postadresse!";
  }

  //Validate Countries, Feelings, Regions and Religions
  let minChar = 2;
  let maxChar = 50;

  errors.countries = "";
  for (let country of formData.countries) {
    let countryName = country.trim();
    let countryLenghtError = inputLengthValidation(countryName, maxChar, minChar);
    let countryRegexError = regexValidation(countryName, regex)
    if (countryLenghtError !== "") {
      errors.countries += `${countryName}: ` + countryLenghtError ;
    } else if (countryRegexError !== "") {
      errors.countries += `${countryName}: ` + countryRegexError;
    }
  }
  if (errors.countries === "") {
    delete errors.countries;
  }

  errors.feelings = "";
  for (let feeling of formData.feelings) {
    let feelingName = feeling.trim();
    let feelingLengthError = inputLengthValidation(feelingName, maxChar, minChar)
    let feelingRegexError = regexValidation(feelingName, /^[a-zA-ZæøåÆØÅ();:., \-\– \n]*$/);
    if (feelingLengthError !== "") {
      errors.feelings += `${feelingName}: ` + feelingLengthError;
    } else if (feelingRegexError !== "") {
      errors.feelings += `${feelingName}: ` + feelingRegexError;
    }
  }
  if (errors.feelings === "") {
    delete errors.feelings;
  }

  errors.regions = "";
  for (let region of formData.regions) {
    let regionName = region.trim();
    let regionLengthError = inputLengthValidation(regionName, maxChar, minChar);
    let regionRegexError = regexValidation(regionName, regex);
    if (regionLengthError !== "") {
      errors.regions += `${regionName}: ` + regionLengthError;
    } else if (regionRegexError !== "") {
      errors.regions += `${regionName}: ` + regionRegexError;
    }
  }
  if (errors.regions === "") {
    delete errors.regions;
  }

  errors.religions = "";
  for (let religion of formData.religions) {
    let religionName = religion.trim();
    let religionLengthError = inputLengthValidation(religionName, maxChar, minChar);
    let religionRegexError = regexValidation(religionName, regex);
    if (religionLengthError !== "") {
      errors.religions += `${religionName}: ` + religionLengthError;
    } else if (religionRegexError !== "") {
      errors.religions += `${religionName}: ` + religionRegexError;
    }
  }
  if (errors.religions === "") {
    delete errors.religions;
  }

  return errors;
};
