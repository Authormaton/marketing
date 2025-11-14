
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { required, email, minLength, maxLength, validate } from '@/lib/validation';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      setLoading(false);
      setErrorMessage('Please correct the errors in the form.');
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
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('There was an error sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <p id="name-hint" className="sr-only">Your full name</p>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "name-error name-hint" : "name-hint"}
            />
            {errors.name && <p id="name-error" role="alert" className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <p id="email-hint" className="sr-only">Your email address</p>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "email-error email-hint" : "email-hint"}
            />
            {errors.email && <p id="email-error" role="alert" className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <p id="message-hint" className="sr-only">Your message</p>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "message-error message-hint" : "message-hint"}
            ></textarea>
            {errors.message && <p id="message-error" role="alert" className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>
          {successMessage && <p id="success-message" role="status" aria-live="polite" className="text-green-600 text-sm">{successMessage}</p>}
          {errorMessage && <p id="error-message" role="alert" aria-live="assertive" className="text-red-600 text-sm">{errorMessage}</p>}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {loading ? 'Sending message...' : ''}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </fieldset>
        </form>
      </CardContent>
    </Card>
  );
};
