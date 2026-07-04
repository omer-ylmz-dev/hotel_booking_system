export const getStepFromLocation = (): number | null => {
  const step = Number(new URLSearchParams(window.location.search).get('step'));
  return Number.isInteger(step) && step >= 1 && step <= 3 ? step : null;
};

export const buildStepUrl = (step: number) => {
  const url = new URL(window.location.href);
  url.searchParams.set('step', String(step));
  return url;
};
