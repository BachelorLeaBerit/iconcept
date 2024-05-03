export const ValidateUserForm = (formData) => {
  const errors = {};

  const firstNameMax = 50;
  const firstNameMin = 2;
  const firstNameData = formData.FirstName.trim();
  const firstNameRegex = /^[a-zA-ZæøåÆØÅ]+(?: [a-zA-ZæøåÆØÅ]+){0,2}$/;
  if (!firstNameData) {
    errors.firstName = "Må inneholde et fornavn";
  } else if (!firstNameRegex.test(firstNameData)) {
    errors.firstName = "Fornavn kan bare inneholde bokstaver";
  } else if (firstNameData.length > firstNameMax || firstNameData.length < firstNameMin) {
    errors.firstName = `Må ha mellom ${firstNameMin} og ${firstNameMax} bokstaver`;
  }

  const lastNameMax = 50;
  const lastNameMin = 2;
  const lastNameData = formData.LastName.trim();
  const lastNameRegex = /^[a-zA-ZæøåÆØÅ]+$/;
  if (!lastNameData) {
    errors.lastName = "Må inneholde et etternavn";
  } else if (!lastNameRegex.test(lastNameData)) {
    errors.lastName = "Etternavn kan bare inneholde bokstaver";
  } else if (lastNameData.length > lastNameMax || lastNameData.length < lastNameMin) {
    errors.lastName = `Må ha mellom ${lastNameMin} og ${lastNameMax} bokstaver`;
  }

  const emailRegex = /^[a-zA-Z0-9æøåÆØÅ._%+-]+@[a-zA-Z0-9æøåÆØÅ.-]+\.[a-zA-Z]{2,}$/;
  const emailData = formData.Email.trim();

  if (!emailData) {
    errors.email = "Må inneholde en e-postadresse";
  } else if (!emailRegex.test(emailData)) {
    errors.email = "Ugyldig e-postadresse";
  }

  const passwordData = formData.Password;
  if (!passwordData) {
    errors.Password = "Må inneholde et passord";
  } else {
    if (passwordData.length < 6) {
      errors.password = "Passordet må være minst 6 tegn langt";
    }
    if (!/\d/.test(passwordData)) {
      errors.password = "Passordet må inneholde minst ett tall";
    }
    if (!/[a-z]/.test(passwordData)) {
      errors.password = "Passordet må inneholde minst én liten bokstav";
    }
    if (!/[A-Z]/.test(passwordData)) {
      errors.password = "Passordet må inneholde minst én stor bokstav";
    }
    if (!/\W|_/.test(passwordData)) {
      errors.password = "Passordet må inneholde minst ett spesialtegn";
    }
  }


  return errors;
};