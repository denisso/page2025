/**
 * unified процессор 
 * генерирует ast дерево из markdown 
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { rehypeAddIdToHead } from "../plugins/rehypeAddIdToHead";

export async function parseMarkdownToAST(markdown: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeAddIdToHead);

  const ast = processor.parse(markdown);

  const transformedAST = await processor.run(ast);

  return transformedAST;
}
