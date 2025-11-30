import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import rehypeAddIdToHead from "./rehypeAddIdToHead.js";
import {remarkImageAttributes} from "./remarkImage.js";
/**
 * Конвертор markdown to html
 * @returns
 */
export const markdownToHTML = async (markdown: string) => {
  return unified()
    .use(remarkParse)
    .use(remarkImageAttributes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeAddIdToHead)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
};
