import { useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import { bookingReducer } from './booking/bookingReducer';
import { initialState } from './booking/constants';
import { loadBookingState, saveBookingState } from './booking/bookingStorage';
import { useWizardHistory } from './booking/useWizardHistory';
import { BookingContext } from './booking/bookingContext';

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState, loadBookingState);
  const { goToNextStep, goToPrevStep } = useWizardHistory(state, dispatch);

  useEffect(() => {
    saveBookingState(state);
  }, [state]);

  return (
    <BookingContext.Provider value={{ state, dispatch, goToNextStep, goToPrevStep }}>
      {children}
    </BookingContext.Provider>
  );
};
