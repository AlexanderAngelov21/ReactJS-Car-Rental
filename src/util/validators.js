export const notEmpty = (value) => ({
  valid: value !== "",
  message: "Field cannot be empty",
});

export const equalTo = (value, formState, keyName) => ({
  valid: value === formState[keyName],
  message: `Field value must be equal to ${keyName}`,
});

export const isEmail = (value) => ({
  valid: value.includes("@"),
  message: "Field mut be email",
});

export const oneOf = (value, possibleValues) => ({
  valid: possibleValues.includes(value),
  message: "Invalid field value",
});

export const greaterThan = (value, boundary) => ({
  valid: value > boundary,
  message: `Field value mut be greater than ${boundary}`,
});
