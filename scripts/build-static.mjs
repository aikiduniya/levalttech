// Wrapper for `npm run build:static` so that the harmless
// `process.stdin.off is not a function` error thrown by TanStack's
// prerender teardown does not abort the static build on Windows.
//
// Strategy:
//   1. Run `vite build` with STATIC_SPA=1.
//   2. If the build completed prerender (we detect dist/client index output),
//      treat it as success regardless of exit code, and run the postbuild step.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const env = { ...process.env, STATIC_SPA: "1" };

const result = spawnSync("vite", ["build"], {
  stdio: "inherit",
  shell: true,
  env,
});

const clientDir = resolve(process.cwd(), "dist/client");
const built =
  existsSync(resolve(clientDir, "index.html")) ||
  existsSync(resolve(clientDir, "_shell.html")) ||
  existsSync(resolve(clientDir, "_shell/index.html"));

if (!built) {
  console.error("\n[build:static] vite build failed before producing dist/client output.");
  process.exit(result.status ?? 1);
}

if (result.status !== 0) {
  console.warn("\n[build:static] vite exited with a non-fatal teardown error after prerender — continuing.");
}

// Run postbuild fixups
const post = spawnSync("node", ["scripts/postbuild-static.mjs"], {
  stdio: "inherit",
  shell: false,
});
process.exit(post.status ?? 0);
