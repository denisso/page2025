import type { Headers } from "@/shared/lib/markdown";

export type Snip = { label: string; headers: Headers }

export const headersSnips = {
  basic: {
    label: "Базовые заголовки",
    headers: {
      title: ["Главная", "О нас", "Контакты"],
      id: ["main", "about", "contacts"],
      level: [1, 2, 2],
    },
  },
  docs: {
    label: "Документация",
    headers: {
      title: ["Введение", "Установка", "API", "Примеры"],
      id: ["intro", "installation", "api", "examples"],
      level: [1, 2, 3, 3],
    },
  },
  nested: {
    label: "Вложенная структура",
    headers: {
      title: ["Раздел 1", "Подраздел 1.1", "Подраздел 1.2", "Раздел 2"],
      id: ["section-1", "subsection-1-1", "subsection-1-2", "section-2"],
      level: [1, 2, 2, 1],
    },
  },
} as const satisfies Record<string, Snip>;
