import { BookOpen, Plus } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { LinkCard } from './LinkCard';

export function AllLinksView() {
  const {
    filteredLinks,
    openAddModal,
    openEditModal,
    deleteLink,
    toggleVisited,
    activeTab,
  } = useCalendar();

  // Si está en la pestaña "Historial", filtramos solo las visitadas
  const displayLinks =
    activeTab === 'history'
      ? filteredLinks.filter((l) => l.visited)
      : filteredLinks;

  if (displayLinks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
          <BookOpen className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {activeTab === 'history' ? 'Sin historial de lectura' : 'Tu biblioteca está vacía'}
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
          {activeTab === 'history'
            ? 'Los mangas o páginas que marques como leídos aparecerán aquí.'
            : 'Agrega tus mangas, cómics o páginas web favoritas para verlas en este formato.'}
        </p>
        <button
          type="button"
          onClick={() => openAddModal()}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm hover:opacity-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Agregar a la biblioteca
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
      {displayLinks.map((link) => (
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
  );
}
