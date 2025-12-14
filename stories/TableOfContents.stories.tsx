import type { StoryObj } from "@storybook/react";
import { TableOfContents } from "@/widgets/TableOfContents";
import { headersSnips } from "./TableOfContents.snips";
import type { RootHeader

 } from "@/shared/lib/markdown";
const keysSnips = Object.keys(headersSnips) as Array<keyof typeof headersSnips>;

export const labelsSnips = keysSnips.reduce((acc, key) => {
  acc[key] = headersSnips[key].label;
  return acc;
}, {} as Record<keyof typeof headersSnips, string>);

const mapping = keysSnips.reduce((acc, key) => {
  acc[key] = headersSnips[key].test; // <-- Берем только test!
  return acc;
}, {} as Record<keyof typeof headersSnips, RootHeader>);

const meta = {
  title: "Components/TableOfContents",
  component: TableOfContents,
  argTypes: {
    headers: {
      control: "select",
      options: keysSnips,
      labels: labelsSnips,
      description: "Набор заголовков для таблицы содержания",
      table: {
        type: {
          summary: "Headers",
          detail: JSON.stringify(headersSnips.empty.test, null, 2),
        },
      },
      mapping,
    },
  },
  args: {
    headers: headersSnips.empty.test, // Значение по умолчанию
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
// Stories с конкретными наборами
export const Basic: Story = {
  args: {
    headers: headersSnips.basic.test,
  },
};

export const LongText: Story = {
  args: {
    headers: headersSnips.long.test,
  },
};
