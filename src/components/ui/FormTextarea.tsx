import React from 'react';
import { cn } from '@/lib/utils';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  label?: string;
  error?: string;
  hint?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ id, name, label, error, hint, className, rows = 4, 'aria-describedby': ariaDescribedByProp, 'aria-invalid': ariaInvalidProp, ...props }, ref) => {
    const hasError = !!error;
    const ariaDescribedBy = cn(
      hint ? `${id}-hint` : '',
      hasError ? `${id}-error` : '',
      ariaDescribedByProp
    ).trim();

    return (
      <div className="space-y-1">
        {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
        {hint && <p id={`${id}-hint`} className="text-sm text-gray-500">{hint}</p>}
        <textarea
          ref={ref}
          id={id}
          name={name}
          rows={rows}
          className={cn(
            'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
            hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
            className
          )}
          aria-invalid={hasError || ariaInvalidProp ? "true" : undefined}
          aria-describedby={ariaDescribedBy || undefined}
          {...props}
        />
        {hasError && <p id={`${id}-error`} role="alert" className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
