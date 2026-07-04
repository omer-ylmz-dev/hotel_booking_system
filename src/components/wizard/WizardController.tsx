import { LoaderCircle } from 'lucide-react';
import { useBooking } from '../../hooks/useBooking';
import { useStepTransition } from '../../hooks/useStepTransition';
import InitialConfigForm from './InitialConfigForm';
import DailyConfigTable from './DailyConfigTable';
import SummaryCheckout from './SummaryCheckout';

export default function WizardController() {
  const { state } = useBooking();
  const { displayedStep, isLoading } = useStepTransition(state.activeStep);

  const steps = [
    { step: 1, label: 'Initial Setup' },
    { step: 2, label: 'Daily Options' },
    { step: 3, label: 'Summary' },
  ];

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        {steps.map(({ step, label }) => (
          <div key={label} className="flex items-center space-x-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
              state.activeStep === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}>
              {step}
            </span>
            <span className={`hidden sm:inline transition-colors duration-300 ${state.activeStep === step ? 'font-bold' : ''}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div key={displayedStep} className="animate-fadeIn">
          {displayedStep === 1 && <InitialConfigForm />}
          {displayedStep === 2 && <DailyConfigTable />}
          {displayedStep === 3 && <SummaryCheckout />}
        </div>
      )}
    </main>
  );
}
