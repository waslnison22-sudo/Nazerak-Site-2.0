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
const routes = ["/cabinet"];
for (const token of ['id="main"', 'id="primary-nav"', 'href="./styles.css?v=20261022-4"', 'src="./app.js?v=20261022-4"', 'rel="canonical"']) if (!html.includes(token)) errors.push("index.html missing " + token);
for (const token of ["prefers-reduced-motion", ":focus-visible", "max-width:800px", "max-width:480px", "hero-drift", "scroll-line", "data-reveal", "feature-grid--editorial", "install-grid", "world-drift",  "--accent:#ff2942", "font-size:17px", "install-grid", "nazerak-autumn-hero.webp"]) if (!css.includes(token)) errors.push("styles.css missing responsive/accessibility rule " + token);
for (const token of ["function homePage", "hero--autumn", "world-section", "install-grid", "IntersectionObserver", "function cabinetPage", 'addEventListener("popstate"']) if (!js.includes(token)) errors.push("app.js missing feature marker " + token);
for (const route of routes) if (!js.includes('"' + route + '"')) errors.push("app.js missing route " + route);
for (const token of ["function forumPage", "function membersPage", "function searchPage", "function privacyPage", 'case "forum"', 'case "search"', 'case "privacy"']) if (js.includes(token)) errors.push("unfinished page route still exists: " + token);
for (const token of ["forum-category\\.html", "topic\\.html", "forum-user\\.html", "RewriteRule ^forum/topic/"]) if (!htaccess.includes(token)) errors.push(".htaccess missing compatibility rule " + token);
try {
  const data = JSON.parse(manifest);
  if (data.schemaVersion !== 1 || data.profileVersion !== "1.0.0" || !Array.isArray(data.resources)) errors.push("launcher manifest contract mismatch");
} catch { errors.push("launcher/manifest.json is not valid JSON"); }
if (!readFileSync("sitemap.xml", "utf8").includes("https://nazerak.ru/")) errors.push("sitemap.xml missing canonical homepage URL");
for (const token of ["routePattern", "X-Content-Type-Options", "Method not allowed"]) if (!previewServer.includes(token)) errors.push("preview server missing safety marker " + token);
for (const token of ["/forum/topic/example-id", "/launcher/manifest.json", "unknown asset should return 404"]) if (!previewSmoke.includes(token)) errors.push("preview smoke test missing case " + token);
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
console.log(" - Home/navigation/runtime entry points exist");
console.log(" - Responsive and reduced-motion rules exist");
console.log(" - Required routes and legacy redirects exist");
console.log(" - Client source secret-marker scan passed");
console.log(" - All JavaScript syntax checks passed");
