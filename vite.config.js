import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
