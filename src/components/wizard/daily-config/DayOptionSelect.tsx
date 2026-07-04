import Select from '../../common/Select';

interface OptionItem {
  id: number;
  name: string;
  price: number;
}

interface DayOptionSelectProps {
  label: string;
  placeholder: string;
  value: number | null;
  options: OptionItem[];
  priceSuffix?: string;
  disabled?: boolean;
  isMobile?: boolean;
  onChange: (id: number | null) => void;
}

export default function DayOptionSelect({
  label,
  placeholder,
  value,
  options,
  priceSuffix = '',
  disabled = false,
  isMobile = false,
  onChange
}: DayOptionSelectProps) {
  return (
    <Select
      label={label}
      value={value?.toString() ?? ''}
      placeholder={disabled ? 'Not Available' : placeholder}
      disabled={disabled}
      clearable={!disabled}
      wrapperClassName={isMobile ? 'space-y-1' : undefined}
      labelClassName={isMobile ? 'text-xs font-semibold text-gray-500 mb-2' : 'sr-only mb-2'}
      className="p-2 shadow-none"
      options={options.map((option) => ({
        value: String(option.id),
        label: `${option.name} ($${option.price}${priceSuffix})`,
      }))}
      onChange={(v) => onChange(v ? parseInt(v, 10) : null)}
    />
  );
}
