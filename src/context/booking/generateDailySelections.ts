import type { DailySelection } from '../../types/booking';
import { addDaysLocal } from '../../utils/dateFormatter';

export const generateDailySelections = (
  startDate: string,
  duration: number
): DailySelection[] => {
  const days: DailySelection[] = [];

  for (let i = 0; i < duration; i++) {
    days.push({
      dayNumber: i + 1,
      date: addDaysLocal(startDate, i),
      hotelId: null,
      selectedLunchId: null,
      selectedDinnerId: null,
    });
  }

  return days;
};
