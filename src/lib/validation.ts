export type Validator = (value: string) => string | undefined;

export const required: Validator = (value: string) => {
  if (!value || value.trim() === '') {
    return 'This field is required.';
  }
  return undefined;
};

const disposableDomains = [
  'mailinator.com',
  'yopmail.com',
  'temp-mail.org',
  '10minutemail.com',
  'guerrillamail.com',
];

export const disposableEmail = (value: string): string | undefined => {
  const domain = value.split('@')[1];
  if (domain && disposableDomains.includes(domain.toLowerCase())) {
    return 'Disposable email addresses are not allowed.';
  }
  return undefined;
};

export const email = (options?: { allowDisposable?: boolean }): Validator => (value: string) => {
  if (!value || value.trim() === '') {
    return 'Email address cannot be empty.';
  }

  if (!value.includes('@')) {
    return 'Email address must contain an @ symbol.';
  }

  const parts = value.split('@');
  if (parts.length !== 2) {
    return 'Email address must contain exactly one @ symbol.';
  }

  const [localPart, domainPart] = parts;

  if (!localPart) {
    return 'Local part of the email address cannot be empty.';
  }

  // Basic domain format check: must have at least one dot and not start/end with a dot
  if (!domainPart || !/^[^\\s.]+\\.[^\\s.]+$/.test(domainPart)) {
    return 'Invalid email domain format.';
  }

  if (!options?.allowDisposable) {
    const disposableError = disposableEmail(value);
    if (disposableError) {
      return disposableError;
    }
  }

  return undefined;
};

export const minLength = (min: number, message?: string): Validator => (value: string) => {
  if (value.length < min) {
    return message || `This field must be at least ${min} characters long.`;
  }
  return undefined;
};

export const maxLength = (max: number, message?: string): Validator => (value: string) => {
  if (value.length > max) {
    return message || `This field must be no more than ${max} characters long.`;
  }
  return undefined;
};

export const isPhoneNumber = (value: string): string | undefined => {
  if (!value || value.trim() === '') {
    return undefined; // Phone number is optional
  }
  // A simple regex for phone numbers. This can be refined based on specific requirements.
  // This regex allows for optional '+' at the beginning, then digits, spaces, hyphens, and parentheses.
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  if (!phoneRegex.test(value)) {
    return 'Please enter a valid phone number.';
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