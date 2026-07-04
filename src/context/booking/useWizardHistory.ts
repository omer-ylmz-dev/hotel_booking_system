import { useCallback, useEffect, useRef } from 'react';
import type React from 'react';
import type { BookingState } from '../../types/booking';
import type { BookingAction } from './types';
import { buildStepUrl, getStepFromLocation } from './wizardUrl';

export const useWizardHistory = (
  state: BookingState,
  dispatch: React.Dispatch<BookingAction>
) => {
  const skipHistorySync = useRef(false);
  const isInitialSync = useRef(true);
  const wizardHistoryDepth = useRef(0);

  useEffect(() => {
    const url = buildStepUrl(state.activeStep);
    const historyState = { step: state.activeStep };

    if (skipHistorySync.current) {
      skipHistorySync.current = false;
      return;
    }

    if (isInitialSync.current) {
      isInitialSync.current = false;
      window.history.replaceState(historyState, '', url);
      return;
    }

    const histStep = window.history.state?.step;
    if (histStep === state.activeStep) return;

    if (state.activeStep === 1 && !state.config) {
      window.history.replaceState(historyState, '', url);
      wizardHistoryDepth.current = 0;
      return;
    }

    if (histStep != null && state.activeStep < histStep) {
      window.history.replaceState(historyState, '', url);
      return;
    }

    window.history.pushState(historyState, '', url);
    wizardHistoryDepth.current += 1;
  }, [state.activeStep, state.config]);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const requested = event.state?.step ?? getStepFromLocation() ?? 1;

      skipHistorySync.current = true;
      wizardHistoryDepth.current = Math.max(0, wizardHistoryDepth.current - 1);
      dispatch({ type: 'SET_STEP', payload: requested });
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [dispatch]);

  const goToNextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, [dispatch]);

  const goToPrevStep = useCallback(() => {
    if (wizardHistoryDepth.current > 0) {
      window.history.back();
      return;
    }
    dispatch({ type: 'PREV_STEP' });
  }, [dispatch]);

  return { goToNextStep, goToPrevStep };
};
