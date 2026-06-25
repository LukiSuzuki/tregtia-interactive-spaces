// Static SPA build for Hostinger / any static host.
// - SSR disabled via tanstackStart.spa.enabled
// - Nitro/Cloudflare worker build disabled
// Output: plain dist/ folder with index.html — upload via FTP/File Manager.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,
  tanstackStart: {
    spa: {
      enabled: true,
    },
  },
});
