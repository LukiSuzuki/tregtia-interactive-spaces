// Build config: Lovable publishes via Nitro (Cloudflare Worker).
// Every route is also prerendered to static HTML so the same build
// can be uploaded to Hostinger from dist/client/.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { properties } from "./src/lib/properties";

const staticPaths = ["/", "/properties"];
const propertyPaths = properties.map((p) => `/properties/${p.slug}`);
const apartmentPaths = properties.flatMap((p) =>
  p.apartments.map((a) => `/properties/${p.slug}/apartments/${a.id}`),
);

const allPaths = [...staticPaths, ...propertyPaths, ...apartmentPaths];

export default defineConfig({
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
