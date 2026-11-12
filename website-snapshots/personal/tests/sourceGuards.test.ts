// Static guards over all app source (src/, excluding generated integration and route-tree files).
// They read files only; no app or backend is run.
import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..", "src");
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return p.includes(join("src", "integrations")) ? [] : walk(p);
    return /\.(ts|tsx)$/.test(n) && !n.endsWith("routeTree.gen.ts") ? [p] : [];
  });
}
const PROXY = "lib/pothosProxy.server.ts";
const STREAM = "components/founder/projectionClient.ts";
const STREAM_URL = "wss://mcp.joshops.ai/api/pothos/v1/projection/stream";
const MASTER_HANDOFF = "lib/masterHandoff.ts";
const all = walk(ROOT).map((p) => ({ p: p.slice(ROOT.length + 1), s: readFileSync(p, "utf8") }));
// Only the server JSON proxy and the exact authenticated stream client may name the fixed native host.
const files = all.filter((f) => f.p !== PROXY);
// The Master hand-off names its own fixed /master routes; it is checked separately below.
const MCP_DISPLAY = "lib/mcpConnection.ts";
// The /connect guidance shows the MCP address for people to paste; it is checked separately below.
const appFiles = files.filter((f) => f.p !== MASTER_HANDOFF && f.p !== MCP_DISPLAY);
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

