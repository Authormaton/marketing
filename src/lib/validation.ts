
export type Validator = (value: string) => string | undefined;

export const required: Validator = (value: string) => {
  if (!value || value.trim() === '') {
    return 'This field is required.';
  }
  return undefined;
};

export const email: Validator = (value: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address.';
  }
  return undefined;
};

export const minLength = (min: number): Validator => (value: string) => {
  if (value.length < min) {
    return `This field must be at least ${min} characters long.`;
  }
  return undefined;
};

export const maxLength = (max: number): Validator => (value: string) => {
  if (value.length > max) {
    return `This field must be no more than ${max} characters long.`;
  }
  return undefined;
};

export const validate = (value: string, validators: Validator[]): string | undefined => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return undefined;
};
