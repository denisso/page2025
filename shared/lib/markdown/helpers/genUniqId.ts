/**
 * генератор уникального id для заголовков статей
 */
import { translite } from "@/shared/lib/translite";

export const factoryGenUniqId = () => {
  const usedIds: Set<string> = new Set();
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
