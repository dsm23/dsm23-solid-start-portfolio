// @ts-ignore
import netlify from "solid-start-netlify";
import solid from "solid-start/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import type { VitePWAOptions } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  base: "/",
  includeAssets: ["favicon.svg"],
  registerType: "prompt",
  manifest: {
    name: "David Murdoch Solid Start Portfolio",
    short_name: "DSM Solid Start",
    theme_color: "#ffffff",
    display: "standalone",

    icons: [
      {
        src: "pwa-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};

export default defineConfig({
  plugins: [
    VitePWA({ registerType: "autoUpdate" }),
    solid({
      // adapter: netlify({ edge: true }),
      adapter: netlify(),
    }),
  ],
});
