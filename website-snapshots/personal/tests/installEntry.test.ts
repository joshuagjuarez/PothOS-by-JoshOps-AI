// Install lifecycle uses a mock event target (no browser). Manifest/icon/route checks read files only.
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createInstallController, installStatus } from "../src/lib/installPrompt";

const ROOT = join(import.meta.dir, "..");
function mockTarget() {
  const h = new Map<string, (e: Event) => void>();
  return {
    addEventListener: (t: string, f: any) => void h.set(t, f),
    removeEventListener: (t: string) => void h.delete(t),
    fire: (t: string, e: any = {}) => h.get(t)?.(e),
    has: (t: string) => h.has(t),
  };
}
function promptEvent(outcome: "accepted" | "dismissed") {
  let prevented = false, prompts = 0;
  return {
    e: { preventDefault: () => (prevented = true), prompt: async () => void prompts++, userChoice: Promise.resolve({ outcome }) },
    get prevented() { return prevented; },
    get prompts() { return prompts; },
  };
}

describe("install prompt lifecycle (mock event target)", () => {
  test("no button without beforeinstallprompt", async () => {
    const c = createInstallController(mockTarget() as any);
    expect(c.state.available).toBe(false);
    expect(await c.install()).toBe("unavailable");
  });
  test("prompt shows button, dismissal hides it and the event is not reused", async () => {
    const t = mockTarget(); const c = createInstallController(t as any); const p = promptEvent("dismissed");
    t.fire("beforeinstallprompt", p.e);
    expect(p.prevented).toBe(true);
    expect(c.state.available).toBe(true);
    const [a, b] = await Promise.all([c.install(), c.install()]);
    expect([a, b]).toEqual(["dismissed", "unavailable"]);
    expect(p.prompts).toBe(1);
    expect(c.state).toEqual({ available: false, installed: false, busy: false });
  });
  test("acceptance alone does not mark installed and never claims it", async () => {
    const t = mockTarget(); const c = createInstallController(t as any);
    t.fire("beforeinstallprompt", promptEvent("accepted").e);
    const r = await c.install();
    expect(r).toBe("accepted");
    expect(c.state).toEqual({ available: false, installed: false, busy: false });
    const msg = installStatus(c.state, r);
    expect(msg).toBe("Installation requested. Follow your browser\u2019s instructions.");
    expect(msg).not.toMatch(/added|installed/i);
  });
  test("appinstalled marks installed and overrides an earlier acceptance note", async () => {
    const t = mockTarget(); const c = createInstallController(t as any);
    t.fire("beforeinstallprompt", promptEvent("accepted").e);
    const r = await c.install();
    t.fire("appinstalled");
    expect(c.state).toEqual({ available: false, installed: true, busy: false });
    expect(installStatus(c.state, r)).toBe("JoshOps AI is installed on this device.");
    t.fire("beforeinstallprompt", promptEvent("accepted").e);
    expect(c.state.available).toBe(false);
    c.dispose();
    expect(t.has("beforeinstallprompt") || t.has("appinstalled")).toBe(false);
  });
  test("install page shows the derived status, not its own claim", () => {
    const i = readFileSync(join(ROOT, "src/routes/install.tsx"), "utf8");
    expect(i).toContain("{installStatus(st, last)}");
    expect(i).not.toMatch(/was added/);
  });
});

describe("installable web app files", () => {
  const m = JSON.parse(readFileSync(join(ROOT, "public/manifest.webmanifest"), "utf8"));
  test("manifest has stable id, start /app, scope /, standalone, brand colors", () => {
    expect(m).toMatchObject({ id: "/app", start_url: "/app", scope: "/", display: "standalone", background_color: "#1B1A18", theme_color: "#1B1A18" });
  });
  test("192 and 512 PNG icons and apple-touch icon exist with real sizes", () => {
    const size = (p: string) => { const b = readFileSync(join(ROOT, "public", p)); expect(b.subarray(1, 4).toString()).toBe("PNG"); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
    expect(m.icons.map((i: any) => i.sizes)).toContain("192x192");
    expect(m.icons.map((i: any) => i.sizes)).toContain("512x512");
    for (const i of m.icons) expect(size(i.src.slice(1))).toEqual(i.sizes.split("x").map(Number));
    expect(size("icons/apple-touch-icon.png")).toEqual([180, 180]);
  });
  test("root links manifest and apple icon; viewport allows zoom", () => {
    const r = readFileSync(join(ROOT, "src/routes/__root.tsx"), "utf8");
    expect(r).toContain('href: "/manifest.webmanifest"');
    expect(r).toContain('href: "/icons/apple-touch-icon.png"');
    expect(r).not.toMatch(/maximum-scale|user-scalable=no/);
  });
  test("no service worker caches anything", () => {
    expect(existsSync(join(ROOT, "public/sw.js"))).toBe(false);
    const src = (d: string): string[] => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? src(join(d, e.name)) : /\.tsx?$/.test(e.name) ? [readFileSync(join(d, e.name), "utf8")] : []);
    expect(src(join(ROOT, "src")).some((s) => /serviceWorker\.register|virtual:pwa-register/.test(s))).toBe(false);
  });
});

describe("/install and /connect routes", () => {
  const i = readFileSync(join(ROOT, "src/routes/install.tsx"), "utf8");
  const c = readFileSync(join(ROOT, "src/routes/connect.tsx"), "utf8");
  test("install page offers Open JoshOps AI via the gated /app, sign in, and honest beta copy", () => {
    expect(i).toContain('createFileRoute("/install")');
    expect(i).toContain("<h1>JoshOps AI</h1>");
    expect(i).toContain('to="/app"');
    expect(i).toContain('to="/auth"');
    expect(i).toContain("needs an internet connection");
    expect(i).toMatch(/st\.available && \(/);
  });
  test("connect page names the ChatGPT flow and has both copy buttons", () => {
    expect(c).toContain('createFileRoute("/connect")');
    expect(c).toContain("https://chatgpt.com/plugins");
    expect(c).toContain("Add custom MCP server");
    expect(c).toContain('label="server address"');
    expect(c).toContain('label="test prompt"');
  });
  test("/app stays under the authenticated gate", () => {
    expect(existsSync(join(ROOT, "src/routes/_authenticated/app.tsx"))).toBe(true);
  });
});

describe("connection kit download (static files)", () => {
  const { createHash } = require("node:crypto");
  const zip = readFileSync(join(ROOT, "public/downloads/pothos-connection-kit-0.3.0.zip"));
  const SHA = "8d2521f7d7cccc1a63ef05054da87118d0af7873632438c55f05c3442ae6d2bb";
  test("exact bytes, size and checksum file", () => {
    expect(zip.length).toBe(30331);
    expect(createHash("sha256").update(zip).digest("hex")).toBe(SHA);
    expect(readFileSync(join(ROOT, "public/downloads/pothos-connection-kit-0.3.0.zip.sha256"), "utf8")).toBe(`${SHA}  pothos-connection-kit-0.3.0.zip\n`);
  });
  test("current kit: /connect and /install link the reviewed 0.3.1 download", () => {
    const m = readFileSync(join(ROOT, "src/lib/mcpConnection.ts"), "utf8");
    expect(m).toContain("4791294ac2e14fa6f325bf4af976912c1fdd80cc93133631dd6e90af60699dd1");
    expect(m).toContain('href: "/downloads/pothos-connection-kit-0.3.1.zip"');
    for (const r of ["connect", "install"]) expect(readFileSync(join(ROOT, `src/routes/${r}.tsx`), "utf8")).toContain("href={CONNECTION_KIT.href}");
  });
});
