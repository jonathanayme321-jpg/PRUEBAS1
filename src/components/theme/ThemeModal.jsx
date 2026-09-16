import { Sun, Moon, BookOpen, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Modal } from '../common/Modal';

export function ThemeModal() {
  const {
    isThemeModalOpen,
    closeThemeModal,
    mode,
    setMode,
    accent,
    setAccent,
    accentColors,
  } = useTheme();

  const getModeIcon = (id) => {
    switch (id) {
      case 'dark':
        return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'reading':
        return <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-300" />;
      case 'light':
      default:
        return <Sun className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <Modal
      isOpen={isThemeModalOpen}
      onClose={closeThemeModal}
      title="Tema y Color"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Modos */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {[
            { id: 'light', label: 'Claro' },
            { id: 'dark', label: 'Oscuro' },
            { id: 'reading', label: 'Lectura' },
          ].map((item) => {
            const isSelected = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {getModeIcon(item.id)}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Colores */}
        <div className="flex items-center justify-between gap-2 p-2">
          {accentColors.map((colorItem) => {
            const isSelected = accent === colorItem.id;
            return (
              <button
                key={colorItem.id}
                type="button"
                onClick={() => setAccent(colorItem.id)}
                title={colorItem.name}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'scale-110 ring-2 ring-offset-2 ring-slate-800 dark:ring-slate-100 dark:ring-offset-slate-900 shadow-xs'
                    : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: colorItem.color }}
              >
                {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
