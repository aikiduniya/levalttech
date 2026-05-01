// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { copyFileSync, existsSync, renameSync } from "node:fs";
import { resolve } from "node:path";

// STATIC_SPA=1 -> static build for shared hosting (Hostinger).
//                 Use `npm run build:static`. Output: dist/client (upload contents to public_html).
// (default)    -> Lovable publish build (SSR). Use `npm run build`.
const isStatic = process.env.STATIC_SPA === "1";

// Post-build fixups for static hosting:
//  1. cloudflare adapter writes dist/server/index.js, but the prerender plugin
//     expects dist/server/server.js — alias it before prerender boots.
//  2. If any TanStack version still writes _shell.html, promote it to index.html.
const staticFixups = {
  name: "lovable-static-fixups",
  apply: "build" as const,
  closeBundle: {
    sequential: true,
    order: "post" as const,
    handler() {
      const serverDir = resolve(process.cwd(), "dist/server");
      const src = resolve(serverDir, "index.js");
      const dst = resolve(serverDir, "server.js");
      if (existsSync(src) && !existsSync(dst)) copyFileSync(src, dst);

      const clientDir = resolve(process.cwd(), "dist/client");
      const shell = resolve(clientDir, "_shell.html");
      const indexHtml = resolve(clientDir, "index.html");
      if (existsSync(shell) && !existsSync(indexHtml)) {
        renameSync(shell, indexHtml);
      }
    },
  },
};

export default defineConfig(
  isStatic
    ? {
        tanstackStart: {
          prerender: { enabled: true, crawlLinks: true },
          spa: {
            enabled: true,
            prerender: { outputPath: "/" },
          },
        },
        plugins: [staticFixups],
      }
    : {},
);
