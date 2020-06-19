import { checkFieldValidity } from "./FormHelper";

// Text field validity
test("check validity of correct required field", () => {
  expect(checkFieldValidity("Hello world!", { required: true })).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

test("check validity of empty required field", () => {
  expect(checkFieldValidity("", { required: true })).toStrictEqual({
    isValid: false,
    errorMessage: "requiredField",
  });
});

test("check validity of unrequired field", () => {
  expect(checkFieldValidity("", {})).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

// Email validity
test("check validity of correct required email", () => {
  expect(
    checkFieldValidity("verkholantsevad@gmail.com", {
      required: true,
      isEmail: true,
    })
  ).toStrictEqual({
    isValid: true,
    errorMessage: null,
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
    errorMessage: null,
  });
});

// Date validity
test("check validity of correct required date field", () => {
  expect(
    checkFieldValidity("2020-06-11T06:37:00.000Z", {
      required: true,
    })
  ).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

test("check validity of empty required date field", () => {
  expect(
    checkFieldValidity(null, {
      required: true,
    })
  ).toStrictEqual({
    isValid: false,
    errorMessage: "requiredField",
  });
});

test("check validity of correct unrequired date field", () => {
  expect(
    checkFieldValidity(null, {})
  ).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

// Date validity
test("check validity of correct required date field", () => {
  expect(
    checkFieldValidity("2020-06-11T06:37:00.000Z", {
      required: true,
    })
  ).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

test("check validity of empty required date field", () => {
  expect(
    checkFieldValidity(null, {
      required: true,
    })
  ).toStrictEqual({
    isValid: false,
    errorMessage: "requiredField",
  });
});

test("check validity of correct unrequired date field", () => {
  expect(
    checkFieldValidity(null, {})
  ).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

// Number validity
test("check validity of correct required number field", () => {
  expect(
    checkFieldValidity(123, {
      required: true,
    })
  ).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

test("check validity of empty required number field", () => {
  expect(
    checkFieldValidity(0, {
      required: true,
    })
  ).toStrictEqual({
    isValid: false,
    errorMessage: "requiredField",
  });
});

test("check validity of correct unrequired number field", () => {
  expect(
    checkFieldValidity(0, {})
  ).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

// Password validity
test("check validity of correct required password field", () => {
  expect(
    checkFieldValidity("password", {
      required: true,
      isPassord: true,
    })
  ).toStrictEqual({
    isValid: true,
    errorMessage: null,
  });
});

test("check validity of incorrect required password field", () => {
  expect(
    checkFieldValidity("123", {
      required: true,
      isPassord: true,
    })
  ).toStrictEqual({
    isValid: false,
    errorMessage: "unvalidPassword",
  });
});