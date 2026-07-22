import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

const root = process.cwd();
const output = resolve(process.argv[2] ?? "public/Martin_Ramirez_Espinosa_Resume.pdf");
const port = await findAvailablePort();
const url = `http://127.0.0.1:${port}/resume/`;
const childEnvironment = { ...process.env, NO_COLOR: "1" };
for (const key of Object.keys(childEnvironment)) {
  if (key.startsWith("CODEX_")) delete childEnvironment[key];
}

await mkdir(dirname(output), { recursive: true });

async function findAvailablePort() {
  return new Promise((resolvePort, rejectPort) => {
    const server = createServer();
    server.unref();
    server.once("error", rejectPort);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close(() => rejectPort(new Error("Could not reserve a local résumé server port.")));
        return;
      }
      server.close((error) => (error ? rejectPort(error) : resolvePort(address.port)));
    });
  });
}

const astro = spawn(
  process.execPath,
  [
    resolve(root, "node_modules/astro/bin/astro.mjs"),
    "dev",
    "--ignore-lock",
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  { cwd: root, env: childEnvironment, stdio: ["ignore", "pipe", "pipe"] },
);

let serverOutput = "";
astro.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
astro.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (astro.exitCode !== null) {
      throw new Error(`Astro exited before serving the résumé.\n${serverOutput}`);
    }
    if (!serverOutput.includes(`127.0.0.1:${port}`)) {
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
      continue;
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`Timed out waiting for ${url}.\n${serverOutput}`);
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.pdf({
    path: output,
    format: "A4",
    displayHeaderFooter: false,
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
  });
  process.stdout.write(`${output}\n`);
} finally {
  await browser?.close();
  astro.kill("SIGTERM");
  await Promise.race([
    new Promise((resolveExit) => astro.once("exit", resolveExit)),
    new Promise((resolveDelay) => setTimeout(resolveDelay, 2_000)),
  ]);
}
