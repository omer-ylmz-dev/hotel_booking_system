import type { BookingState } from '../../types/booking';

export const LOCAL_STORAGE_KEY = 'hotel_booking_state';

export const initialState: BookingState = {
  activeStep: 1,
  config: null,
  dailySelections: [],
};
