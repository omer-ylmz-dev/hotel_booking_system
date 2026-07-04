import type React from 'react';
import type { BookingState, InitialConfig, DailySelection } from '../../types/booking';

export type BookingAction =
  | { type: 'SET_CONFIG'; payload: InitialConfig }
  | { type: 'UPDATE_DAILY_SELECTION'; payload: DailySelection }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET' };

export interface BookingContextValue {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}
