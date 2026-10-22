import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const host = "127.0.0.1";
const port = Number(process.env.PORT || 4179);
const base = "http://" + host + ":" + port;
const child = spawn(process.execPath, ["scripts/preview-server.mjs"], {
  env: { ...process.env, HOST: host, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"]
});
let childOutput = "";
child.stdout.on("data", chunk => { childOutput += chunk.toString(); });
child.stderr.on("data", chunk => { childOutput += chunk.toString(); });
const failures = [];
try {
  let ready = false;
  for (let i = 0; i < 30; i++) {
    if (child.exitCode !== null) throw new Error("Preview server exited early: " + childOutput);
    try {
      const response = await fetch(base + "/");
      if (response.ok) { ready = true; break; }
    } catch {}
    await delay(150);
  }
  if (!ready) throw new Error("Preview server did not become ready: " + childOutput);
  const checks = [
    ["/", "text/html"],
    ["/cabinet", "text/html"],
    ["/styles.css", "text/css"],
    ["/app.js", "text/javascript"],
    ["/favicon.svg", "image/svg+xml"],
    ["/launcher/manifest.json", "application/json"],
    ["/robots.txt", "text/plain"],
    ["/sitemap.xml", "application/xml"]
  ];
  for (const [path, expectedType] of checks) {
    try {
      const response = await fetch(base + path);
      const type = response.headers.get("content-type") || "";
      const body = await response.text();
      if (response.status !== 200) failures.push(path + " returned HTTP " + response.status);
      if (!type.includes(expectedType)) failures.push(path + " content-type mismatch: " + type);
      if (!body.length) failures.push(path + " returned empty body");
    } catch (error) {
      failures.push(path + " request failed: " + error.message);
    }
  }
  const missingAsset = await fetch(base + "/missing-asset.js");
  if (missingAsset.status !== 404) failures.push("unknown asset should return 404, got " + missingAsset.status);
} finally {
  child.kill("SIGTERM");
  await Promise.race([new Promise(resolve => child.once("exit", resolve)), delay(1500)]);
}
if (failures.length) {
  console.error("NaZerak preview smoke FAILED");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("NaZerak preview smoke PASSED — 8 routes/assets plus unknown asset handling");
