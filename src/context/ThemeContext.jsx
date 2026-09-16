import { createContext, useState, useEffect, useMemo } from 'react';

export const ThemeContext = createContext(null);

export const ACCENT_COLORS = [
  {
    id: 'blue',
    name: 'Azul Océano',
    color: '#2563eb',
    previewClass: 'bg-blue-600',
    borderClass: 'border-blue-600',
  },
  {
    id: 'emerald',
    name: 'Verde Esmeralda',
    color: '#059669',
    previewClass: 'bg-emerald-600',
    borderClass: 'border-emerald-600',
  },
  {
    id: 'purple',
    name: 'Violeta / Púrpura',
    color: '#7c3aed',
    previewClass: 'bg-purple-600',
    borderClass: 'border-purple-600',
  },
  {
    id: 'amber',
    name: 'Ámbar Dorado',
    color: '#d97706',
    previewClass: 'bg-amber-600',
    borderClass: 'border-amber-600',
  },
  {
    id: 'rose',
    name: 'Rosa Carmesí',
    color: '#e11d48',
    previewClass: 'bg-rose-600',
    borderClass: 'border-rose-600',
  },
  {
    id: 'cyan',
    name: 'Cian Turquesa',
    color: '#0891b2',
    previewClass: 'bg-cyan-600',
    borderClass: 'border-cyan-600',
  },
  {
    id: 'indigo',
    name: 'Índigo Imperial',
    color: '#4f46e5',
    previewClass: 'bg-indigo-600',
    borderClass: 'border-indigo-600',
  },
];

export const THEME_MODES = [
  {
    id: 'light',
    name: 'Modo Claro',
    subtitle: 'Nítido y luminoso',
    description: 'Perfecto para el día a día y ambientes bien iluminados.',
    icon: 'Sun',
  },
  {
    id: 'dark',
    name: 'Modo Oscuro',
    subtitle: 'Descanso visual nocturno',
    description: 'Tonos oscuros que reducen la fatiga ocular en la noche.',
    icon: 'Moon',
  },
  {
    id: 'reading',
    name: 'Modo Lectura',
    subtitle: 'Tono sepia suave',
    description: 'Cálido y relajante estilo papel, ideal para leer y estudiar horas.',
    icon: 'BookOpen',
  },
];

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('webcal_theme_mode') || 'light';
  });

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('webcal_theme_accent') || 'blue';
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Sincronizar clases y atributos en la raíz del documento
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('dark', 'reading');
    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'reading') {
      root.classList.add('reading');
    }

    root.setAttribute('data-theme', mode);
    root.setAttribute('data-accent', accent);

    localStorage.setItem('webcal_theme_mode', mode);
    localStorage.setItem('webcal_theme_accent', accent);
  }, [mode, accent]);

  const openThemeModal = () => setIsThemeModalOpen(true);
  const closeThemeModal = () => setIsThemeModalOpen(false);

  const resetTheme = () => {
    setMode('light');
    setAccent('blue');
  };

  const currentAccentObj = useMemo(() => {
    return ACCENT_COLORS.find((a) => a.id === accent) || ACCENT_COLORS[0];
  }, [accent]);

  const currentModeObj = useMemo(() => {
    return THEME_MODES.find((m) => m.id === mode) || THEME_MODES[0];
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      accent,
      setAccent,
      isThemeModalOpen,
      setIsThemeModalOpen,
      openThemeModal,
      closeThemeModal,
      resetTheme,
      accentColors: ACCENT_COLORS,
      themeModes: THEME_MODES,
      currentAccentObj,
      currentModeObj,
    }),
    [mode, accent, isThemeModalOpen, currentAccentObj, currentModeObj]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
