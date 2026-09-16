const COLOR_CLASSES = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
  gray: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
};

const CATEGORY_TO_COLOR = {
  Trabajo: 'blue',
  Estudio: 'purple',
  Herramientas: 'emerald',
  Lectura: 'amber',
  Personal: 'rose',
  Otro: 'gray',
};

export function categoryColorKey(category) {
  return CATEGORY_TO_COLOR[category] || 'gray';
}

export const CATEGORY_INTERACTIVE = {
  blue: 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30 hover:bg-blue-500',
  purple: 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30 hover:bg-purple-500',
  emerald: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30 hover:bg-emerald-500',
  amber: 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/30 hover:bg-amber-400',
  rose: 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30 hover:bg-rose-500',
  gray: 'bg-slate-600 text-white border-slate-600 shadow-md shadow-slate-600/30 hover:bg-slate-500',
};

export const CATEGORY_NEUTRAL = {
  blue: 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300',
  purple: 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50 hover:border-purple-300',
  emerald: 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300',
  amber: 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50 hover:border-amber-300',
  rose: 'bg-white text-rose-700 border-rose-200 hover:bg-rose-50 hover:border-rose-300',
  gray: 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300',
};

export const CATEGORY_DOT = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  gray: 'bg-slate-500',
};

export function Badge({ category, size = 'md', className = '' }) {
  const colorKey = categoryColorKey(category);
  const colorClass = COLOR_CLASSES[colorKey] || COLOR_CLASSES.gray;
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClass} ${colorClass} ${className}`}
    >
      {category}
    </span>
  );
}
