import type { BoardTypeCode, BookingState, DailySelection } from '../types/booking';
import { hotels, meals, citizenshipMultipliers } from '../data/mockData';

export interface DayPriceBreakdown {
  dayNumber: number;
  hotelPrice: number;
  lunchPrice: number;
  dinnerPrice: number;
  subTotal: number;
}

export interface CalculationResult {
  breakdown: DayPriceBreakdown[];
  grandTotal: number;
}


const resolveMealPrices = (
  boardType: BoardTypeCode,
  selection: DailySelection,
  countryMeals: (typeof meals)[string] | undefined
): { lunchPrice: number; dinnerPrice: number } => {
  if (boardType === 'NB' || !countryMeals) {
    return { lunchPrice: 0, dinnerPrice: 0 };
  }

  const lunchPrice = selection.selectedLunchId
    ? (countryMeals.lunch.find((m) => m.id === selection.selectedLunchId)?.price ?? 0)
    : 0;
  const dinnerPrice = selection.selectedDinnerId
    ? (countryMeals.dinner.find((m) => m.id === selection.selectedDinnerId)?.price ?? 0)
    : 0;


  if (boardType === 'HB' && lunchPrice > 0 && dinnerPrice > 0) {
    return { lunchPrice, dinnerPrice: 0 };
  }

  return { lunchPrice, dinnerPrice };
};


export const calculateTotalPrice = (state: BookingState): CalculationResult => {
  if (!state.config) return { breakdown: [], grandTotal: 0 };

  const { destinationCountry, citizenship, boardType } = state.config;
  const multiplier = citizenshipMultipliers[citizenship] || 1.0;

  const countryHotels = hotels[destinationCountry] || [];
  const countryMeals = meals[destinationCountry];

  let grandTotal = 0;
  const breakdown: DayPriceBreakdown[] = state.dailySelections.map((selection) => {
    const hotel = countryHotels.find((h) => h.id === selection.hotelId);
    const hotelPrice = hotel ? hotel.price : 0;
    const { lunchPrice, dinnerPrice } = resolveMealPrices(boardType, selection, countryMeals);

    const daySubTotal = (hotelPrice + lunchPrice + dinnerPrice) * multiplier;
    const roundedSubTotal = Math.round(daySubTotal * 100) / 100;
    grandTotal += roundedSubTotal;

    return {
      dayNumber: selection.dayNumber,
      hotelPrice: hotelPrice * multiplier,
      lunchPrice: lunchPrice * multiplier,
      dinnerPrice: dinnerPrice * multiplier,
      subTotal: roundedSubTotal,
    };
  });

  return {
    breakdown,
    grandTotal: Math.round(grandTotal * 100) / 100,
  };
};
