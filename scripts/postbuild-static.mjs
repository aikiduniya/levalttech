// Post-build fixups for `npm run build:static` (Hostinger / shared hosting).
// Runs after `vite build` to:
//   1. Ensure dist/client/index.html exists (root SPA entry).
//   2. Remove dist/server (not needed on shared hosting).
import { copyFileSync, existsSync, renameSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const clientDir = resolve(root, "dist/client");
const serverDir = resolve(root, "dist/server");

const shell = resolve(clientDir, "_shell.html");
const shellIndex = resolve(clientDir, "_shell/index.html");
const indexHtml = resolve(clientDir, "index.html");

if (existsSync(indexHtml)) {
  console.log("[build:static] index.html ready");
} else if (existsSync(shell)) {
  renameSync(shell, indexHtml);
  console.log("[build:static] _shell.html -> index.html");
} else if (existsSync(shellIndex)) {
  copyFileSync(shellIndex, indexHtml);
  rmSync(resolve(clientDir, "_shell"), { recursive: true, force: true });
  console.log("[build:static] _shell/index.html -> index.html");
} else {
  console.error("[build:static] ERROR: index.html was not generated in dist/client");
  process.exit(1);
}

if (existsSync(serverDir)) {
  rmSync(serverDir, { recursive: true, force: true });
  console.log("[build:static] removed dist/server (not needed on shared hosting)");
}

console.log("[build:static] done. Upload contents of dist/client/ to public_html");
