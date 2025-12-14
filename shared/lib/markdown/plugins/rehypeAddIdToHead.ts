/**
 * плагин для добавления id элементам h1-h6 в html
 */
import { visit } from "unist-util-visit";
import type { Node } from "unist";
import type { Element } from "hast";
import { factoryGenUniqId } from "../helpers/genUniqId";
// список элементов h1 - h6
const headersNamesSet = new Set(
  Array.from({ length: 6 }, (_, i) => "h" + (i + 1))
);

interface TextNode extends Node {
  type: "text";
  value: string;
}

/**
 * получить текст из элементов типа text
 * @param node 
 * @returns 
 */
function getTextContent(node: Node): string {
  if (node.type === "text") {
    return (node as TextNode).value;
  }

  if ("children" in node && Array.isArray((node as Element).children)) {
    return (node as Element).children
      .map((child: Node) => getTextContent(child))
      .filter(Boolean)
      .join("");
  }

  return "";
}

/**
 * добавить id в AST hypertext(html)
 * @returns 
 */
export function rehypeAddIdToHead() {
  const genUniqId = factoryGenUniqId()
  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      if (
        typeof node.tagName == "string" &&
        headersNamesSet.has(node.tagName.toLowerCase())
      ) {
        const text = getTextContent(node);
        if (text) {
          const id  = genUniqId(text);
          if (!node.properties) node.properties = {};
          node.properties.id = id;
        }
      }
    });
  };
}
