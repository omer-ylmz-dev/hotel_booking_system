export const clampStep = (step: number, hasConfig: boolean): number => {
  const next = Math.min(Math.max(step, 1), 3);
  if (next > 1 && !hasConfig) return 1;
  return next;
};
