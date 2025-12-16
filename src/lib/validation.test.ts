import { required, email, minLength, maxLength, validate, Validator, isValidUrl, validatePasswordStrength } from './validation';

describe('Validation Utilities', () => {
  // Test for 'required' validator
  describe('required', () => {
    it('should return undefined for a non-empty string', () => {
      expect(required('hello')).toBeUndefined();
    });

    it('should return "This field is required." for an empty string', () => {
      expect(required('')).toBe('This field is required.');
    });

    it('should return "This field is required." for a whitespace-only string', () => {
      expect(required('   ')).toBe('This field is required.');
    });
  });

  // Test for 'email' validator
  describe('email', () => {
    it('should return undefined for a valid email address', () => {
      expect(email('test@example.com')).toBeUndefined();
    });

    it('should return undefined for an email with a subdomain', () => {
      expect(email('test@sub.example.com')).toBeUndefined();
    });

    it('should return undefined for an email with numbers and special characters in the local part', () => {
      expect(email('test.name+tag123@example.com')).toBeUndefined();
    });

    it('should return "Please enter a valid email address." for an invalid email (missing @)', () => {
      expect(email('testexample.com')).toBe('Please enter a valid email address.');
    });

    it('should return "Please enter a valid email address." for an invalid email (missing domain)', () => {
      expect(email('test@.com')).toBe('Please enter a valid email address.');
    });

    it('should return "Please enter a valid email address." for an invalid email (missing top-level domain)', () => {
      expect(email('test@example')).toBe('Please enter a valid email address.');
    });

    it('should return "Please enter a valid email address." for an empty string', () => {
      expect(email('')).toBe('Please enter a valid email address.');
    });

    it('should return "Please enter a valid email address." for a whitespace-only string', () => {
      expect(email('   ')).toBe('Please enter a valid email address.');
    });
  });

  // Test for 'minLength' validator
  describe('minLength', () => {
    const minLen5 = minLength(5);

    it('should return undefined for a string meeting the minimum length', () => {
      expect(minLen5('hello')).toBeUndefined();
    });

    it('should return undefined for a string exceeding the minimum length', () => {
      expect(minLen5('hello world')).toBeUndefined();
    });

    it('should return correct error message for a string shorter than the minimum length', () => {
      expect(minLen5('hi')).toBe('This field must be at least 5 characters long.');
    });

    it('should return correct error message for an empty string when minLength is greater than 0', () => {
      expect(minLen5('')).toBe('This field must be at least 5 characters long.');
    });
  });

  // Test for 'maxLength' validator
  describe('maxLength', () => {
    const maxLen10 = maxLength(10);

    it('should return undefined for a string meeting the maximum length', () => {
      expect(maxLen10('hello')).toBeUndefined();
    });

    it('should return undefined for a string shorter than the maximum length', () => {
      expect(maxLen10('hi')).toBeUndefined();
    });

    it('should return correct error message for a string exceeding the maximum length', () => {
      expect(maxLen10('hello world long string')).toBe('This field must be no more than 10 characters long.');
    });

    it('should return undefined for an empty string', () => {
      expect(maxLen10('')).toBeUndefined();
    });
  });

  // Test for 'isValidUrl' validator
  describe('isValidUrl', () => {
    it('should return undefined for a valid http URL', () => {
      expect(isValidUrl('http://example.com')).toBeUndefined();
    });

    it('should return undefined for a valid https URL', () => {
      expect(isValidUrl('https://example.com')).toBeUndefined();
    });

    it('should return undefined for a valid URL with www prefix', () => {
      expect(isValidUrl('https://www.example.com')).toBeUndefined();
    });

    it('should return undefined for a valid URL with a path', () => {
      expect(isValidUrl('https://example.com/path/to/page')).toBeUndefined();
    });

    it('should return undefined for a valid URL with query parameters', () => {
      expect(isValidUrl('https://example.com/search?q=test&page=1')).toBeUndefined();
    });

    it('should return undefined for a valid URL with a fragment', () => {
      expect(isValidUrl('https://example.com/page#section')).toBeUndefined();
    });

    it('should return undefined for a valid URL with subdomain', () => {
      expect(isValidUrl('https://sub.example.com')).toBeUndefined();
    });

    it('should return undefined for a valid URL with multiple subdomains', () => {
      expect(isValidUrl('https://sub.sub.example.com')).toBeUndefined();
    });

    it('should return "Please enter a valid URL." for a URL with a numeric TLD', () => {
      expect(isValidUrl('https://example.123')).toBe('Please enter a valid URL.');
    });

    it('should return "Please enter a valid URL." for a URL with a TLD longer than 6 characters', () => {
      expect(isValidUrl('https://example.network')).toBe('Please enter a valid URL.');
    });

    it('should return "URL cannot be empty." for an empty string', () => {
      expect(isValidUrl('')).toBe('URL cannot be empty.');
    });

    it('should return "URL cannot be empty." for a whitespace-only string', () => {
      expect(isValidUrl('   ')).toBe('URL cannot be empty.');
    });

    it('should return "Please enter a valid URL." for a URL missing protocol', () => {
      expect(isValidUrl('example.com')).toBe('Please enter a valid URL.');
    });

    it('should return "Please enter a valid URL." for an invalid top-level domain', () => {
      expect(isValidUrl('https://example.c')).toBe('Please enter a valid URL.');
    });

    it('should return "Please enter a valid URL." for a URL with invalid characters', () => {
      expect(isValidUrl('https://ex ample.com')).toBe('Please enter a valid URL.');
    });

    it('should return "Please enter a valid URL." for a URL with only protocol', () => {
      expect(isValidUrl('https://')).toBe('Please enter a valid URL.');
    });

    it('should return "Please enter a valid URL." for a URL with an invalid domain format', () => {
      expect(isValidUrl('https://.com')).toBe('Please enter a valid URL.');
    });
  });

  // Test for 'validatePasswordStrength' validator
  describe('validatePasswordStrength', () => {
    it('should return "weak" for a password that is too short', () => {
      expect(validatePasswordStrength('short')).toBe('weak');
    });

    it('should return "weak" for a password with only lowercase letters and too short', () => {
      expect(validatePasswordStrength('abcdefg')).toBe('weak');
    });

    it('should return "weak" for a password with only lowercase letters and numbers', () => {
      expect(validatePasswordStrength('abcdefg1')).toBe('weak');
    });

    it('should return "medium" for a password with length, lowercase, uppercase, and numbers', () => {
      expect(validatePasswordStrength('Password123')).toBe('medium');
    });

    it('should return "strong" for a password with length, lowercase, uppercase, numbers, and special characters', () => {
      expect(validatePasswordStrength('Password123!')).toBe('strong');
    });

    it('should return "medium" for a password with length, lowercase, uppercase', () => {
      expect(validatePasswordStrength('Abcdefgh')).toBe('medium');
    });

    it('should return "medium" for a password with length, lowercase, numbers, special character', () => {
      expect(validatePasswordStrength('abcdefg1!')).toBe('medium');
    });

    it('should return "weak" for an empty string', () => {
      expect(validatePasswordStrength('')).toBe('weak');
    });

    it('should return "weak" for a password with only spaces', () => {
      expect(validatePasswordStrength('        ')).toBe('weak');
    });
  });

  // Test for 'validate' utility
  describe('validate', () => {
    it('should return undefined if no validators are provided', () => {
      expect(validate('any value', [])).toBeUndefined();
    });

    it('should return undefined if all validators pass', () => {
      const validators: Validator[] = [required, minLength(3), maxLength(10)];
      expect(validate('hello', validators)).toBeUndefined();
    });

    it('should return the error from the first failing validator', () => {
      const validators: Validator[] = [required, minLength(10), email];
      expect(validate('short', validators)).toBe('This field must be at least 10 characters long.');
    });

    it('should return the error from the required validator if value is empty', () => {
      const validators: Validator[] = [required, minLength(3)];
      expect(validate('', validators)).toBe('This field is required.');
    });

    it('should return the error from the email validator if email is invalid', () => {
      const validators: Validator[] = [required, email];
      expect(validate('invalid-email', validators)).toBe('Please enter a valid email address.');
    });

    it('should handle validator composition correctly', () => {
      const passwordValidator = (value: string) => {
        if (!/[A-Z]/.test(value)) return 'Must contain an uppercase letter.';
        if (!/[0-9]/.test(value)) return 'Must contain a number.';
        return undefined;
      };
      const validators: Validator[] = [required, minLength(8), passwordValidator];

      expect(validate('shortP1', validators)).toBe('This field must be at least 8 characters long.');
      expect(validate('password', validators)).toBe('Must contain an uppercase letter.');
      expect(validate('Password', validators)).toBe('Must contain a number.');
      expect(validate('Password123', validators)).toBeUndefined();
    });
  });
});
