/**
 * Генератор уникального id для заголовков статей
 */
import { translite } from "@/shared/lib/translite";

/**
 * Фабрика для генератора уникального id
 * @returns 
 */
export const factoryGenUniqId = () => {
  const usedIds: Set<string> = new Set();
  /**
   * Генерирует уникальный id
   */
  return (title: string) => {
    let id = translite(title);
    let counter: number = 1;
    while (usedIds.has(id)) {
      id = `header-${id}-${counter}`;
      counter++;
    }
    usedIds.add(id);
    return id;
  };
};
