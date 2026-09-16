import { useMemo } from 'react';
import { Plus, Clock } from 'lucide-react';
import { formatDateKey, isToday } from '../../utils/dateUtils';
import { useCalendar } from '../../hooks/useCalendar';

const HOURS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00',
];

const DAY_KEYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export function WeekAgendaView() {
  const { currentDate, linksByDate, selectedDate, setSelectedDate, openAddModal } = useCalendar();

  const weekDays = useMemo(() => {
    const start = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - ((currentDate.getDay() + 6) % 7)
    );
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      return { date: d, dateKey: formatDateKey(d), dayName: DAY_KEYS[i], dayNumber: d.getDate() };
    });
  }, [currentDate]);

  const openCellAdd = (dateKey, hour) => {
    setSelectedDate(dateKey);
    openAddModal(dateKey, hour);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs overflow-hidden">
      {/* Encabezado de columnas (días de la semana) */}
      <div className="grid grid-cols-[60px_repeat(7,minmax(120px,1fr))] gap-1 border-b border-slate-200 pb-2 mb-1 min-w-[900px]">
        <div className="flex items-end justify-center pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Hora
        </div>
        {weekDays.map((day) => {
          const today = isToday(day.dateKey);
          const isSelected = selectedDate === day.dateKey;
          return (
            <button
              key={day.dateKey}
              type="button"
              onClick={() => setSelectedDate(day.dateKey)}
              className={`flex flex-col items-center py-1.5 rounded-xl transition-colors cursor-pointer ${
                today
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isSelected
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
                {day.dayName}
              </span>
              <span className="text-base font-bold leading-tight">{day.dayNumber}</span>
            </button>
          );
        })}
      </div>

      {/* Cuerpo en scroll horizontal */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Fila "todo el día" */}
          <div className="grid grid-cols-[60px_repeat(7,minmax(120px,1fr))] gap-1 mb-1">
            <div className="px-1 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Sin hora
            </div>
            {weekDays.map((day) => {
              const dayLinks =
                (linksByDate[day.dateKey] || []).filter((l) => !l.time);
              return (
                <div
                  key={day.dateKey}
                  className="min-h-[40px] p-1 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 flex flex-col gap-1"
                >
                  {dayLinks.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => openCellAdd(day.dateKey, '')}
                      className="text-[10px] text-slate-300 hover:text-blue-500 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> agregar
                    </button>
                  ) : (
                    dayLinks.map((item) => (
                      <span
                        key={item.id}
                        className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-medium truncate"
                        title={item.title}
                      >
                        {item.title}
                      </span>
                    ))
                  )}
                </div>
              );
            })}
          </div>

          {/* Filas de horas */}
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-[60px_repeat(7,minmax(120px,1fr))] gap-1 border-b border-slate-100"
            >
              <div className="px-1 py-1.5 text-xs font-semibold text-slate-500 text-right pr-1 whitespace-nowrap">
                {hour}
              </div>
              {weekDays.map((day) => {
                const dayLinks = (linksByDate[day.dateKey] || []).filter(
                  (l) => l.time && l.time.startsWith(hour.slice(0, 2))
                );
                const isSelected = selectedDate === day.dateKey;
                const isTodayCol = isToday(day.dateKey);
                return (
                  <div
                    key={day.dateKey}
                    onClick={() => setSelectedDate(day.dateKey)}
                    className={`min-h-[44px] p-1 rounded-lg border flex flex-col gap-0.5 transition-colors cursor-pointer group ${
                      dayLinks.length > 0 || isSelected || isTodayCol
                        ? 'border-blue-100 bg-blue-50/40'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex-1 flex flex-col gap-0.5">
                      {dayLinks.map((item) => (
                        <div
                          key={item.id}
                          className={`px-1.5 py-0.5 rounded text-[11px] font-medium truncate flex items-center gap-1 ${
                            item.visited
                              ? 'bg-slate-100 text-slate-400 line-through'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                          title={`${item.title} (${item.url})`}
                        >
                          <Clock className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCellAdd(day.dateKey, hour);
                        }}
                        className="text-blue-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 w-fit self-start p-0.5 cursor-pointer"
                        title={`Agregar a las ${hour}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}