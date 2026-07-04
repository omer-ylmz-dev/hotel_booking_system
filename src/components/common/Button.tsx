import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-sm',
  secondary: 'text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100',
  danger: 'text-red-600 px-4 py-2 rounded-lg hover:bg-red-50',
  success: 'bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 shadow-sm'
};

export default function Button({
  variant = 'primary',
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'cursor-pointer text-sm font-medium transition-all inline-flex items-center justify-center gap-2',
        variantStyles[variant],
        disabled && 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200 shadow-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
