import { describe, it, expect } from "vitest";
import { transformMarkdownToAST } from "../shared/lib/markdown";

describe("transformMarkdownToAST", () => {
  it("должен преобразовать markdown с заголовком в AST с h1 и корректным id", async () => {
    const markdown = "# Hello World This";
    const ast = await transformMarkdownToAST(markdown);

    expect(ast).toBeDefined();
    expect(ast.type).toBe("root");
    expect(ast.children).toHaveLength(1);

    const h1Element = ast.children[0];
    expect(h1Element).toMatchObject({
      type: "element",
      tagName: "h1",
    });
    // чтобы ts знал что это h1 и не ругался
    if (
      h1Element &&
      h1Element.type === "element" &&
      h1Element.tagName === "h1"
    ) {
      expect(h1Element.properties).toBeDefined();
      expect(h1Element.properties.id).toBe("hello-world-this");
    }
  });
});
