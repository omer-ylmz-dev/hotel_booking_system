import type { InitialConfig } from '../../../types/booking';
import { cn } from '../../../utils/cn';

interface ConfigurationSummaryProps {
  config: InitialConfig;
}

export default function ConfigurationSummary({ config }: ConfigurationSummaryProps) {
  const fields = [
    { label: 'Citizenship', value: config.citizenship },
    { label: 'Destination', value: config.destinationCountry },
    { label: 'Start Date', value: config.startDate, valueClassName: 'font-mono' },
    {
      label: 'Duration',
      value: `${config.durationDays} day${config.durationDays === 1 ? '' : 's'}`,
    },
    { label: 'Board Type', value: config.boardType, valueClassName: 'text-blue-600' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-card">
      <h2 className="text-xl font-bold mb-4 text-gray-800">1. Configuration Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
        {fields.map(({ label, value, valueClassName }) => (
          <div key={label} className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-500 text-xs">{label}</p>
            <p className={cn('font-semibold', valueClassName)}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
