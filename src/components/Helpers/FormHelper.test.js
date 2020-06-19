import { checkFieldValidity } from "./FormHelper";

test("check validity of correct required email", () => {
  expect(
    checkFieldValidity("verkholantsevad@gmail.com", {
      required: true,
      isEmail: true,
    })
  ).toStrictEqual({
    isValid: true,
    errorMessage: "",
  });
});

test("check validity of incorrect required email", () => {
  expect(
    checkFieldValidity("verkholantsevadgmail.com", {
      required: true,
      isEmail: true,
    })
  ).toStrictEqual({
    isValid: false,
    errorMessage: "unvalidEmail",
  });
});

test("check validity of empty required email field", () => {
  expect(
    checkFieldValidity("", { required: true, isEmail: true })
  ).toStrictEqual({
    isValid: false,
    errorMessage: "requiredField",
  });
});

test("check validity of empty unrequired email field", () => {
  expect(checkFieldValidity("", { isEmail: true })).toStrictEqual({
    isValid: true,
    errorMessage: "",
  });
});
