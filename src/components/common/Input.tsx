import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id || props.name || generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-lg border-gray-300 shadow-sm py-2 px-3 text-sm border focus:ring-blue-500 focus:border-blue-500',
          className
        )}
        {...props}
      />
    </div>
  );
}
