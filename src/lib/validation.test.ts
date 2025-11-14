import { required, email, minLength, maxLength, validate, Validator } from './validation';

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
