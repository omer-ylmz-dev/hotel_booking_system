import { countries } from '../../../data/mockData';
import Select from '../../common/Select';

interface CountrySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  invalid?: boolean;
  errorId?: string;
}

export default function CountrySelect({
  label,
  value,
  onChange,
  id,
  placeholder = 'Select Country',
  invalid = false,
  errorId,
}: CountrySelectProps) {
  return (
    <Select
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={countries.map((c) => ({ value: c.name, label: c.name }))}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? errorId : undefined}
    />
  );
}
