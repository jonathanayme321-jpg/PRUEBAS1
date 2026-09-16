// Utilidades para manejo de fechas y calendario

export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const DAY_NAMES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
export const FULL_DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

/**
 * Formatea una fecha a cadena YYYY-MM-DD en hora local
 */
export function formatDateKey(date) {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Convierte un string YYYY-MM-DD a objeto Date local
 */
export function parseDateKey(dateStr) {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formato amigable en español (ej: "Lunes, 14 de Septiembre de 2026")
 */
export function formatFriendlyDate(dateStr) {
  if (!dateStr) return '';
  const date = parseDateKey(dateStr);
  const dayOfWeek = (date.getDay() + 6) % 7; // Ajuste para que Lunes = 0
  const dayName = FULL_DAY_NAMES[dayOfWeek];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} de ${month} de ${year}`;
}

/**
 * Genera la matriz de días para el calendario (formato mensual 7xN)
 * Se organiza de Lunes (0) a Domingo (6)
 */
export function getCalendarDays(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Día de la semana en que inicia el mes (0 = Lun, 6 = Dom)
  const startingDay = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = lastDayOfMonth.getDate();

  // Días del mes anterior para rellenar
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const days = [];

  // Días previos
  for (let i = startingDay - 1; i >= 0; i--) {
    const dayNumber = prevMonthLastDay - i;
    const date = new Date(year, month - 1, dayNumber);
    days.push({
      dateKey: formatDateKey(date),
      dayNumber,
      isCurrentMonth: false,
      isPrevMonth: true,
      date,
    });
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      dateKey: formatDateKey(date),
      dayNumber: i,
      isCurrentMonth: true,
      isPrevMonth: false,
      date,
    });
  }

  // Días del mes posterior para completar filas completas de 7 días
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      dateKey: formatDateKey(date),
      dayNumber: i,
      isCurrentMonth: false,
      isPrevMonth: false,
      date,
    });
  }

  return days;
}

/**
 * Determina si una fecha YYYY-MM-DD es el día de hoy
 */
export function isToday(dateStr) {
  return dateStr === formatDateKey(new Date());
}
