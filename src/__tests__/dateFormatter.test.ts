import {
  addDaysLocal,
  formatLocalDate,
  getTodayLocalDate,
  parseLocalDate,
} from '../utils/dateFormatter';

describe('dateFormatter', () => {
  it('should parse YYYY-MM-DD as a local calendar date', () => {
    const date = parseLocalDate('2026-07-01');

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(6);
    expect(date.getDate()).toBe(1);
  });

  it('should format local dates without UTC shift', () => {
    expect(formatLocalDate(new Date(2026, 6, 1))).toBe('2026-07-01');
  });

  it('should add days in local time', () => {
    expect(addDaysLocal('2026-07-01', 0)).toBe('2026-07-01');
    expect(addDaysLocal('2026-07-01', 2)).toBe('2026-07-03');
    expect(addDaysLocal('2026-01-30', 2)).toBe('2026-02-01');
  });

  it('should return today as a local YYYY-MM-DD string', () => {
    const today = getTodayLocalDate();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(today).toBe(formatLocalDate(new Date()));
  });
});
