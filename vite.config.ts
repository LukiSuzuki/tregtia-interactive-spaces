// Static SPA build for Hostinger / any static host.
// - SSR disabled via tanstackStart.spa.enabled
// - Shell prerendered to index.html so Apache/Nginx serve it for all routes
// - Nitro/Cloudflare worker build disabled
// Output: dist/client/ — upload its contents via FTP/File Manager.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
      },
    },
  },
});
