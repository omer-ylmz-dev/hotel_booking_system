import { createContext } from 'react';
import type { BookingContextValue } from './types';

export const BookingContext = createContext<BookingContextValue | undefined>(undefined);
