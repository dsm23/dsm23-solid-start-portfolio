// import eslint from "@nabla/vite-plugin-eslint";
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "netlify",
  },
  vite: {
    plugins: [
      // eslint(),
      // VitePWA({ registerType: "autoUpdate" }),
    ],
  },
});
