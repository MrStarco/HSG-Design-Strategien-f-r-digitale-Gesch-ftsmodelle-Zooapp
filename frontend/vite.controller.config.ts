import { defineConfig } from "vite";

export default defineConfig({
  root: "controller",
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },
});
