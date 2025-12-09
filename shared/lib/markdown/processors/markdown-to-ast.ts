/**
 * unified процессор
 * генерирует ast дерево из markdown
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { rehypeAddIdToHead } from "../plugins/rehypeAddIdToHead";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

export async function transformMarkdownToAST(markdown: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize, {
      ...defaultSchema,
      tagNames: [...(defaultSchema.tagNames || []), "section", "iframe"],
      attributes: {
        ...defaultSchema.attributes,
        "*": ["className"],
        iframe: ["width", "height", "src", "title", "allow", "allowfullscreen"],
        a: ["href", "rel", "target"],
      },
    })
    .use(rehypeAddIdToHead);

  const ast = processor.parse(markdown);

  const transformedAST = await processor.run(ast);

  return transformedAST;
}