describe("no default endpoint or fake inference in app source", () => {
  test.each([
    ["raw loopback host", /127\.0\.0\.1|localhost:\d+|0\.0\.0\.0/],
    ["private LAN host", /\b(192\.168|10\.\d+\.\d+|172\.(1[6-9]|2\d|3[01]))\.\d+/],
    ["Lovable AI Gateway", /ai\.gateway\.lovable|LOVABLE_API_KEY/],
    ["MCP endpoint used as REST", /https?:\/\/mcp\.joshops\.ai|\/mcp(?=[/?#\x22\x27\x60]|$)/],
    ["user-editable backend base", /memex\.api\.base|memex\.agent\.endpoint|setMemexBase|setAgentEndpoint/],
    ["scripted local reply engine", /export function reply\(|const RULES\b|localReply/],
  ])("%s is absent", (_label, re) => {
    expect(appFiles.filter((f) => re.test(f.s)).map((f) => f.p)).toEqual([]);
  });

  test("every fetch() targets the same-origin /api/pothos/v1 contract", () => {
    const bad: string[] = [];
    for (const f of appFiles) for (const m of f.s.matchAll(/(?<![.\w])(?<!async )fetch\(\s*([^,)]+)/g)) if (!/^["'`]\/api\/pothos\/v1\//.test(m[1].trim())) bad.push(`${f.p}: ${m[1]}`);
    expect(bad).toEqual([]);
  });
});

describe("MCP connection guidance is display-only", () => {
  test("only the display module names the MCP address and nothing calls it", () => {
    const code = read(MCP_DISPLAY);
    expect([...code.matchAll(/https?:\/\/mcp\.joshops\.ai[^"'\x60\s]*/g)].map((m) => m[0])).toEqual(["https://mcp.joshops.ai/mcp"]);
    expect(code).not.toMatch(/fetch\(|XMLHttpRequest|WebSocket|token|localStorage|sessionStorage/);
    expect(all.filter((f) => f.p !== MCP_DISPLAY && /mcp\.joshops\.ai\/mcp/.test(f.s)).map((f) => f.p)).toEqual([]);
  });
  test("/connect has no Founder tools, tokens or auto-join", () => {
    const c = read("routes/connect.tsx");
    expect(c).not.toMatch(/founder|memex|access_token|Bearer|redeem|grant/i);
  });
});

describe("Master hand-off (static source checks)", () => {
  const s = read(MASTER_HANDOFF);
  test("names only the fixed Master origin and its ticket/refresh/logout/open and billing routes", () => {
    const code = s.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, "");
    const urls = [...code.matchAll(/https?:\/\/[^"'\x60\s)]+/g)].map((m) => m[0]);
    expect([...new Set(urls)].sort()).toEqual([
      "https://mcp.joshops.ai",
      "https://mcp.joshops.ai/master/account",
      "https://mcp.joshops.ai/master/billing-portal",
      "https://mcp.joshops.ai/master/checkout",
      "https://mcp.joshops.ai/master/grace/extension",
      "https://mcp.joshops.ai/master/grace/recover",
      "https://mcp.joshops.ai/master/grace/request",
      "https://mcp.joshops.ai/master/invitation/redeem",
      "https://mcp.joshops.ai/master/logout",
      "https://mcp.joshops.ai/master/owner/grace/decision",
      "https://mcp.joshops.ai/master/owner/grace/review",
      "https://mcp.joshops.ai/master/owner/invitations",
      "https://mcp.joshops.ai/master/owner/invitations/revoke",
      "https://mcp.joshops.ai/master/refresh",
      "https://mcp.joshops.ai/master/ticket",
    ]);
    expect(code).toContain('export const MASTER_OPEN_PATH = "/master/open";');
    expect(s).not.toMatch(/\/mcp\b(?!\.)|\/api\/|import\.meta\.env|process\.env|localStorage|sessionStorage|console\.|searchParams\.(set|append)/);
  });
  test("billing: bearer header only, no cookies, no storage/logs, no payment SDK, no client price or principal", () => {
    const b = read("lib/masterBilling.ts");
    const code = b.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, "");
    expect(code).not.toMatch(/https?:\/\/(?!\$\{host\})/); // routes come from masterHandoff.ts; provider hosts are only compared
    expect(code).toContain('credentials: "omit"');
    expect(code).toContain("authorization: `Bearer ${token}`");
    expect(code).not.toMatch(/localStorage|sessionStorage|console\.|searchParams|@stripe|price|quantity|customer|principal_id/);
    // Policy 2026-11-06.1: the checkout route is never called from this client.
    expect(code).not.toContain("MASTER_BILLING.checkout");
    expect(code).toContain("SOFTWARE_POLICY.newPaidActivation");
    // A paid flag from the URL or the browser is never consulted.
    expect(all.filter((f) => /paid=true|searchParams\.get\(["']paid/.test(f.s)).map((f) => f.p)).toEqual([]);
  });
  test("access: bearer header only, no cookies, no storage/logs, routes only from masterHandoff.ts", () => {
    const code = read("lib/masterAccess.ts").replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, "");
    expect(code).not.toMatch(/https?:\/\//);
    expect(code).toContain('credentials: "omit"');
    expect(code).toContain("authorization: `Bearer ${token}`");
    expect(code).not.toMatch(/localStorage|sessionStorage|console\.|searchParams|location\.|paid\s*[:=]\s*true|coverage_kind:\s*["']/);
    // The invitation is read from the fragment only, never from a query.
    expect(all.filter((f) => /searchParams\.get\(["']token|[?&]token=/.test(f.s)).map((f) => f.p)).toEqual([]);
  });
  test("no app-store or play badges or claims", () => {
    expect(all.filter((f) => /App Store|Google Play|apps\.apple\.com|play\.google\.com/.test(f.s)).map((f) => f.p)).toEqual([]);
  });
  test("the access token only travels in the Authorization header", () => {
    expect(s.match(/access_token/g)?.length).toBe(2);
    expect(s).toContain("headers.authorization = `Bearer ${token}`");
    expect(s).not.toMatch(/\?[^"'\x60]*token=|ticket=\$\{token/);
  });
  test("sign-out is browser-scoped only", () => {
    expect(s).toContain('signOut({ scope: "local" })');
    expect(all.filter((f) => /scope: ["']global["']/.test(f.s)).map((f) => f.p)).toEqual([]);
  });
  test("/app renders only the Master frame; the old World shell is not routed", () => {
    const app = read("routes/_authenticated/app.tsx");
    expect(app).toContain("component: MasterWorkspace");
    const routes = all.filter((f) => f.p.startsWith("routes/"));
    expect(routes.filter((f) => /WorkspaceGate|PersonalWorkspace|PothosWorldShell/.test(f.s)).map((f) => f.p)).toEqual([]);
    const view = read("components/MasterWorkspace.tsx");
    expect(view).toContain('title="JoshOps AI workspace"');
    expect(view).not.toMatch(/sandbox=/);
    expect(view).toContain("ctl.message(ev, frameRef.current?.contentWindow ?? null)");
  });
});

describe("server proxy targets only the fixed native routes", () => {
  const s = read(PROXY);
  test("only the five fixed https routes, never /mcp, LAN or configurable", () => {
    const upstream = s.slice(s.indexOf("const UPSTREAM ="), s.indexOf("} as const;") + 11);
    const urls = [...upstream.matchAll(/https?:\/\/[^"\x27\x60\s]+/g)].map((m) => m[0]);
    expect(urls.sort()).toEqual(
      ["bootstrap", "projection/tickets", "recovery", "turns", "workspace"].map((r) => `https://mcp.joshops.ai/api/pothos/v1/${r}`),
    );
    expect(s).not.toMatch(/["'`]\/mcp\b|127\.0\.0\.1|localhost|process\.env\[["']POTHOS|LOVABLE_API_KEY|SERVICE_ROLE/);
  });
  test("only the proxy and exact fixed WebSocket client name the native host", () => {
    expect(all.filter((f) => f.p !== PROXY && f.p !== STREAM && /joshops\.ai\/api/.test(f.s)).map((f) => f.p)).toEqual([]);
    const urls = [...read(STREAM).matchAll(/(?:https?|wss?):\/\/mcp\.joshops\.ai[^"'\`\s]*/g)].map(m => m[0]);
    expect(urls).toEqual([STREAM_URL]);
    expect(read(STREAM)).not.toMatch(/process\.env|import\.meta\.env|searchParams|ticket=/);
  });
  test("route files only delegate to the proxy", () => {
    for (const r of ["bootstrap", "workspace", "turns", "recovery", "projection/tickets"])
      expect(read(`routes/api/pothos/v1/${r}.ts`)).toContain(`proxyPothos(request, "${r}")`);
  });
  test("Check again uses recovery, never a new dispatch", () => {
    expect(read("lib/turnController.ts")).toContain("(wasRetry ? recover : ask)");
    expect(read("lib/useAccountTurns.ts")).toContain("recover: recoverAgent");
  });
});

describe("lanes use the shared account-fenced turn path", () => {
  test("Founder Hybrid uses useAccountTurns as memex and no scripted replies", () => {
    // The workbench uses the shared shell's own lane, which is the Memex default for a verified Founder.
    const s = read("components/memex/PresenceApp.tsx");
    expect(s).toContain("{ turns }: { turns: AccountTurns }");
    expect(read("components/world/PothosWorldShell.tsx")).toContain("useAccountTurns(principalId, laneAddressee(founder, laneScope)");
    expect(s).not.toMatch(/setTimeout\(\(\) => \{\s*const r = reply/);
  });
  test("Founder Focus voice goes through the same turn path, not a direct agent call", () => {
    const s = read("components/memex/FocusLane.tsx");
    expect(s).toContain("sendTurn");
    expect(s).not.toContain("askAgent");
  });
  test("Personal World shell uses useAccountTurns as pothos with the selected scope", () => {
    const shell = read("components/world/PothosWorldShell.tsx");
    expect(shell).toContain("useAccountTurns(principalId, laneAddressee(founder, laneScope), {\n    scope: laneScope,");
    expect(shell).toContain("const laneScope = inFounder ? null : scope;");
  });
  test("Live panel has no host input or network client", () => {
    const s = read("components/memex/LiveDashboard.tsx");
    expect(s).not.toMatch(/<input|fetch\(|http/);
    expect(s).toContain("Connection needed");
  });
});

describe("World shell UI rules", () => {
  const shell = read("components/world/PothosWorldShell.tsx");
  test("phone layout has a labelled menu toggle that opens an accessible drawer", () => {
    expect(shell).toContain('aria-label="Open menu"');
    expect(shell).toContain("aria-expanded={menuOpen}");
    expect(shell).toContain('variant="sheet"');
    const modal = read("components/world/Modal.tsx");
    expect(modal).toContain('aria-modal="true"');
    expect(modal).toContain('"Escape"');
    expect(modal).toContain("previous.focus()");
  });
  test("workspace data is strictly decoded before rendering", () => {
    expect(read("components/PersonalWorkspace.tsx")).toContain("parseWorldWorkspace(body, principalId)");
  });
  test("no technical or defensive prose in product UI", () => {
    const re = /selection grants no authority|verified workspace view|not reported|no decorative timers/i;
    expect(files.filter((f) => /components|routes/.test(f.p) && re.test(f.s)).map((f) => f.p)).toEqual([]);
  });
  test("no provider credential inputs in the World shell", () => {
    const world = files.filter((f) => f.p.startsWith("components/world"));
    expect(world.filter((f) => /type="password"|api[_ ]?key"|apiKey/i.test(f.s)).map((f) => f.p)).toEqual([]);
  });
});

describe("private storage (static source checks)", () => {
  test("browser storage is touched only by the vault, view preferences and the Founder theme", () => {
    const allowed = ["lib/vault/accountVault.ts", "lib/worldDrafts.ts", "components/memex/PresenceApp.tsx", "lib/oauthConsent.ts", "lib/pendingInvitation.ts"];
    const users = files.filter((f) => /\b(localStorage|sessionStorage)\b/.test(f.s.replace(/\/\/.*|\/\*[\s\S]*?\*\/|^\s*\*.*$/gm, ""))).map((f) => f.p);
    expect(users.filter((p) => !allowed.includes(p))).toEqual([]);
    // worldDrafts only writes world-ui-* preferences; PresenceApp only theme/preset.
    expect(read("lib/worldDrafts.ts")).not.toMatch(/localStorage\)?\.setItem\((?!accountKey\(principalId, `world-ui-)/);
    expect(read("components/memex/PresenceApp.tsx").match(/localStorage\.setItem\("([^"]+)"/g)).toEqual([
      'localStorage.setItem("memex-theme"',
      'localStorage.setItem("memex-preset"',
    ]);
    // oauthConsent keeps only the validated consent return path in this tab's sessionStorage.
    const oauth = read("lib/oauthConsent.ts");
    expect(oauth).not.toMatch(/localStorage/);
    expect(oauth.match(/\.setItem\(([^,]+),/g)).toEqual([".setItem(RETURN_KEY,"]);
    // pendingInvitation keeps only the one pending invitation entry in this tab's sessionStorage.
    const invite = read("lib/pendingInvitation.ts");
    expect(invite).not.toMatch(/localStorage|console\.|fetch\(/);
    expect(invite.match(/\.setItem\(([^,]+),/g)).toEqual([".setItem(KEY,"]);
  });
  test("vault code uses built-in WebCrypto only, never the network, logs or clipboard", () => {
    const vault = files.filter((f) => f.p.startsWith("lib/vault/") || f.p.startsWith("components/vault/"));
    expect(vault.length).toBeGreaterThan(3);
    expect(vault.filter((f) => /fetch\(|console\.|navigator\.clipboard|sendBeacon|XMLHttpRequest|import .* from "(?!react|lucide-react|@\/)/.test(f.s)).map((f) => f.p)).toEqual([]);
    expect(read("lib/vault/vaultCrypto.ts")).toContain("crypto.subtle");
  });
  test("passphrase fields exist only in the private storage dialog (besides sign-in pages), and nothing there is stored", () => {
    const pw = files.filter((f) => f.p.startsWith("components/") && /type="password"|type=\{useCode \? "text" : "password"\}/.test(f.s)).map((f) => f.p);
    expect(pw).toEqual(["components/vault/PrivateStorageDialog.tsx"]);
    expect(read("components/vault/PrivateStorageDialog.tsx")).not.toMatch(/localStorage|sessionStorage|savePref|setItem/);
  });
});
