import type { DailySelection, Hotel, CountryMeals, BoardTypeCode } from '../../../types/booking';
import { useBooking } from '../../../hooks/useBooking';
import { getMealAvailability } from '../../../utils/bookingRules';
import DayOptionSelect from './DayOptionSelect';

interface RowProps {
  day: DailySelection;
  availableHotels: Hotel[];
  availableMeals: CountryMeals;
  boardType: BoardTypeCode;
  isMobile?: boolean;
}

export default function DailyConfigRow({
  day,
  availableHotels,
  availableMeals,
  boardType,
  isMobile = false
}: RowProps) {
  const { dispatch } = useBooking();

  const handleFieldChange = (fields: Partial<DailySelection>) => {
    dispatch({
      type: 'UPDATE_DAILY_SELECTION',
      payload: { ...day, ...fields }
    });
  };

  const { isLunchDisabled, isDinnerDisabled } = getMealAvailability(boardType, day);

  if (isMobile) {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-bold text-gray-700">Day #{day.dayNumber}</span>
          <span className="text-xs text-gray-500 font-mono">{day.date}</span>
        </div>
        <DayOptionSelect
          label="Hotel"
          placeholder="Choose Hotel "
          value={day.hotelId}
          options={availableHotels}
          priceSuffix="/day"
          isMobile
          onChange={(hotelId) => handleFieldChange({ hotelId })}
        />
        <DayOptionSelect
          label="Lunch Options"
          placeholder="Choose Lunch "
          value={day.selectedLunchId}
          options={availableMeals.lunch}
          disabled={isLunchDisabled}
          isMobile
          onChange={(selectedLunchId) => handleFieldChange({ selectedLunchId })}
        />
        <DayOptionSelect
          label="Dinner Options"
          placeholder="Choose Dinner "
          value={day.selectedDinnerId}
          options={availableMeals.dinner}
          disabled={isDinnerDisabled}
          isMobile
          onChange={(selectedDinnerId) => handleFieldChange({ selectedDinnerId })}
        />
      </div>
    );
  }

  return (
    <tr className="hover:bg-gray-50/70 transition-all">
      <td className="p-4 font-bold text-gray-700">Day #{day.dayNumber}</td>
      <td className="p-4 text-sm text-gray-500 font-mono">{day.date}</td>
      <td className="p-4">
        <DayOptionSelect
          label="Hotel"
          placeholder="Choose Hotel "
          value={day.hotelId}
          options={availableHotels}
          priceSuffix="/day"
          onChange={(hotelId) => handleFieldChange({ hotelId })}
        />
      </td>
      <td className="p-4">
        <DayOptionSelect
          label="Lunch Options"
          placeholder="Choose Lunch "
          value={day.selectedLunchId}
          options={availableMeals.lunch}
          disabled={isLunchDisabled}
          onChange={(selectedLunchId) => handleFieldChange({ selectedLunchId })}
        />
      </td>
      <td className="p-4">
        <DayOptionSelect
          label="Dinner Options"
          placeholder="Choose Dinner "
          value={day.selectedDinnerId}
          options={availableMeals.dinner}
          disabled={isDinnerDisabled}
          onChange={(selectedDinnerId) => handleFieldChange({ selectedDinnerId })}
        />
      </td>
    </tr>
  );
}
