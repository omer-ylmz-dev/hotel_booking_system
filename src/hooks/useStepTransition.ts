import { useEffect, useState } from 'react';
import { delay } from '../utils/delay';

const STEP_DELAY_MS = 400;

export function useStepTransition(activeStep: number) {
  const [displayedStep, setDisplayedStep] = useState(activeStep);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeStep === displayedStep) return;

    let cancelled = false;

    const transition = async () => {
      setIsLoading(true);
      await delay(STEP_DELAY_MS);
      if (cancelled) return;
      setDisplayedStep(activeStep);
      setIsLoading(false);
    };

    transition();

    return () => {
      cancelled = true;
    };
  }, [activeStep, displayedStep]);

  return { displayedStep, isLoading };
}
