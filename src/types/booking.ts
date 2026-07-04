export interface Country {
  id: number;
  name: string;
}

export interface Hotel {
  id: number;
  name: string;
  price: number;
}

export type BoardTypeCode = 'FB' | 'HB' | 'NB';

export interface BoardType {
  code: BoardTypeCode;
  name: string;
}

export interface Meal {
  id: number;
  name: string;
  price: number;
}

export interface CountryMeals {
  lunch: Meal[];
  dinner: Meal[];
}

export interface InitialConfig {
  citizenship: string;
  startDate: string;
  durationDays: number;
  destinationCountry: string;
  boardType: BoardTypeCode;
}

export interface DailySelection {
  dayNumber: number;
  date: string;
  hotelId: number | null;
  selectedLunchId: number | null;
  selectedDinnerId: number | null;
}


export interface BookingState {
  activeStep: number;
  config: InitialConfig | null;
  dailySelections: DailySelection[];
}