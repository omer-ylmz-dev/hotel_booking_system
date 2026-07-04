import type { BookingState } from '../../types/booking';
import type { BookingAction } from './types';
import { initialState } from './constants';
import { clampStep } from './stepUtils';
import { generateDailySelections } from './generateDailySelections';
import { clearBookingState } from './bookingStorage';

export const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        config: action.payload,
        dailySelections: generateDailySelections(
          action.payload.startDate,
          action.payload.durationDays
        ),
      };
    case 'UPDATE_DAILY_SELECTION':
      return {
        ...state,
        dailySelections: state.dailySelections.map((day) =>
          day.dayNumber === action.payload.dayNumber ? action.payload : day
        ),
      };
    case 'NEXT_STEP':
      return { ...state, activeStep: Math.min(state.activeStep + 1, 3) };
    case 'PREV_STEP':
      return { ...state, activeStep: Math.max(state.activeStep - 1, 1) };
    case 'SET_STEP':
      return {
        ...state,
        activeStep: clampStep(action.payload, Boolean(state.config)),
      };
    case 'RESET':
      clearBookingState();
      return initialState;
    default:
      return state;
  }
};
