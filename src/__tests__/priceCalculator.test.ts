import { calculateTotalPrice } from '../utils/priceCalculator';
import type { BookingState } from '../types/booking';

describe('Price Calculator & Business Rules Tests', () => {
  it('should correctly calculate base price for Turkey with no meals', () => {
    const mockState: BookingState = {
      activeStep: 3,
      config: {
        citizenship: 'Turkey',
        startDate: '2026-07-01',
        durationDays: 1,
        destinationCountry: 'Turkey',
        boardType: 'NB',
      },
      dailySelections: [
        {
          dayNumber: 1,
          date: '2026-07-01',
          hotelId: 101,
          selectedLunchId: null,
          selectedDinnerId: null,
        },
      ],
    };

    const result = calculateTotalPrice(mockState);
    expect(result.grandTotal).toBe(120);
  });

  it('should apply multiplier correctly for UAE citizenship', () => {
    const mockState: BookingState = {
      activeStep: 3,
      config: {
        citizenship: 'UAE',
        startDate: '2026-07-01',
        durationDays: 1,
        destinationCountry: 'Turkey',
        boardType: 'NB',
      },
      dailySelections: [
        {
          dayNumber: 1,
          date: '2026-07-01',
          hotelId: 101,
          selectedLunchId: null,
          selectedDinnerId: null,
        },
      ],
    };

    const result = calculateTotalPrice(mockState);
    expect(result.grandTotal).toBe(150);
  });

  it('should ignore meal ids for NB board type', () => {
    const mockState: BookingState = {
      activeStep: 3,
      config: {
        citizenship: 'Turkey',
        startDate: '2026-07-01',
        durationDays: 1,
        destinationCountry: 'Turkey',
        boardType: 'NB',
      },
      dailySelections: [
        {
          dayNumber: 1,
          date: '2026-07-01',
          hotelId: 101,
          selectedLunchId: 4,
          selectedDinnerId: 1,
        },
      ],
    };

    const result = calculateTotalPrice(mockState);
    expect(result.grandTotal).toBe(120);
    expect(result.breakdown[0].lunchPrice).toBe(0);
    expect(result.breakdown[0].dinnerPrice).toBe(0);
  });

  it('should charge only one meal for HB when both meal ids are present', () => {
    const mockState: BookingState = {
      activeStep: 3,
      config: {
        citizenship: 'Turkey',
        startDate: '2026-07-01',
        durationDays: 1,
        destinationCountry: 'Turkey',
        boardType: 'HB',
      },
      dailySelections: [
        {
          dayNumber: 1,
          date: '2026-07-01',
          hotelId: 101,
          selectedLunchId: 4,
          selectedDinnerId: 1,
        },
      ],
    };

    
    const result = calculateTotalPrice(mockState);
    expect(result.grandTotal).toBe(130);
    expect(result.breakdown[0].lunchPrice).toBe(10);
    expect(result.breakdown[0].dinnerPrice).toBe(0);
  });

  it('should charge both meals for FB board type', () => {
    const mockState: BookingState = {
      activeStep: 3,
      config: {
        citizenship: 'Turkey',
        startDate: '2026-07-01',
        durationDays: 1,
        destinationCountry: 'Turkey',
        boardType: 'FB',
      },
      dailySelections: [
        {
          dayNumber: 1,
          date: '2026-07-01',
          hotelId: 101,
          selectedLunchId: 4,
          selectedDinnerId: 1,
        },
      ],
    };


    const result = calculateTotalPrice(mockState);
    expect(result.grandTotal).toBe(145);
  });
});
