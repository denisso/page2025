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
    // загружаем стандартные правила генерации
    .use(remarkGfm)
    // подключаем генерацию html
    .use(remarkRehype, { allowDangerousHtml: true })
    // разрешаем на тегах только эти свойства чтобы не перегружать генерацию
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
    // используем свой плагин для добавления id в заголовки html
    .use(rehypeAddIdToHead);

  const ast = processor.parse(markdown);

  const transformedAST = await processor.run(ast);

  return transformedAST;
}
