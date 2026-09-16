import { Bookmark, Clock, CheckCircle2, Globe, Calendar, ExternalLink } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { formatDateKey } from '../../utils/dateUtils';
import { categoryColorKey, CATEGORY_INTERACTIVE, CATEGORY_NEUTRAL, CATEGORY_DOT } from '../common/Badge';

export function Sidebar() {
  const { links, setSelectedDate, setActiveTab, setFilterCategory, categories, filterCategory } =
    useCalendar();

  const todayStr = formatDateKey(new Date());

  // Páginas para hoy
  const todayLinks = links.filter((l) => l.date === todayStr);
  const visitedCount = links.filter((l) => l.visited).length;
  const pendingCount = links.length - visitedCount;

  // Próximas páginas (fechas >= hoy, ordenadas cronológicamente)
  const upcomingLinks = [...links]
    .filter((l) => l.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const handleCategoryClick = (catName) => {
    setFilterCategory(catName);
    setActiveTab('all');
  };

  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
    setActiveTab('calendar');
  };

  return (
    <aside className="w-full lg:w-72 space-y-6 shrink-0">
      {/* Tarjeta de Resumen / Métricas */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-blue-600" />
          Resumen
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-blue-50/60 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-100/80 dark:border-blue-900/40">
            <span className="text-xs text-blue-700 dark:text-blue-300 font-medium block">
              Para hoy
            </span>
            <span className="text-2xl font-bold text-blue-950 dark:text-blue-100">
              {todayLinks.length}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Total páginas
            </span>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {links.length}
            </span>
          </div>

          <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-100/80 dark:border-emerald-900/40">
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium block">
              Visitadas
            </span>
            <span className="text-xl font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {visitedCount}
            </span>
          </div>

          <div className="bg-amber-50/60 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-100/80 dark:border-amber-900/40">
            <span className="text-xs text-amber-700 dark:text-amber-300 font-medium block">
              Pendientes
            </span>
            <span className="text-xl font-bold text-amber-900 dark:text-amber-100 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {pendingCount}
            </span>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Categorías
        </h3>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => handleCategoryClick('Todas')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              filterCategory === 'Todas'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                : 'hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300'
            }`}
          >
            <span>Todas las categorías</span>
            <span className="bg-slate-200/60 dark:bg-slate-700 px-2 py-0.5 rounded-full text-[11px]">
              {links.length}
            </span>
          </button>

          {categories.map((cat) => {
            const count = links.filter((l) => l.category === cat.name).length;
            const isCurrent = filterCategory === cat.name;
            const colorKey = categoryColorKey(cat.name);

            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => handleCategoryClick(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 cursor-pointer ${
                  isCurrent
                    ? `${CATEGORY_INTERACTIVE[colorKey]} scale-[1.02]`
                    : `${CATEGORY_NEUTRAL[colorKey]} hover:scale-[1.01] hover:shadow-sm`
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full transition-transform ${CATEGORY_DOT[colorKey]} ${
                      isCurrent ? 'scale-125 ring-2 ring-white/60' : ''
                    }`}
                  ></span>
                  <span>{cat.name}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Próximas Páginas Web */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          Próximas para revisar
        </h3>

        {upcomingLinks.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">
            No tienes páginas pendientes próximamente
          </p>
        ) : (
          <div className="space-y-2">
            {upcomingLinks.map((item) => (
              <div
                key={item.id}
                onClick={() => handleDateSelect(item.date)}
                className="group p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/70 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.title}
                  </span>
                  <a
                    href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-slate-400 hover:text-blue-600 shrink-0 p-0.5"
                    title="Abrir en pestaña nueva"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span className="truncate max-w-[90px]">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
