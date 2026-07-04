import type { BookingState } from '../../types/booking';
import { LOCAL_STORAGE_KEY, initialState } from './constants';
import { clampStep } from './stepUtils';
import { getStepFromLocation } from './wizardUrl';

const isBookingState = (value: unknown): value is BookingState => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.activeStep === 'number' &&
    (candidate.config === null || typeof candidate.config === 'object') &&
    Array.isArray(candidate.dailySelections)
  );
};


const applyUrlStep = (state: BookingState): BookingState => {
  const urlStep = getStepFromLocation();
  if (urlStep === null) return state;

  return {
    ...state,
    activeStep: clampStep(urlStep, Boolean(state.config)),
  };
};


export const loadBookingState = (fallback: BookingState = initialState): BookingState => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) return applyUrlStep(fallback);

    const parsed: unknown = JSON.parse(saved);
    if (!isBookingState(parsed)) {
      clearBookingState();
      return applyUrlStep(fallback);
    }

    return applyUrlStep(parsed);
  } catch {
    clearBookingState();
    return applyUrlStep(fallback);
  }
};


export const saveBookingState = (state: BookingState): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
};


export const clearBookingState = (): void => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};
