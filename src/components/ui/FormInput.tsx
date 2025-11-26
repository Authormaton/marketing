import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
  error?: string;
  hint?: string;
  showCharCount?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, name, label, error, hint, className, type = 'text', 'aria-describedby': ariaDescribedByProp, 'aria-invalid': ariaInvalidProp, showCharCount, onChange, value, ...props }, ref) => {
    const hasError = !!error;
    const maxLength = props.maxLength ? Number(props.maxLength) : undefined;
    const [currentLength, setCurrentLength] = useState(String(value || '').length);

    useEffect(() => {
      setCurrentLength(String(value || '').length);
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentLength(event.target.value.length);
      onChange?.(event);
    };

    const getCharCountColorClass = () => {
      if (!maxLength) return '';
      const percentage = (currentLength / maxLength) * 100;
      if (percentage > 90) return 'text-red-500';
      if (percentage > 70) return 'text-yellow-500';
      return 'text-green-500';
    };

    const ariaDescribedBy = cn(
      hint ? `${id}-hint` : '',
      hasError ? `${id}-error` : '',
      ariaDescribedByProp
    ).trim();

    return (
      <div className="space-y-1">
        {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
        {hint && <p id={`${id}-hint`} className="text-sm text-gray-500">{hint}</p>}
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          className={cn(
            'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
            hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
            className
          )}
          aria-invalid={hasError || ariaInvalidProp ? "true" : undefined}
          aria-describedby={ariaDescribedBy || undefined}
          onChange={handleInputChange}
          {...(value !== undefined && { value })}
          {...props}
        />
      {showCharCount && maxLength && (
        <p className={cn("text-xs text-right", getCharCountColorClass())}>
          {currentLength}/{maxLength} characters
        </p>
      )}
      {hasError && <p id={`${id}-error`} role="alert" className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

FormInput.displayName = 'FormInput';
