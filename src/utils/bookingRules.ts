import type { BoardTypeCode, DailySelection } from '../types/booking';

export interface MealAvailability {
  isLunchDisabled: boolean;
  isDinnerDisabled: boolean;
}



type DayMealSelection = Pick<DailySelection, 'hotelId' | 'selectedLunchId' | 'selectedDinnerId'>;

export const getMealAvailability = (
  boardType: BoardTypeCode,
  day: Pick<DailySelection, 'selectedLunchId' | 'selectedDinnerId'>
): MealAvailability => {
  const isNB = boardType === 'NB';
  const isHB = boardType === 'HB';

  return {
    isLunchDisabled: isNB || (isHB && day.selectedDinnerId !== null),
    isDinnerDisabled: isNB || (isHB && day.selectedLunchId !== null),
  };
};



export const isDaySelectionComplete = (
  _boardType: BoardTypeCode,
  day: DayMealSelection
): boolean => {

  return day.hotelId !== null;
};



export const isDailyConfigComplete = (
  boardType: BoardTypeCode,
  dailySelections: DayMealSelection[]
): boolean => dailySelections.every((day) => isDaySelectionComplete(boardType, day));

