import { useBooking } from '../../hooks/useBooking';
import { useMatchMedia } from '../../hooks/useMatchMedia';
import { hotels, meals } from '../../data/mockData';
import { isDailyConfigComplete } from '../../utils/bookingRules';
import Button from '../common/Button';
import DailyConfigRow from './daily-config/DailyConfigRow';

export default function DailyConfigTable() {
  const { state, goToNextStep, goToPrevStep } = useBooking();
  const isMobile = useMatchMedia('(max-width: 767px)');

  if (!state.config) return null;

  const destination = state.config.destinationCountry;
  const availableHotels = hotels[destination] || [];
  const availableMeals = meals[destination] || { lunch: [], dinner: [] };
  const boardType = state.config.boardType;

  const isFormComplete = isDailyConfigComplete(boardType, state.dailySelections);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className='flex flex-col gap-3'>
            <h2 className="text-xl font-bold text-gray-800">Step 2: Daily Configuration</h2>
            <p className="text-sm text-gray-500">Configure your hotel and meals for each day. Rule status: <span className="font-semibold text-blue-600">{state.config.boardType}</span></p>
          </div>
        </div>

        {isMobile ? (
          <div className="p-4 space-y-4 bg-gray-50/50">
            {state.dailySelections.map((day) => (
              <DailyConfigRow
                key={day.dayNumber}
                day={day}
                availableHotels={availableHotels}
                availableMeals={availableMeals}
                boardType={boardType}
                isMobile
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 w-28">Day</th>
                  <th className="p-4 w-44">Date</th>
                  <th className="p-4">Select Hotel</th>
                  <th className="p-4">Lunch Selection</th>
                  <th className="p-4">Dinner Selection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {state.dailySelections.map((day) => (
                  <DailyConfigRow
                    key={day.dayNumber}
                    day={day}
                    availableHotels={availableHotels}
                    availableMeals={availableMeals}
                    boardType={boardType}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Button variant="secondary" onClick={goToPrevStep}>
          Back
        </Button>
        <Button
          onClick={goToNextStep}
          disabled={!isFormComplete}
        >
          Calculate Summary
        </Button>
      </div>
    </div>
  );
}
