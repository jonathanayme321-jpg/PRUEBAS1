import { createContext, useState, useEffect, useMemo } from 'react';
import { formatDateKey } from '../utils/dateUtils';
import { storageService } from '../services/storageService';

export const CalendarContext = createContext(null);

export const CATEGORIES = [
  { name: 'Trabajo', color: 'blue' },
  { name: 'Estudio', color: 'purple' },
  { name: 'Herramientas', color: 'emerald' },
  { name: 'Lectura', color: 'amber' },
  { name: 'Personal', color: 'rose' },
  { name: 'Otro', color: 'gray' },
];

export function CalendarProvider({ children }) {
  const todayStr = formatDateKey(new Date());

  // Estado del mes visualizado actualmente en el calendario
  const [currentDate, setCurrentDate] = useState(new Date());
  // Estado del día seleccionado (por defecto hoy)
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // Lista de páginas web guardadas
  const [links, setLinks] = useState([]);

  // Búsqueda y filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'calendar' | 'week' | 'history'

  // Control del modal de creación / edición
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(todayStr);
  const [modalTime, setModalTime] = useState('');
  const [editingLink, setEditingLink] = useState(null);

  // Cargar links iniciales
  useEffect(() => {
    const loaded = storageService.getLinks();
    setLinks(loaded);
  }, []);

  // Navegación de meses
  const prevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(formatDateKey(now));
  };

  // Navegación por semanas (para la vista de agenda)
  const prevWeek = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7));
  };

  const nextWeek = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7));
  };

  // Abrir modal para crear
  const openAddModal = (dateStr = null, timeStr = null) => {
    setEditingLink(null);
    setModalDate(dateStr || selectedDate || todayStr);
    setModalTime(timeStr || '');
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const openEditModal = (link) => {
    setEditingLink(link);
    setModalDate(link.date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
  };

  // Guardar link (creación o actualización)
  const saveLink = (linkData) => {
    if (editingLink) {
      const updated = storageService.updateLink(editingLink.id, linkData);
      setLinks(updated);
    } else {
      const updated = storageService.addLink(linkData);
      setLinks(updated);
    }
    closeModal();
  };

  // Eliminar link
  const deleteLink = (id) => {
    const updated = storageService.deleteLink(id);
    setLinks(updated);
  };

  // Alternar estado visitado
  const toggleVisited = (id) => {
    const updated = storageService.toggleVisited(id);
    setLinks(updated);
  };

  // Mapa de links por fecha para acceso rápido O(1)
  const linksByDate = useMemo(() => {
    const map = {};
    links.forEach((item) => {
      if (!map[item.date]) {
        map[item.date] = [];
      }
      map[item.date].push(item);
    });
    return map;
  }, [links]);

  // Links filtrados por búsqueda y categoría
  const filteredLinks = useMemo(() => {
    return links.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        filterCategory === 'Todas' || item.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [links, searchQuery, filterCategory]);

  const value = {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    links,
    linksByDate,
    filteredLinks,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    prevMonth,
    nextMonth,
    prevWeek,
    nextWeek,
    goToToday,
    isModalOpen,
    modalDate,
    modalTime,
    editingLink,
    openAddModal,
    openEditModal,
    closeModal,
    saveLink,
    deleteLink,
    toggleVisited,
    categories: CATEGORIES,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
