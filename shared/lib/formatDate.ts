/**
 * Форматирует числовое значение даты в строку вида `YYYY/MM/DD HH:MM`.
 *
 * @param dateNow - Временная метка в миллисекундах.
 * @returns Отформатированная строка с датой и временем.
 */
export function formatDate(dateNow: number) {
  const date = new Date(dateNow);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
