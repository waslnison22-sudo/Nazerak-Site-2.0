import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const required = ["index.html", "styles.css", "app.js", ".htaccess", "favicon.svg", "README.md", "docs/MASTER_PROJECT_SPEC.md", "docs/STATUS.md"];
const errors = [];
for (const file of required) if (!existsSync(file)) errors.push("Missing required file: " + file);
const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("app.js", "utf8");
const routes = ["/forum", "/members", "/search", "/cabinet", "/privacy", "/forum/reports"];
for (const token of ['id="main"', 'id="primary-nav"', 'href="/styles.css"', 'src="/app.js"', 'rel="canonical"']) if (!html.includes(token)) errors.push("index.html missing " + token);
for (const token of ["prefers-reduced-motion", ":focus-visible", "max-width:800px", "max-width:480px"]) if (!css.includes(token)) errors.push("styles.css missing responsive/accessibility rule " + token);
for (const token of ["function homePage", "function forumPage", "function membersPage", "function searchPage", "function cabinetPage", "data-copy-ip", "addEventListener(\"popstate\""]) if (!js.includes(token)) errors.push("app.js missing feature marker " + token);
for (const route of routes) if (!js.includes('"' + route + '"')) errors.push("app.js missing route " + route);
if (/service_role|sb_secret_|DISCORD_CLIENT_SECRET|client_secret\s*=/i.test([html, css, js].join("\n"))) errors.push("Possible secret marker found in client source");
const syntax = spawnSync(process.execPath, ["--check", "app.js"], { encoding: "utf8" });
if (syntax.status !== 0) errors.push("Node syntax check failed: " + (syntax.stderr || syntax.stdout));
if (errors.length) {
  console.error("NaZerak Site 2.0 QA FAILED");
  for (const error of errors) console.error(" - " + error);
  process.exit(1);
}
console.log("NaZerak Site 2.0 static QA PASSED");
console.log(" - Required files exist");
console.log(" - Home/navigation/runtime entry points exist");
console.log(" - Responsive and reduced-motion rules exist");
console.log(" - Required route handlers exist");
console.log(" - Client source secret-marker scan passed");
console.log(" - app.js syntax check passed");
