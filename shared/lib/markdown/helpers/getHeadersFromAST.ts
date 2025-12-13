import type { Root, Element } from "hast";

// список элементов h1 - h6
const headersNamesSet = new Set(
  Array.from({ length: 6 }, (_, i) => "h" + (i + 1))
);

export type RootHeader = {
  level: number;
  children: NodeHeader[];
};

export type NodeHeader = {
  title: string;
  id: string;
  level: number;
  children: NodeHeader[];
  parent: RootHeader | NodeHeader;
};

const getText = (node: Element) => {
  const text: string[] = [];
  for (const child of node.children ?? []) {
    if (child.type != "text") {
      continue;
    }
    if (text.length && text.at(-1) != " ") {
      text.push(" ");
    }
    for (const char of child.value) {
      if (text.at(-1) == " " && char == " ") continue;
      text.push(char);
    }
  }
  if (text.at(-1) == " ") {
    text.pop();
  }
  return text.join("");
};

export const getHeadersFromAST = (tree: Root) => {
  const root: RootHeader = { level: 0, children: [] };
  let parent: NodeHeader = root as NodeHeader;
  const dfsParse = (node: Element) => {
    if (
      typeof node.tagName == "string" &&
      headersNamesSet.has(node.tagName.toLowerCase())
    ) {
      // нашли элемент h1 - 6
      // определили его уровень
      const level = +node.tagName[1];
      const title = getText(node);
      const id =
        typeof node?.properties?.id == "string" ? node.properties.id : "";
      // ищем подходящего родителя
      while (parent.level >= level) {
        parent = parent.parent as NodeHeader;
      }
      const nodeHeader = { level, title, id, children: [], parent };
      parent.children.push(nodeHeader);
      // новый header становится временным родителем
      parent = nodeHeader;
    } else {
      // обходим другие элементы в которых могут быть элементы h1-6
      for (const child of node.children ?? []) {
        if (child.type == "text") {
          continue;
        }
        dfsParse(child as unknown as Element);
      }
    }
  };
  dfsParse(tree as unknown as Element);
  return root;
};
