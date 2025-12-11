import type { StoryObj } from "@storybook/react";
import { TableOfContents } from "@/widgets/TableOfContents";
import { headersSnips, type Snip } from "./TableOfContents.snips";

const keys = Object.keys(headersSnips) as Array<keyof typeof headersSnips>;

export const headerLabels = keys.reduce((acc, key) => {
  acc[key] = headersSnips[key].label;
  return acc;
}, {} as Record<keyof typeof headersSnips, string>);

const meta = {
  title: "Components/TableOfContents",
  component: TableOfContents,
  argTypes: {
    headers: {
      control: "select",
      options: Object.keys(headersSnips),
      labels: headerLabels,
      description: "Набор заголовков для таблицы содержания",
      table: {
        type: {
          summary: "Headers",
          detail: JSON.stringify(headersSnips.basic.headers, null, 2),
        },
      },
      mapping: headersSnips,
    },
  },
  args: {
    headers: headersSnips.basic.headers, // Значение по умолчанию
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
// Stories с конкретными наборами
export const Basic: Story = {
  args: {
    headers: headersSnips.basic.headers,
  },
};

export const Documentation: Story = {
  args: {
    headers: headersSnips.docs.headers,
  },
};