import type { RootHeader } from "@/shared/lib/markdown";
import { transformMarkdownToAST } from "@/shared/lib/markdown";
import { buildHeadersTreeFromAST } from "@/shared/lib/markdown";

type TupleHeader = [string, 1 | 2 | 3 | 4 | 5 | 6];

const generateTestData = (headers: TupleHeader[]) => {
  let markdown = "";
  for (const header of headers) {
    const [title, level] = header;
    markdown += "\n" + "#".repeat(level) + " " + title + "\n";
    markdown += "\nSome text here for example\n";
  }
  const ast = transformMarkdownToAST(markdown);
  const headersAst = buildHeadersTreeFromAST(ast);
  return headersAst;
};

type Snip = {
  label: string;
  test: RootHeader;
};
export const headersSnips = {
  empty: {
    label: "Empty",
    test: generateTestData([]),
  },
  basic: {
    label: "Ex 1",
    test: generateTestData([
      ["test1", 1],
      ["test2", 2],
      ["test3", 3],
    ]),
  },
  long: {
    label: "Ex 2",
    test: generateTestData([
      [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        1,
      ],
      [
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        2,
      ],
      [
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        3,
      ],
    ]),
  },
} as const satisfies Record<string, Snip>;
