#!/usr/bin/env node
/* Tiny zero-dependency static server for local viewing.
   - Serves "/" as index.html
   - Ignores query strings for file lookup (so lesson.html?path=... works)
   - No clean-URL redirects (so the ?path= query is never dropped)
   Run: node server.mjs   (or: npm start)  ·  set PORT to change port. */
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/" || urlPath === "") urlPath = "/index.html";
    // Block path traversal, then resolve under ROOT.
    const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = join(ROOT, safe);

    let s;
    try {
      s = await stat(filePath);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>404</h1><p>Not found. Try <a href='/'>the home page</a> or <a href='/catalog.html'>the catalog</a>.</p>");
      return;
    }
    if (s.isDirectory()) filePath = join(filePath, "index.html");

    const data = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>404</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`\n  AI Architecture From Scratch — running locally`);
  console.log(`  Open:  http://localhost:${PORT}\n`);
});
