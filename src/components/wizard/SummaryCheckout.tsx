import { useBooking } from '../../hooks/useBooking';
import { calculateTotalPrice } from '../../utils/priceCalculator';
import PrintStyles from './summary-checkout/PrintStyles';
import ConfigurationSummary from './summary-checkout/ConfigurationSummary';
import DailySelectionsBreakdown from './summary-checkout/DailySelectionsBreakdown';
import TotalPriceCalculation from './summary-checkout/TotalPriceCalculation';
import ActionPanel from './summary-checkout/ActionPanel';

export default function SummaryCheckout() {
  const { state, dispatch, goToPrevStep } = useBooking();
  const { breakdown, grandTotal } = calculateTotalPrice(state);

  if (!state.config) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-0">
      <PrintStyles />

      <ConfigurationSummary config={state.config} />

      <DailySelectionsBreakdown
        dailySelections={state.dailySelections}
        breakdown={breakdown}
        destinationCountry={state.config.destinationCountry}
      />

      <TotalPriceCalculation grandTotal={grandTotal} />

      <ActionPanel
        onBack={goToPrevStep}
        onBackToConfiguration={() => dispatch({ type: 'SET_STEP', payload: 1 })}
        onReset={() => dispatch({ type: 'RESET' })}
        onPrint={handlePrint}
      />
    </div>
  );
}
