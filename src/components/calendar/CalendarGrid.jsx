import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_NAMES, getCalendarDays } from '../../utils/dateUtils';
import { useCalendar } from '../../hooks/useCalendar';
import { DayCell } from './DayCell';

const SHORT_DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export function CalendarGrid() {
  const { currentDate, prevMonth, nextMonth, goToToday } = useCalendar();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => {
    return getCalendarDays(year, month);
  }, [year, month]);

  return (
    <div className="bg-white dark:bg-[#181818] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-3 sm:p-4 shadow-xs">
      {/* Selector de Mes minimalista */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            type="button"
            onClick={goToToday}
            className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Hoy
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            title="Mes anterior"
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            title="Mes siguiente"
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Encabezados de un solo carácter (L, M, X, J, V, S, D) */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
        {SHORT_DAYS.map((letter, i) => (
          <div
            key={i}
            className="py-1 text-xs font-bold text-slate-400 dark:text-slate-500"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Celdas cuadradas del calendario */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((dayObj) => (
          <DayCell key={dayObj.dateKey} dayObj={dayObj} />
        ))}
      </div>
    </div>
  );
}
