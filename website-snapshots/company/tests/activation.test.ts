// Run with: bun test tests
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
  PERSONAL_APP_URL,
  POTHOS_ACTIVATION,
  POTHOS_RELEASE_STATUS,
  POTHOS_SEPARATE_COSTS,
  POTHOS_FREE_POLICY,
  POTHOS_PRICE_HEADLINE,
  POTHOS_FIRST_RELEASE,
  POTHOS_PRIVACY_URL,
  POTHOS_INSTALL_URL,
  POTHOS_CONNECT_URL,
} from "../src/lib/personalApp";
import { FOOTER_GROUPS } from "../src/lib/siteNav";

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const PUBLIC_FILES = [
  "index.html",
  "public/llms.txt",
  "src/pages/Index.tsx",
  "src/pages/Pricing.tsx",
  "src/pages/Docs.tsx",
  "src/pages/CompanyHome.tsx",
  "src/lib/mcp/index.ts",
  "src/lib/mcp/tools/list-services.ts",
  "src/lib/mcp/tools/get-ecosystem.ts",
  "src/pages/Download.tsx",
];

describe("PothOS activation (live release)", () => {
  test("entry/privacy URLs are the published app pages", () => {
    expect(PERSONAL_APP_URL).toBe("https://pothos.joshops.ai/auth");
    expect(POTHOS_PRIVACY_URL).toBe("https://pothos.joshops.ai/privacy");
  });

  test("hosted access needs an invitation and own account, never a new paid subscription", () => {
    expect(POTHOS_ACTIVATION).toBe(
      "The hosted beta currently requires an invitation and your own account. Free-access migration is in progress. If your account still shows a payment prompt, contact support; do not start a new paid subscription.",
    );
    expect(POTHOS_SEPARATE_COSTS).toContain("never a payment requirement");
    for (const f of PUBLIC_FILES) {
      expect(read(f)).not.toMatch(/Sign in or create an account, then activate|Stripe Checkout/);
    }
  });

  test("install and connect entries are the canonical PothOS app pages", () => {
    expect(POTHOS_INSTALL_URL).toBe("https://pothos.joshops.ai/install");
    expect(POTHOS_CONNECT_URL).toBe("https://pothos.joshops.ai/connect");
  });

  test("no public surface keeps the retired paid offer", () => {
    for (const f of PUBLIC_FILES) {
      expect(read(f)).not.toMatch(/\$20|\$60|sponsorship|grace period|per ArcheAgent per month|PERSONAL_PRICE_MONTHLY_USD|Get PothOS|proposed price/i);
    }
  });

  test("free policy is distinct from release readiness, with no claimed repository or installer", () => {
    expect(POTHOS_RELEASE_STATUS).toContain("community source release is in preparation");
    expect(POTHOS_RELEASE_STATUS).toContain("Standalone runtime source and final runtime license terms remain unreleased");
    expect(POTHOS_RELEASE_STATUS).not.toMatch(/open-source/i);
    // Only the verified public repositories and documentation may be linked; no invented repository, release or download URL.
    for (const f of PUBLIC_FILES) {
      const text = read(f).replace(/https:\/\/github\.com\/joshuagjuarez\/PothOS-by-JoshOps-AI\/releases\/download\/v1\.0\.8-beta\.1\/JoshOps-AI-(?:1\.0\.8-(?:windows-x64\.exe|android-arm64\.apk)|connection-kit-0\.3\.2\.zip)/g, "").replace(/https:\/\/github\.com\/joshuagjuarez\/joshuagjuarez\/blob\/main\/docs\/pothos\/[a-z-]+\.md/gi, "")
        .replaceAll("https://github.com/joshuagjuarez/joshuagjuarez/blob/main/POTHOS.md", "")
        .replace(/https:\/\/github\.com\/joshuagjuarez\/(PothOS-by-JoshOps-AI|JoshOps-AI---Public)(\/issues(\/1|\/new\/choose)?)?/g, "");
      expect(text).not.toMatch(/github\.com|gitlab\.com/i);
    }
  });

  test("crawler files copy the free policy and release status verbatim", () => {
    for (const f of ["index.html", "public/llms.txt"]) {
      const text = read(f);
      for (const s of [POTHOS_PRICE_HEADLINE, POTHOS_FREE_POLICY, POTHOS_RELEASE_STATUS, POTHOS_SEPARATE_COSTS]) expect(text).toContain(s);
    }
    expect(read("index.html")).toContain('"price": "0"');
  });

  test("crawler files copy the activation and first-release sentences verbatim with the privacy URL", () => {
    for (const f of ["index.html", "public/llms.txt"]) {
      const text = read(f);
      expect(text).toContain(POTHOS_ACTIVATION);
      expect(text).toContain(POTHOS_FIRST_RELEASE);
      expect(text).toContain(POTHOS_PRIVACY_URL);
    }
  });

  test("the free offer claims no stock availability", () => {
    const html = read("index.html");
    expect(html).not.toContain("schema.org/InStock");
    expect(html).not.toMatch(/"availability"\s*:/);
  });

  test("company pages state free as policy, not as proven small-business access", () => {
    const text = read("src/pages/CompanyPages.tsx");
    expect(text).toContain("PothOS software is free for small businesses");
    expect(text).not.toMatch(/can already use|already use Worlds/i);
    expect(text).toContain("{POTHOS_ACTIVATION}");
  });

  test("no fake app-store badges or store links", () => {
    for (const f of PUBLIC_FILES) {
      expect(read(f)).not.toMatch(/apps\.apple\.com|play\.google\.com|download on the app store|get it on google play/i);
    }
  });

  test("footer links to the published PothOS privacy page", () => {
    const links = FOOTER_GROUPS.flatMap((g) => g.links);
    expect(links.some((l) => l.to === POTHOS_PRIVACY_URL && l.external)).toBe(true);
  });
});
