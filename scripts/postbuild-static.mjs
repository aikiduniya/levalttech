// Post-build fixups for `npm run build:static` (Hostinger / shared hosting).
// Runs after `vite build` to:
//   1. Promote dist/client/_shell.html -> dist/client/index.html (root SPA entry).
//   2. Remove dist/server (not needed on shared hosting).
import { existsSync, renameSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const clientDir = resolve(root, "dist/client");
const serverDir = resolve(root, "dist/server");

const shell = resolve(clientDir, "_shell.html");
const indexHtml = resolve(clientDir, "index.html");

if (existsSync(shell) && !existsSync(indexHtml)) {
  renameSync(shell, indexHtml);
  console.log("[build:static] _shell.html -> index.html");
} else if (existsSync(indexHtml)) {
  console.log("[build:static] index.html already exists, skipping rename");
} else {
  console.warn("[build:static] WARNING: no _shell.html or index.html in dist/client");
}

if (existsSync(serverDir)) {
  rmSync(serverDir, { recursive: true, force: true });
  console.log("[build:static] removed dist/server (not needed on shared hosting)");
}

console.log("[build:static] done. Upload contents of dist/client/ to public_html");
