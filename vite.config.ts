// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// STATIC_SPA=1 -> static build for shared hosting (Hostinger).
//                 Use `npm run build:static`. Output: dist/client (upload contents to public_html).
// (default)    -> Lovable publish build (SSR). Use `npm run build`.
const isStatic = process.env.STATIC_SPA === "1";

export default defineConfig(
  isStatic
    ? {
        tanstackStart: {
          prerender: { enabled: false },
          spa: { enabled: true },
        },
      }
    : {},
);
