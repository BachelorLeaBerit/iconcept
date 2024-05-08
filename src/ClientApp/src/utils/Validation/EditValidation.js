import { regexValidation } from "../../utils/Helpers/regexValidation";
import { inputLengthValidation } from "../Helpers/inputLengthValidation";

export const ValidateEditForm = (formData) => {
  const errors = {};
  const allowedCharactersRegex = /^[a-zA-Z0-9æøåÆØÅ:;.,!?()\- \n]*$/;

  let translationData = formData.editedTranslation.trim();
  let lengthErrorMsg = inputLengthValidation(translationData, 500, 10);
  let regexErrorMsg = regexValidation(translationData, allowedCharactersRegex);
  if (!translationData) {
    errors.editedTranslation = "Må inneholde en konseptoversettelse!";
  } else if (regexErrorMsg !== "") {
    errors.editedTranslation = regexErrorMsg;
  } else if (lengthErrorMsg !== "") {
    errors.editedTranslation = lengthErrorMsg;
  }

  return errors;
};
