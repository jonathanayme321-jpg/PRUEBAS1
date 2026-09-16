import { Calendar, Plus } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { formatFriendlyDate, isToday } from '../../utils/dateUtils';
import { LinkCard } from '../links/LinkCard';

export function DayDetail() {
  const {
    selectedDate,
    linksByDate,
    openAddModal,
    openEditModal,
    deleteLink,
    toggleVisited,
  } = useCalendar();

  const dayLinks = linksByDate[selectedDate] || [];
  const isCurrentDay = isToday(selectedDate);

  return (
    <div className="bg-white dark:bg-[#181818] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-3 sm:p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {formatFriendlyDate(selectedDate)}
          </h3>
          {isCurrentDay && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
              Hoy
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => openAddModal(selectedDate)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-xs hover:opacity-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Agregar
        </button>
      </div>

      {dayLinks.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-xs">
          Sin lecturas programadas para este día
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
          {dayLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              showDate={false}
              onEdit={openEditModal}
              onDelete={deleteLink}
              onToggleVisited={toggleVisited}
            />
          ))}
        </div>
      )}
    </div>
  );
}
