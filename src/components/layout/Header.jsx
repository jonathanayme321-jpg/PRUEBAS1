import { useState } from 'react';
import { Search, Plus, SlidersHorizontal, X } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { ThemeButton } from '../theme/ThemeButton';

export function Header() {
  const {
    activeTab,
    openAddModal,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    categories,
  } = useCalendar();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'calendar':
        return 'Calendario';
      case 'week':
        return 'Agenda Semanal';
      case 'history':
        return 'Historial';
      case 'all':
      default:
        return 'Biblioteca';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Título de la sección estilo Tachiyomi */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {getTitle()}
          </h1>
        </div>

        {/* Acciones de la barra superior (Solo iconos limpios) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Búsqueda expandible */}
          {isSearchOpen ? (
            <div className="relative flex items-center animate-in fade-in duration-150">
              <input
                type="text"
                autoFocus
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 sm:w-56 pl-3 pr-7 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              title="Buscar"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Filtros de categoría */}
          <button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            title="Filtros"
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              filterCategory !== 'Todas' || isFiltersOpen
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Botón rápido Añadir */}
          <button
            type="button"
            onClick={() => openAddModal()}
            title="Agregar"
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Menú de temas y colores */}
          <ThemeButton compact={true} />
        </div>
      </div>

      {/* Barra desplegable de filtros rápidos de categoría */}
      {isFiltersOpen && (
        <div className="max-w-7xl mx-auto pt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 animate-in fade-in duration-100">
          <button
            type="button"
            onClick={() => setFilterCategory('Todas')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === 'Todas'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setFilterCategory(cat.name)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat.name
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
