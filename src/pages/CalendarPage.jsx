import { useCalendar } from '../hooks/useCalendar';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { DayDetail } from '../components/calendar/DayDetail';
import { WeekAgendaView } from '../components/calendar/WeekAgendaView';
import { AllLinksView } from '../components/links/AllLinksView';
import { AddLinkModal } from '../components/links/AddLinkModal';

export function CalendarPage() {
  const { activeTab } = useCalendar();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 pb-24">
      <main className="w-full">
        {activeTab === 'calendar' ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Calendario mensual visual */}
            <CalendarGrid />

            {/* Portadas del día seleccionado */}
            <DayDetail />
          </div>
        ) : activeTab === 'week' ? (
          <WeekAgendaView />
        ) : (
          /* Vista Biblioteca o Historial (Portadas visuales tipo Tachiyomi) */
          <AllLinksView />
        )}
      </main>

      {/* Modal para crear o editar mangas y páginas */}
      <AddLinkModal />
    </div>
  );
}
