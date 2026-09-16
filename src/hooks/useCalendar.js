import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext';

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar debe utilizarse dentro de un CalendarProvider');
  }
  return context;
}
