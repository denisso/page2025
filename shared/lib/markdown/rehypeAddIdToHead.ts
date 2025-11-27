/**
 * плагин для добавления id элементам h1-h6 в html 
 * нужен длятого чтобы сделать оглавление
 */
import { visit } from "unist-util-visit";
import { Node } from "unist";
import { Element } from "hast";

interface TextNode extends Node {
  type: "text";
  value: string;
}

interface CyrillicToLatinMap {
  [key: string]: string;
}

const cyrillicToLatinMap: CyrillicToLatinMap = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

const codea: number = "a".charCodeAt(0);

function transliterate(text: string): string {
  const result: string[] = [];

  for (let char of text) {
    char = char.toLowerCase();
    const code: number = char.charCodeAt(0);
    if (code >= codea && codea + 25 >= code) {
      result.push(char);
    } else if (cyrillicToLatinMap[char]) {
      result.push(cyrillicToLatinMap[char]);
    } else if (result.at(-1) !== "-") {
      result.push("-");
    }
  }
  
  if (result.at(-1) === "-") result.pop();
  return result.join("");
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

export default function rehypeSlugTranslitAdvanced() {
  const usedIds: Set<string> = new Set();

  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName && node.tagName.match(/^h[1-6]$/)) {
        const text: string = getTextContent(node);
        console.log(text);
        
        if (text) {
          const baseId: string = transliterate(text);

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