import { BookOpen, CalendarDays, CalendarRange, Clock, MoreHorizontal } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { useTheme } from '../../hooks/useTheme';

export function BottomNav() {
  const { activeTab, setActiveTab } = useCalendar();
  const { openThemeModal } = useTheme();

  const navItems = [
    { key: 'all', label: 'Biblioteca', icon: BookOpen },
    { key: 'calendar', label: 'Calendario', icon: CalendarDays },
    { key: 'week', label: 'Semana', icon: CalendarRange },
    { key: 'history', label: 'Historial', icon: Clock },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#161616]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1 shadow-xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveTab(item.key)}
              className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all group"
            >
              <div
                className={`px-4 py-1 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                  isActive
                    ? 'font-bold text-slate-900 dark:text-slate-100'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Botón Más (Temas y Configuración) */}
        <button
          type="button"
          onClick={openThemeModal}
          title="Temas y Colores"
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all group"
        >
          <div className="px-4 py-1 rounded-full flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">Más</span>
        </button>
      </div>
    </nav>
  );
}
