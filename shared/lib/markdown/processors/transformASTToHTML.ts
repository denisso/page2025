/**
 * unified процессор
 * генерирует html из ast дерева
 */
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import type { Root } from "hast";

export function transformASTToHTML(ast: Root) {
  const processor = unified().use(rehypeStringify, {
    allowDangerousHtml: true,
  });

  const file = processor.runSync(ast) as Root;
  return processor.stringify(file);
}
