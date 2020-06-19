const isEmpty = (value) => {
  return value.trim() === "";
};

export const checkFieldValidity = (value, rules) => {
  let validation = {
    isValid: true,
    errorMessage: null,
  };

  if (!rules) {
    return true;
  }

  if (rules.required) {
    validation.isValid = !isEmpty(value) && validation.isValid;
    validation.errorMessage = !validation.isValid ? "requiredField" : "";
    if (validation.errorMessage === "requiredField") return validation;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (isEmpty(value) && validation.isValid) validation.isValid = true;
    else validation.isValid = pattern.test(value) && validation.isValid;
    validation.errorMessage = !validation.isValid ? "unvalidEmail" : "";
  }

  if (rules.isDate) {
    validation.isValid = value !== null && validation.isValid;
    validation.errorMessage = !validation.isValid ? "requiredField" : "";
  }

  if (rules.isNumber) {
    validation.isValid = value !== 0 && validation.isValid;
    validation.errorMessage = !validation.isValid ? "requiredField" : "";
  }

  if (rules.isPassord) {
    validation.isValid = value.length >= 6 && validation.isValid;
    if (value.length < 6 && value.length > 0)
      validation.errorMessage = "unvalidPassword";
    else if (value.length === 0) validation.errorMessage = "requiredField";
    else validation.errorMessage = "";
  }

  return validation;
};
