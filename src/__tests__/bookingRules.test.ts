import { getMealAvailability, isDaySelectionComplete } from '../utils/bookingRules';

describe('Booking Rules — Board Type Meal Availability', () => {
  const emptyDay = { selectedLunchId: null, selectedDinnerId: null };

  describe('NB (No Board)', () => {
    it('should disable both lunch and dinner', () => {
      const result = getMealAvailability('NB', emptyDay);

      expect(result.isLunchDisabled).toBe(true);
      expect(result.isDinnerDisabled).toBe(true);
    });

    it('should keep meals disabled even if meal ids are present', () => {
      const result = getMealAvailability('NB', {
        selectedLunchId: 4,
        selectedDinnerId: 1,
      });

      expect(result.isLunchDisabled).toBe(true);
      expect(result.isDinnerDisabled).toBe(true);
    });
  });

  describe('HB (Half Board)', () => {
    it('should allow both meals when none is selected', () => {
      const result = getMealAvailability('HB', emptyDay);

      expect(result.isLunchDisabled).toBe(false);
      expect(result.isDinnerDisabled).toBe(false);
    });

    it('should disable dinner when lunch is selected', () => {
      const result = getMealAvailability('HB', {
        selectedLunchId: 4,
        selectedDinnerId: null,
      });

      expect(result.isLunchDisabled).toBe(false);
      expect(result.isDinnerDisabled).toBe(true);
    });

    it('should disable lunch when dinner is selected', () => {
      const result = getMealAvailability('HB', {
        selectedLunchId: null,
        selectedDinnerId: 1,
      });

      expect(result.isLunchDisabled).toBe(true);
      expect(result.isDinnerDisabled).toBe(false);
    });
  });

  describe('FB (Full Board)', () => {
    it('should allow both meals when none is selected', () => {
      const result = getMealAvailability('FB', emptyDay);

      expect(result.isLunchDisabled).toBe(false);
      expect(result.isDinnerDisabled).toBe(false);
    });

    it('should allow dinner even when lunch is selected', () => {
      const result = getMealAvailability('FB', {
        selectedLunchId: 4,
        selectedDinnerId: null,
      });

      expect(result.isLunchDisabled).toBe(false);
      expect(result.isDinnerDisabled).toBe(false);
    });

    it('should allow lunch even when dinner is selected', () => {
      const result = getMealAvailability('FB', {
        selectedLunchId: null,
        selectedDinnerId: 1,
      });

      expect(result.isLunchDisabled).toBe(false);
      expect(result.isDinnerDisabled).toBe(false);
    });

    it('should allow both meals when both are selected', () => {
      const result = getMealAvailability('FB', {
        selectedLunchId: 4,
        selectedDinnerId: 1,
      });

      expect(result.isLunchDisabled).toBe(false);
      expect(result.isDinnerDisabled).toBe(false);
    });
  });
});

describe('Booking Rules — Day Selection Completeness', () => {
  const hotelOnly = {
    hotelId: 101,
    selectedLunchId: null,
    selectedDinnerId: null,
  };

  it('should be incomplete without a hotel', () => {
    expect(
      isDaySelectionComplete('NB', {
        hotelId: null,
        selectedLunchId: null,
        selectedDinnerId: null,
      })
    ).toBe(false);
  });

  describe('NB', () => {
    it('should be complete with hotel only', () => {
      expect(isDaySelectionComplete('NB', hotelOnly)).toBe(true);
    });
  });

  describe('HB', () => {
    it('should be complete with hotel only (meals optional)', () => {
      expect(isDaySelectionComplete('HB', hotelOnly)).toBe(true);
    });

    it('should be complete with hotel and lunch only', () => {
      expect(
        isDaySelectionComplete('HB', {
          hotelId: 101,
          selectedLunchId: 4,
          selectedDinnerId: null,
        })
      ).toBe(true);
    });

    it('should be complete with hotel and dinner only', () => {
      expect(
        isDaySelectionComplete('HB', {
          hotelId: 101,
          selectedLunchId: null,
          selectedDinnerId: 1,
        })
      ).toBe(true);
    });
  });

  describe('FB', () => {
    it('should be complete with hotel only (meals optional)', () => {
      expect(isDaySelectionComplete('FB', hotelOnly)).toBe(true);
    });

    it('should be complete with hotel and only one meal', () => {
      expect(
        isDaySelectionComplete('FB', {
          hotelId: 101,
          selectedLunchId: 4,
          selectedDinnerId: null,
        })
      ).toBe(true);
    });

    it('should be complete with hotel and both meals', () => {
      expect(
        isDaySelectionComplete('FB', {
          hotelId: 101,
          selectedLunchId: 4,
          selectedDinnerId: 1,
        })
      ).toBe(true);
    });
  });
});

