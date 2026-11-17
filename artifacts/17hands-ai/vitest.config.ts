import { defineConfig } from "vitest/config";

// Kept apart from vite.config.ts: the tests cover server code and need none of the site's build plugins.
export default defineConfig({
  test: { environment: "node", include: ["server/**/*.test.ts", "src/**/*.test.ts"] },
});
