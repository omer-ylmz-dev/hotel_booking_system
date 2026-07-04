import type { DailySelection } from '../../../types/booking';
import type { DayPriceBreakdown } from '../../../utils/priceCalculator';
import { hotels, meals } from '../../../data/mockData';

interface DailySelectionsBreakdownProps {
  dailySelections: DailySelection[];
  breakdown: DayPriceBreakdown[];
  destinationCountry: string;
}

export default function DailySelectionsBreakdown({
  dailySelections,
  breakdown,
  destinationCountry
}: DailySelectionsBreakdownProps) {
  const destHotels = hotels[destinationCountry] || [];
  const destMeals = meals[destinationCountry] || { lunch: [], dinner: [] };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print-card">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">2. Daily Selections & Itemized Breakdown</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {dailySelections.map((selection, index) => {
          const itemPrice = breakdown[index];
          const hotelName = destHotels.find(h => h.id === selection.hotelId)?.name || 'Unknown Hotel';
          const lunchName = destMeals.lunch.find(m => m.id === selection.selectedLunchId)?.name;
          const dinnerName = destMeals.dinner.find(m => m.id === selection.selectedDinnerId)?.name;

          return (
            <div
              key={selection.dayNumber}
              className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-white hover:bg-gray-50/50"
            >
              <div>
                <h4 className="font-bold text-gray-800">
                  Day #{selection.dayNumber} —{' '}
                  <span className="font-mono text-xs font-normal text-gray-500">{selection.date}</span>
                </h4>
                <p className="text-sm text-gray-600 mt-1"> {hotelName}</p>
                {(lunchName || dinnerName) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {lunchName ? `Lunch: ${lunchName}` : ''}{' '}
                    {lunchName && dinnerName ? '|' : ''}{' '}
                    {dinnerName ? `Dinner: ${dinnerName}` : ''}
                  </p>
                )}
              </div>
              <div className="text-left sm:text-right">
                <span className="text-sm font-semibold text-gray-900">${itemPrice?.subTotal.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
