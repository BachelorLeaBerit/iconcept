export const ValidateForm = (formData) => {
  const errors = {};

  //Begrep validering
  let termMax = 50;
  let termMin = 2;
  let termNameData = formData.termName.trim()
  if (!termNameData) {
    errors.termName = "Må inneholde et begrep!";
  } else if (termNameData.length > termMax || termNameData.length < termMin) {
    errors.termName = `Må ha mellom ${termMin} og ${termMax} tegn!`;
  } 

  //Konseptoversettelse validering
  let translationMax = 500;
  let translationMin = 10;
  let translationData = formData.translation.trim();
  if (!translationData) {
    errors.translation = "Må inneholde en konseptoversettelse!";
  } else if (translationData.length > translationMax || translationData.length < translationMin) {
    errors.translation = `Må ha mellom ${translationMin} og ${translationMax} tegn!`;
  }

  //Kommentar, kontekst og norsk def. validering
  let max = 300;
  let min = 10;
  let error = `Må ha mellom ${min} og ${max} tegn!`;

  let contextData = formData.context.trim();
  if (contextData) {
    if (contextData.length > max || contextData.length < min) {
      errors.context = error;
    }
  }

  let commentData = formData.comment.trim();
  if (commentData) {
    if (commentData.length > max || commentData.length < min) {
      errors.comment = error;
    } 
  }

  let norwegianDefinitionData = formData.norwegianDefinition.trim();
  if (norwegianDefinitionData) {
    if (norwegianDefinitionData.length > max || norwegianDefinitionData.length < min) {
      errors.norwegianDefinition = error;
    }
  }

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let editorEmailData = formData.editorEmail.trim();
  if (!editorEmailData) {
    errors.editorEmail = "Må inneholde en e-postadresse!";
  }
  else if (!emailRegex.test(editorEmailData)) {
    errors.editorEmail = "Ugyldig e-postadresse!";
  }

  return errors;
};
