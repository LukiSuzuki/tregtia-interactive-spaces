// Static SSG build for Hostinger / any static host.
// Every route is prerendered to its own .html file at build time.
// Output: dist/client/ — upload its contents (including .htaccess) via FTP.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { properties } from "./src/lib/properties";

const staticPaths = ["/", "/properties"];
const propertyPaths = properties.map((p) => `/properties/${p.slug}`);
const apartmentPaths = properties.flatMap((p) =>
  p.apartments.map((a) => `/properties/${p.slug}/apartments/${a.id}`),
);

const allPaths = [...staticPaths, ...propertyPaths, ...apartmentPaths];

export default defineConfig({
  nitro: false,
  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
      retryCount: 2,
    },
    pages: allPaths.map((path) => ({ path, prerender: { enabled: true } })),
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
      },
    },
  },
});
