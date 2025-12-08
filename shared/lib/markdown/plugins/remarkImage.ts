/**
 * парсим изображения вида
 * ![Описание](/image.jpg|400,500 "Sunset over the mountains")
 * где:
 * alt = Описание
 * url = /image.jpg
 * width = 400 custom attr
 * height = 500 custom attr
 * title = "Sunset over the mountains"
 */
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
const parseUrlWH = (url: string) => {
  if (typeof url != "string") return;
  const data = url.split("|");
  if (!data[1]) return;
  const result = data[1].split(",").map((e) => {
    const r = Number(e);
    if (isNaN(r)) return 0;
    return r;
  });
  return [data[0], ...result];
};

export function remarkImageAttributes() {
  return (tree: Root) => {
    visit(tree, "image", (node) => {
      const wh = parseUrlWH(node.url);
      if (wh) {
        node.url = wh[0] as string;

        if (!node.data) node.data = {};
        node.data.hProperties = node.data.hProperties || {};
        node.data.hProperties.width = wh[1];
        node.data.hProperties.height = wh[2];
      }
      // console.log(node);
    });
  };
}
