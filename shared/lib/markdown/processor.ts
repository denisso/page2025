import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import rehypeAddIdToHead from "./rehypeAddIdToHead.js";

/**
 * prepare processor
 * @returns
 */
export const markdownToHTML = async (markdown: string) => {
  return unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeAddIdToHead)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
};
