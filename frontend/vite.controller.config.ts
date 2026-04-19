import { defineConfig } from "vite";

export default defineConfig({
  root: "controller",
  // Separate cache directory prevents dep-optimizer conflicts
  // when app (5173) and controller (5174) run in parallel.
  cacheDir: "node_modules/.vite-controller",
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },
});
