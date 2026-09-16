import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, BookOpen, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeButton({ className = '', compact = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { mode, setMode, accent, setAccent, accentColors, currentAccentObj } = useTheme();

  // Cerrar el menú al hacer clic afuera o pulsar Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const getModeIcon = (id, size = 'w-4 h-4') => {
    switch (id) {
      case 'dark':
        return <Moon className={`${size} text-indigo-400`} />;
      case 'reading':
        return <BookOpen className={`${size} text-amber-600 dark:text-amber-400`} />;
      case 'light':
      default:
        return <Sun className={`${size} text-amber-500`} />;
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Botón minimalista de temas */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Temas y Colores"
        className={`flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all cursor-pointer shadow-2xs ${className}`}
      >
        <div className="relative flex items-center justify-center">
          {getModeIcon(mode, 'w-4 h-4')}
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-1 ring-white dark:ring-slate-800"
            style={{ backgroundColor: currentAccentObj.color }}
          />
        </div>
        {!compact && (
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline">
            Tema
          </span>
        )}
      </button>

      {/* Menú desplegable ultra limpio (sin exceso de texto) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in duration-150">
          {/* Selector de Modo: Claro, Oscuro, Lectura */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl mb-3">
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
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {getModeIcon(item.id, 'w-3.5 h-3.5')}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Selector de Color: Paleta limpia de círculos */}
          <div className="flex items-center justify-between gap-1.5 px-1 py-0.5">
            {accentColors.map((colorItem) => {
              const isSelected = accent === colorItem.id;
              return (
                <button
                  key={colorItem.id}
                  type="button"
                  onClick={() => setAccent(colorItem.id)}
                  title={colorItem.name}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'scale-110 ring-2 ring-offset-2 ring-slate-800 dark:ring-slate-200 dark:ring-offset-slate-900 shadow-xs'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: colorItem.color }}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
