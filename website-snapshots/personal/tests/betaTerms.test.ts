import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url));
const DOC = "public/documents/pothos-beta-terms-2026-11-05.1.md";

describe("beta participation terms", () => {
  test("served document keeps the exact reviewed bytes", () => {
    const bytes = read(DOC);
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(
      "d838dc20906d96d0852b380a3c2ccef073545888e4f22dba2186a63712773ba6",
    );
    expect(bytes.toString("utf8")).toContain("Version: beta-2026-11-05.1");
  });

  test("/terms renders from that document and records no acceptance", () => {
    const src = read("src/routes/terms.tsx").toString();
    expect(src).toContain('createFileRoute("/terms")');
    expect(src).toContain("pothos-beta-terms-2026-11-11.1.md?raw");
    expect(src).toContain('"beta-2026-11-11.1"');
    expect(src).not.toMatch(/checkbox|supabase|accept\(/i);
  });

  test("terms are linked from privacy, invite, install and connect, which keep Privacy", () => {
    for (const r of ["privacy", "invite", "install", "connect"]) {
      const src = read(`src/routes/${r}.tsx`).toString();
      expect(src).toContain('to="/terms"');
      if (r !== "privacy") expect(src).toContain('to="/privacy"');
    }
  });

  test("current terms state free software and keep earlier documents as history", () => {
    const doc = read("public/documents/pothos-beta-terms-2026-11-11.1.md").toString();
    expect(doc).toContain("Version: beta-2026-11-11.1");
    expect(doc).toContain("PothOS software is free for personal, nonprofit and ordinary business use.");
    expect(doc).not.toMatch(/US\$20|arbitration|indemnif/i);
    const src = read("src/routes/terms.tsx").toString();
    expect(src).toContain("/documents/pothos-beta-terms-2026-11-05.1.md");
  });

  test("sitemap lists /terms", () => {
    expect(read("public/sitemap.xml").toString()).toContain("<loc>https://pothos.joshops.ai/terms</loc>");
  });
});
