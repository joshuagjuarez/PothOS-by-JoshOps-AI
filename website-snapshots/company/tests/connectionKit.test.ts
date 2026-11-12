// Run with: bun test tests
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { CONNECTION_KIT, POTHOS_CONNECT_URL } from "../src/lib/personalApp";
import { NATIVE_RELEASES } from "../src/lib/releases";

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

describe("connection kit", () => {
  test("canonical metadata matches the supplied artifact", () => {
    expect(CONNECTION_KIT.url).toBe("https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.8-beta.1/JoshOps-AI-connection-kit-0.3.2.zip");
    expect(CONNECTION_KIT.sha256).toBe("3e391e445507282a5714910aff716b3ba25e2a21c68605fe59f604b9dbc9ac04");
    expect(CONNECTION_KIT.bytes).toBe(30854);
    expect(CONNECTION_KIT.version).toBe("0.3.2");
    expect(CONNECTION_KIT.label).toBe("Download connection kit (ZIP, 30 KB)");
  });
  test("stays out of the native release catalogue", () => {
    expect(JSON.stringify(NATIVE_RELEASES)).not.toContain("connection-kit");
  });
  test("download page links the kit, setup guide and invitation request", () => {
    const page = read("src/pages/Download.tsx");
    expect(page).toContain("CONNECTION_KIT.url");
    expect(page).toContain("POTHOS_CONNECT_URL");
    expect(page).toContain("Request invitation");
    expect(page).toContain("CONTACT_PATH");
    expect(page).not.toContain("full PothOS app");
    expect(POTHOS_CONNECT_URL).toBe("https://pothos.joshops.ai/connect");
  });
  test("crawler files and info tools carry the same kit URL and hash", () => {
    for (const f of ["public/llms.txt", "supabase/functions/mcp/index.ts"]) {
      const t = read(f);
      expect(t).toContain(CONNECTION_KIT.url);
      expect(t).toContain(CONNECTION_KIT.sha256);
    }
    expect(read("index.html")).toContain(CONNECTION_KIT.url);
  });
});
