import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";
import tsconfigPaths from "vite-tsconfig-paths";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    // для отладки
    testTimeout: 0,
    projects: [
      {
        // теперь работаю пути начинающиеся с @ в import
        plugins: [tsconfigPaths()],
        test: {
          name: "node",
          environment: "node",
          include: ["__tests__/**/*.test.ts", "__tests__/**/*.spec.ts"],
          exclude: [
            "**/node_modules/**",
            "**/.next/**",
            "**/*.stories.{ts,tsx}", 
            ".storybook/**",
            "**/storybook-static/**",
          ],
          setupFiles: [],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
