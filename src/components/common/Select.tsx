import { useId } from 'react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  labelClassName?: string;
  className?: string;
  wrapperClassName?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

export default function Select({
  label,
  value,
  options,
  onChange,
  id,
  placeholder,
  disabled = false,
  clearable = false,
  labelClassName,
  className,
  wrapperClassName,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className={wrapperClassName}>
      <label
        htmlFor={selectId}
        className={cn('block text-xs font-medium text-gray-700 mb-2', labelClassName)}
      >
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={ariaInvalid || undefined}
        aria-describedby={ariaDescribedBy}
        className={cn(
          'cursor-pointer w-full rounded-lg border-gray-300 shadow-sm py-2 px-3 text-xs lg:text-sm border',
          'focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-100 disabled:text-gray-400',
          className
        )}
      >
        {placeholder !== undefined && (
          <option value="" disabled={disabled || !clearable}>
            {clearable && value ? 'Clear selection' : placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
