/**
 * тест работы метода который гененрирует дерево заголовков из AST Markdown
 */
import { describe, it, expect } from "vitest";
import { transformMarkdownToAST } from "@/shared/lib/markdown";
import {
  buildHeadersTreeFromAST,
  type RootHeader,
  NodeHeader,
} from "@/shared/lib/markdown";
import { factoryGenUniqId } from "@/shared/lib/markdown/helpers/genUniqId";
type Levels = 1 | 2 | 3 | 4 | 5 | 6;

const generateTestData = (levels: Levels[]) => {
  const root: RootHeader = { level: 0, children: [] };
  const n = levels.length;
  let parent: NodeHeader = root as NodeHeader;
  let markdown = "";
  const genUniqId = factoryGenUniqId()
  for (let i = 0; i < n; i++) {
    const level = levels[i];
    while (parent.level >= level) {
      if (!parent.parent) break;
      parent = parent.parent as NodeHeader;
    }
    const title = "level" + level + " index" + i;
    const id = genUniqId(title);
    const node: NodeHeader = {
      level,
      children: [],
      parent,
      title,
      id,
    };
    parent.children.push(node);
    parent = node;
    markdown += "\n" + "#".repeat(level) + " " + title + "\n";
    markdown += "\nSome text here for example\n";
  }

  return { root, markdown };
};

const verifyNode = (nodeTest: NodeHeader, nodeVerify: NodeHeader) => {
  if (nodeTest.id !== nodeVerify.id || nodeTest.title !== nodeVerify.title) {
    return false;
  }
  const n = nodeTest.children.length;
  for (let i = 0; i < n; i++) {
    const childTest = nodeTest.children[i];
    const childVerify = nodeVerify.children[i];
    if (!verifyNode(childTest, childVerify)) {
      return false;
    }
  }
  return true;
};

const verifyTestData = (rootTest: RootHeader, rootVerify: RootHeader) => {
  const n = rootTest.children.length;
  for (let i = 0; i < n; i++) {
    const childTest = rootTest.children[i];
    const childVerify = rootVerify.children[i];
    if (!verifyNode(childTest, childVerify)) {
      return false;
    }
  }
  return true;
};

describe("buildHeadersTreeFromAST.test", () => {
  it("должен преобразовать ast в дерево заголовков типа RootHeader", async () => {
    const { markdown, root } = generateTestData([
      1, 2, 3, 4, 5, 2, 3, 4, 5, 3, 4, 5,
    ]);
    const ast = await transformMarkdownToAST(markdown);
    const headers = buildHeadersTreeFromAST(ast);
    expect(verifyTestData(root, headers)).toBe(true);
  });
});
