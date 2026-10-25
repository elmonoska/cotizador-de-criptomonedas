export function formatDate(date: number): string {
  const d = new Date(date);

  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const dayName = days[d.getDay()];

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12 || 12; // Convierte la hora 0 a 12 para formato de 12 horas
  const strHours = String(hours).padStart(2, '0');

  return `${dayName} ${day}/${month}/${year} ${strHours}:${minutes}${ampm}`;
}
