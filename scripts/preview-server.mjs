import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve, sep, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const MIME = {
  ".html":"text/html; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".js":"text/javascript; charset=utf-8",
  ".mjs":"text/javascript; charset=utf-8",
  ".json":"application/json; charset=utf-8",
  ".svg":"image/svg+xml",
  ".xml":"application/xml; charset=utf-8",
  ".txt":"text/plain; charset=utf-8",
  ".webp":"image/webp",
  ".png":"image/png",
  ".jpg":"image/jpeg",
  ".jpeg":"image/jpeg",
  ".ico":"image/x-icon"
};
const routePattern = /^\/(?:forum(?:\/topic\/[^/]+|\/[^/]+)?|forum\/reports|members|search|cabinet|privacy|user\/[^/]+)\/?$/;

function resolveRequestPath(url) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(url, "http://localhost").pathname); }
  catch { return null; }
  const requested = resolve(ROOT, "." + pathname);
  if (requested !== ROOT && !requested.startsWith(ROOT + sep)) return null;
  if (existsSync(requested) && statSync(requested).isFile()) return requested;
  if (!extname(pathname) && (pathname === "/" || routePattern.test(pathname))) return resolve(ROOT, "index.html");
  return null;
}

const server = createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, {"Content-Type":"text/plain; charset=utf-8","Allow":"GET, HEAD"});
    res.end("Method not allowed");
    return;
  }
  const file = resolveRequestPath(req.url || "/");
  if (!file || !existsSync(file)) {
    res.writeHead(404, {"Content-Type":"text/plain; charset=utf-8","X-Content-Type-Options":"nosniff"});
    res.end("Not found");
    return;
  }
  const ext = extname(file).toLowerCase();
  const body = readFileSync(file);
  res.writeHead(200, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Content-Length": body.length,
    "X-Content-Type-Options":"nosniff",
    "Referrer-Policy":"strict-origin-when-cross-origin"
  });
  res.end(req.method === "HEAD" ? undefined : body);
});
server.listen(PORT, HOST, () => console.log("NaZerak preview: http://" + HOST + ":" + PORT));
server.on("error", error => { console.error("Preview server failed:", error.message); process.exitCode = 1; });
