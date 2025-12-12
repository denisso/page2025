/**
 * unified процессор 
 * генерирует html из ast дерева 
 */
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import type { Root } from "hast";

export async function transformASTToHTML(ast: Root) {
  const processor = unified().use(rehypeStringify, {
    allowDangerousHtml: true,
  });

  const file = (await processor.run(ast)) as Root;
  return processor.stringify(file);
}
