import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  test: {
    globals: true,
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        console: false,
      },
    },
    setupFiles: ["./vitest.setup.ts"],
  },
  server: {
    host: true,
    port: 3000,
  },
});
