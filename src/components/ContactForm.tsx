
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { required, email, minLength, maxLength, isPhoneNumber, validate, Validator } from '@/lib/validation';

interface FormData {
  name: string;
  email: string;
  message: string;
  phoneNumber?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  phoneNumber?: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const successMessageRef = useRef<HTMLParagraphElement>(null);
  const errorMessageRef = useRef<HTMLParagraphElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (successMessage && successMessageRef.current) {
      successMessageRef.current.focus();
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage && errorMessageRef.current) {
      errorMessageRef.current.focus();
    }
  }, [errorMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error when user starts typing again
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const nameValidators = [
      required,
      minLength(2, 'Name must be at least 2 characters'),
      maxLength(50, 'Name must not exceed 50 characters'),
    ];
    newErrors.name = validate(formData.name, nameValidators);

    const emailValidators = [
      required,
      email,
      maxLength(100, 'Email must not exceed 100 characters'),
    ];
    newErrors.email = validate(formData.email, emailValidators);

    const messageValidators = [
      required,
      minLength(10, 'Message must be at least 10 characters'),
      maxLength(500, 'Message must not exceed 500 characters'),
    ];
    newErrors.message = validate(formData.message, messageValidators);

    const phoneNumberValidators = [
      isPhoneNumber,
      maxLength(20, 'Phone number must not exceed 20 characters'),
    ];
    newErrors.phoneNumber = validate(formData.phoneNumber || '', phoneNumberValidators);

    setErrors(newErrors); // Update the state with new errors

    if (Object.values(newErrors).some(Boolean)) {
      setLoading(false);
      setErrorMessage('Please correct the errors in the form.');
      setSuccessMessage(null);
      return;
    }

    setLoading(true);
    // Simulate API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) { // 20% chance of failure
            reject(new Error('Simulated network error'));
          } else {
            resolve(null);
          }
        }, 1500);
      });
      setSuccessMessage('Your message has been sent successfully!');
      setErrorMessage(null);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('There was an error sending your message. Please try again.');
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      phoneNumber: '',
    });
    setErrors({});
    setSuccessMessage(null);
    setErrorMessage(null);
    nameInputRef.current?.focus();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle id="contact-form-title">Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="contact-form-title">
          <fieldset className="space-y-4">
            <legend className="sr-only">Contact Information</legend>
            <FormInput
              id="name"
              name="name"
              label="Name"
              hint="Your full name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={loading}
              showCharCount={true}
              maxLength={50}
              ref={nameInputRef} // Attach the ref here
            />
            <FormInput
              id="email"
              name="email"
              label="Email"
              hint="Your email address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
              showCharCount={true}
              maxLength={100}
            />
            <FormInput
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number (Optional)"
              hint="Your phone number"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              disabled={loading}
              showCharCount={true}
              maxLength={20}
            />
            <FormTextarea
              id="message"
              name="message"
              label="Message"
              hint="Your message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              disabled={loading}
              showCharCount={true}
              maxLength={500}
            />
            {successMessage && <p id="success-message" ref={successMessageRef} role="status" aria-live="polite" className="text-green-600 text-sm" tabIndex={-1}>{successMessage}</p>}
            {errorMessage && <p id="error-message" ref={errorMessageRef} role="alert" aria-live="assertive" className="text-red-600 text-sm" tabIndex={-1}>{errorMessage}</p>}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {loading ? 'Sending message...' : ''}
            </div>
            <div className="flex space-x-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
              <Button type="button" className="flex-1" onClick={resetForm} variant="outline" disabled={loading}>
                Reset
              </Button>
            </div>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
};
