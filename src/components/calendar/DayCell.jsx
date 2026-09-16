import { useCalendar } from '../../hooks/useCalendar';
import { isToday } from '../../utils/dateUtils';

export function DayCell({ dayObj }) {
  const { selectedDate, setSelectedDate, linksByDate } = useCalendar();

  const { dateKey, dayNumber, isCurrentMonth } = dayObj;
  const isSelected = selectedDate === dateKey;
  const isCurrentDay = isToday(dateKey);
  const dayLinks = linksByDate[dateKey] || [];
  const firstLink = dayLinks[0];

  return (
    <div
      onClick={() => setSelectedDate(dateKey)}
      className={`group relative aspect-square rounded-xl sm:rounded-2xl transition-all duration-150 cursor-pointer overflow-hidden border flex flex-col justify-between p-1 sm:p-2 ${
        !isCurrentMonth
          ? 'opacity-25 border-transparent'
          : 'border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
      } ${
        isSelected
          ? 'ring-2 ring-blue-600 border-transparent z-10 scale-[1.02] shadow-md'
          : ''
      } ${
        firstLink?.coverImage
          ? 'bg-slate-950'
          : isCurrentMonth
          ? 'bg-slate-50 dark:bg-[#1f1f1f]'
          : 'bg-transparent'
      }`}
    >
      {/* Portada de fondo si el día tiene enlace con imagen */}
      {firstLink?.coverImage && (
        <img
          src={firstLink.coverImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
        />
      )}

      {/* Número de día / Insignia */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span
          className={`inline-flex items-center justify-center text-xs font-black rounded-lg w-5 h-5 sm:w-6 sm:h-6 ${
            isCurrentDay
              ? 'bg-blue-600 text-white shadow-xs'
              : firstLink?.coverImage
              ? 'bg-black/80 text-white backdrop-blur-xs'
              : isSelected
              ? 'text-blue-600 dark:text-blue-400 font-black'
              : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {dayNumber}
        </span>

        {/* Insignia verde estilo Tachiyomi con cantidad de mangas para esta fecha */}
        {dayLinks.length > 0 && (
          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-blue-600 text-white shadow-xs">
            {dayLinks.length}
          </span>
        )}
      </div>

      {/* Título muy sutil al pie si tiene portada */}
      {firstLink && (
        <div className="relative z-10 hidden sm:block">
          <p className="text-[10px] font-medium text-white line-clamp-1 drop-shadow-md">
            {firstLink.title}
          </p>
        </div>
      )}
    </div>
  );
}
