import { useState } from 'react';
import type { FormEvent } from 'react';
import { useBooking } from '../../hooks/useBooking';
import type { BoardTypeCode } from '../../types/booking';
import { getTodayLocalDate } from '../../utils/dateFormatter';
import CountrySelect from './initial-config/CountrySelect';
import TripDates from './initial-config/TripDates';
import BoardTypeSelection from './initial-config/BoardTypeSelection';
import FormError from './initial-config/FormError';
import FormActions from './initial-config/FormActions';

const COUNTRY_ERROR_ID = 'initial-config-country-error';
const DURATION_ERROR_ID = 'initial-config-duration-error';

type FormErrorField = 'country' | 'duration' | null;

export default function InitialConfigForm() {
  const { state, dispatch, goToNextStep } = useBooking();

  const [formData, setFormData] = useState({
    citizenship: state.config?.citizenship || '',
    startDate: state.config?.startDate || getTodayLocalDate(),
    durationDays: state.config?.durationDays || 3,
    destinationCountry: state.config?.destinationCountry || '',
    boardType: state.config?.boardType || ('FB' as BoardTypeCode),
  });

  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState<FormErrorField>(null);

  const clearError = () => {
    setError('');
    setErrorField(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.citizenship || !formData.destinationCountry) {
      setError('Please select citizenship and destination country.');
      setErrorField('country');
      return;
    }
    if (formData.durationDays <= 0 || formData.durationDays > 14) {
      setError('Duration must be between 1 and 14 days.');
      setErrorField('duration');
      return;
    }
    clearError();
    dispatch({ type: 'SET_CONFIG', payload: formData });
    goToNextStep();
  };

  const errorId =
    errorField === 'country'
      ? COUNTRY_ERROR_ID
      : errorField === 'duration'
        ? DURATION_ERROR_ID
        : undefined;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Step 1: Initial Configuration</h2>

      <FormError id={errorId} message={error} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CountrySelect
            id="citizenship"
            label="Citizenship"
            placeholder="Select Citizenship"
            value={formData.citizenship}
            onChange={(citizenship) => {
              clearError();
              setFormData((prev) => ({ ...prev, citizenship }));
            }}
            invalid={errorField === 'country'}
            errorId={COUNTRY_ERROR_ID}
          />
          <CountrySelect
            id="destination-country"
            label="Destination Country"
            placeholder="Select Destination Country"
            value={formData.destinationCountry}
            onChange={(destinationCountry) => {
              clearError();
              setFormData((prev) => ({ ...prev, destinationCountry }));
            }}
            invalid={errorField === 'country'}
            errorId={COUNTRY_ERROR_ID}
          />
        </div>

        <TripDates
          startDate={formData.startDate}
          durationDays={formData.durationDays}
          onStartDateChange={(startDate) => setFormData((prev) => ({ ...prev, startDate }))}
          onDurationChange={(durationDays) => {
            clearError();
            setFormData((prev) => ({ ...prev, durationDays }));
          }}
          durationInvalid={errorField === 'duration'}
          errorId={DURATION_ERROR_ID}
        />

        <BoardTypeSelection
          boardType={formData.boardType}
          onChange={(boardType) => setFormData((prev) => ({ ...prev, boardType }))}
        />

        <FormActions />
      </form>
    </div>
  );
}
