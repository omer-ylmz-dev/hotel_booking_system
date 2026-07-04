import { Printer } from 'lucide-react';
import Button from '../../common/Button';

interface ActionPanelProps {
  onBack: () => void;
  onBackToConfiguration: () => void;
  onReset: () => void;
  onPrint: () => void;
}

export default function ActionPanel({
  onBack,
  onBackToConfiguration,
  onReset,
  onPrint,
}: ActionPanelProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 no-print">
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button variant="secondary" className="w-full sm:w-auto" onClick={onBack}>
          Back
        </Button>
        <Button variant="secondary" className="w-full sm:w-auto" onClick={onBackToConfiguration}>
          Back to Configuration
        </Button>
        <Button variant="danger" className="w-full sm:w-auto" onClick={onReset}>
          Clear & Reset
        </Button>
      </div>

      <Button variant="success" className="w-full sm:w-auto" onClick={onPrint}>
        <Printer size={18} aria-hidden="true" />
        <span>Export PDF / Print</span>
      </Button>
    </div>
  );
}
