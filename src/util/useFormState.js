import { useState } from "react";

export function useFormState(initialState, validators = {}) {
  const [formState, setFormstate] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState([]);
  const clearError = (fieldName) => {
    const updatedErrors = { ...errors };
    delete updatedErrors[fieldName];
    setErrors(updatedErrors);
  };
  function applyValidators(fieldName, value) {
    const fieldValidators = validators[fieldName];
    if (fieldValidators) {
      for (let i = 0; i < fieldValidators.length; i++) {
        const currentValidator = fieldValidators[i];
        const validationResult = currentValidator(value, formState);
        if (!validationResult.valid) {
          setErrors({
            ...errors,
            [fieldName]: validationResult.message,
          });
          break;
        } else {
          clearError(fieldName);
        }
      }
    }
  }
  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    applyValidators(fieldName, fieldValue);
    setFormstate({
      ...formState,
      [fieldName]: fieldValue,
    });
    if (!touched.includes(fieldName)) {
      setTouched((prevTouched) => [...prevTouched, fieldName]);
    }
  };
  return [formState, handleInputChange, errors, touched];
}
