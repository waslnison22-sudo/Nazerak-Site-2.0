import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const required = ["index.html", "styles.css", "app.js", ".htaccess", "favicon.svg", "README.md", "robots.txt", "sitemap.xml", "launcher/manifest.json", "docs/MASTER_PROJECT_SPEC.md", "docs/STATUS.md", "scripts/preview-server.mjs", "scripts/preview-smoke.mjs"];
const errors = [];
for (const file of required) if (!existsSync(file)) errors.push("Missing required file: " + file);
const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("app.js", "utf8");
const htaccess = readFileSync(".htaccess", "utf8");
const manifest = readFileSync("launcher/manifest.json", "utf8");
const previewServer = readFileSync("scripts/preview-server.mjs", "utf8");
const previewSmoke = readFileSync("scripts/preview-smoke.mjs", "utf8");

for (const token of ['id="main"', 'id="primary-nav"', 'href="./styles.css?v=20261026-1"', 'src="./app.js?v=20261026-1"', 'rel="canonical"']) {
  if (!html.includes(token)) errors.push("index.html missing " + token);
}
for (const token of ["prefers-reduced-motion", ":focus-visible", "max-width:800px", "max-width:480px", "data-reveal", "feature-grid--editorial", "launcher-download-panel", "block-explorer-grid", "--accent:#ff2942", "nazerak-autumn-hero.webp"]) {
  if (!css.includes(token)) errors.push("styles.css missing responsive/accessibility marker " + token);
}
for (const token of ["function homePage", "hero--autumn", "world-section", "launcher-download-panel", "block-explorer-grid", "data-world-block", "IntersectionObserver", 'addEventListener("popstate"', "data-scroll-download"]) {
  if (!js.includes(token)) errors.push("app.js missing feature marker " + token);
}
for (const token of ["nazehard.rustix.cc", "SERVER_IP", "function cabinetPage", "function forumPage", "function membersPage", "function searchPage", 'case "cabinet"']) {
  if (js.includes(token)) errors.push("Removed feature or server address still present in app.js: " + token);
}
if (html.includes("/cabinet") || html.includes("data-route=\"/cabinet\"")) errors.push("index.html still links to cabinet");
if (/RewriteRule\s+\^forum\//i.test(htaccess)) errors.push(".htaccess still contains dynamic forum route rewrites");
try {
  const data = JSON.parse(manifest);
  if (data.schemaVersion !== 1 || data.profileVersion !== "1.0.0" || !Array.isArray(data.resources)) errors.push("launcher manifest contract mismatch");
} catch { errors.push("launcher/manifest.json is not valid JSON"); }
if (!readFileSync("sitemap.xml", "utf8").includes("https://nazerak.ru/")) errors.push("sitemap.xml missing canonical homepage URL");
for (const token of ["routePattern", "X-Content-Type-Options", "Method not allowed"]) if (!previewServer.includes(token)) errors.push("preview server missing safety marker " + token);
for (const token of ["/launcher/manifest.json", "unknown asset should return 404"]) if (!previewSmoke.includes(token)) errors.push("preview smoke test missing case " + token);
if (/service_role|sb_secret_|DISCORD_CLIENT_SECRET|client_secret\\s*=/i.test([html, css, js].join("\\n"))) errors.push("Possible secret marker found in client source");
for (const file of ["app.js", "scripts/preview-server.mjs", "scripts/preview-smoke.mjs"]) {
  const syntax = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (syntax.status !== 0) errors.push(file + " syntax check failed: " + (syntax.stderr || syntax.stdout));
}
if (errors.length) {
  console.error("NaZerak Site 2.0 QA FAILED");
  for (const error of errors) console.error(" - " + error);
  process.exit(1);
}
console.log("NaZerak Site 2.0 static QA PASSED");
console.log(" - Required files and launcher contract exist");
console.log(" - Landing navigation and download section exist");
console.log(" - No server IP or retired cabinet/forum routes in client app");
console.log(" - Responsive and reduced-motion rules exist");
console.log(" - Client source secret-marker scan passed");
console.log(" - All JavaScript syntax checks passed");
