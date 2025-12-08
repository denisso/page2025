/**
 * плагин для добавления id элементам h1-h6 в html 
 */
import { visit } from "unist-util-visit";
import type { Node } from "unist";
import type { Element } from "hast";
import { translite } from "../../translite";

interface TextNode extends Node {
  type: "text";
  value: string;
}

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

export function rehypeAddIdToHead() {
  const usedIds: Set<string> = new Set();

  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName && node.tagName.match(/^h[1-6]$/)) {
        const text: string = getTextContent(node);
        
        if (text) {
          const baseId: string = translite(text);

          let id: string = baseId;
          let counter: number = 1;
          while (usedIds.has(id)) {
            id = `${baseId}-${counter}`;
            counter++;
          }

          usedIds.add(id);

          if (!node.properties) node.properties = {};
          node.properties.id = id;
        }
      }
    });
  };
}