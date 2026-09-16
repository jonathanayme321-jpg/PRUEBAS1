// Servicio de almacenamiento en LocalStorage para las páginas web guardadas

import { formatDateKey } from '../utils/dateUtils';

const STORAGE_KEY = 'webcal_saved_links';

const today = new Date();

const DEFAULT_LINKS = [
  {
    id: 'manga-1',
    title: 'Yuusha Party wo Tsuihou sareta Shiromadoushi...',
    url: 'https://mangadex.org',
    date: formatDateKey(today),
    category: 'Lectura',
    chapter: '81',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    notes: 'Capítulo 81',
    visited: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'manga-2',
    title: 'Wistoria: Wand And Sword',
    url: 'https://mangadex.org',
    date: formatDateKey(today),
    category: 'Lectura',
    chapter: '44',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    notes: 'Capítulo 44',
    visited: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'manga-3',
    title: 'Vanitas No Carte',
    url: 'https://mangadex.org',
    date: formatDateKey(new Date(Date.now() + 86400000)),
    category: 'Lectura',
    chapter: '77',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    notes: 'Capítulo 77',
    visited: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'manga-4',
    title: 'Uzaki-chan wa Asobitai!',
    url: 'https://mangadex.org',
    date: formatDateKey(new Date(Date.now() + 86400000 * 2)),
    category: 'Lectura',
    chapter: '157',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    notes: 'Capítulo 157',
    visited: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'manga-5',
    title: 'Kuro no Shoukanshi',
    url: 'https://mangadex.org',
    date: formatDateKey(today),
    category: 'Lectura',
    chapter: '80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    notes: 'Capítulo 80',
    visited: false,
    createdAt: new Date().toISOString(),
  },
];

export const storageService = {
  getLinks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LINKS));
        return DEFAULT_LINKS;
      }
      const parsed = JSON.parse(data);
      // Si la data anterior eran los demos de texto antiguos sin portada, actualizamos con los mangas visuales
      if (parsed.length > 0 && !parsed.some((p) => p.coverImage || p.chapter)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LINKS));
        return DEFAULT_LINKS;
      }
      return parsed;
    } catch (error) {
      console.error('Error al leer de localStorage:', error);
      return DEFAULT_LINKS;
    }
  },

  saveLinks: (links) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  },

  addLink: (link) => {
    const current = storageService.getLinks();
    const newLink = {
      ...link,
      id: link.id || `link_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      visited: false,
    };
    const updated = [newLink, ...current];
    storageService.saveLinks(updated);
    return updated;
  },

  updateLink: (id, updatedData) => {
    const current = storageService.getLinks();
    const updated = current.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    storageService.saveLinks(updated);
    return updated;
  },

  deleteLink: (id) => {
    const current = storageService.getLinks();
    const updated = current.filter((item) => item.id !== id);
    storageService.saveLinks(updated);
    return updated;
  },

  toggleVisited: (id) => {
    const current = storageService.getLinks();
    const updated = current.map((item) =>
      item.id === id ? { ...item, visited: !item.visited } : item
    );
    storageService.saveLinks(updated);
    return updated;
  },
};
