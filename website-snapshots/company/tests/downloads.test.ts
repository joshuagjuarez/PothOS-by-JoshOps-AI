import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { NATIVE_RELEASES, availableNativeReleases, nativeReleaseSummary, nativeReleaseCopy, releaseTarget, validateRelease, RELEASE_ACCESS_NOTE, RELEASE_DOWNLOAD_BASE, type PlatformRelease, type QualifiedRelease, type PreviewRelease } from "../src/lib/releases";
import { PRERENDER_ROUTES } from "../src/lib/prerenderRoutes";
import { FOOTER_GROUPS, PRIMARY_NAV } from "../src/lib/siteNav";
import { searchSite } from "../src/lib/siteSearch";
import { PERSONAL_APP_URL } from "../src/lib/personalApp";
import listServices from "../src/lib/mcp/tools/list-services";
import getEcosystem from "../src/lib/mcp/tools/get-ecosystem";
const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
function entry(id: PlatformRelease["id"]): PlatformRelease {
  const result = NATIVE_RELEASES.find((e) => e.id === id);
  if (!result) throw new Error(`missing ${id}`);
  return result;
}
const withRelease = (id: PlatformRelease["id"], target: string, extra: Partial<QualifiedRelease> = {}): PlatformRelease => ({
  ...entry(id), channel: id === "android" ? "google-play" : entry(id).channel,
  release: { target, version: "1.0.0", qualifiedOn: "2026-12-01", evidence: "release-review-0001", ...extra },
});
function preview(id: "windows" | "android", extra: Partial<PreviewRelease> = {}): PlatformRelease {
  const source = entry(id);
  if (source.release?.stage !== "developer-preview") throw new Error("expected preview");
  return { ...source, release: { ...source.release, ...extra } };
}

describe("reviewed native previews", () => {
  test("preserves all six platform choices", () => {
    expect(NATIVE_RELEASES.map((e) => e.id)).toEqual(["ios", "android", "windows", "linux", "mac-apple-silicon", "mac-intel"]);
  });
  test("Windows exact x64 asset, bytes, hash and unsigned status", () => {
    const windows = entry("windows");
    expect(releaseTarget(windows)).toBe(`${RELEASE_DOWNLOAD_BASE}JoshOps-AI-1.0.8-windows-x64.exe`);
    expect(windows.release).toMatchObject({ bytes: 7777933, sha256: "d0676fc5bf382355dc09fe0814ccd4af64ac2243b3ad0705ca4afb686ca03adb", signature: "unsigned", verifiedOn: "2026-11-12", version: "1.0.8" });
  });
  test("Android exact ARM64 APK, bytes, hash and verified signature", () => {
    const android = entry("android");
    expect(android.channel).toBe("installer");
    expect(releaseTarget(android)).toBe(`${RELEASE_DOWNLOAD_BASE}JoshOps-AI-1.0.8-android-arm64.apk`);
    expect(android.release).toMatchObject({ bytes: 172263845, sha256: "7429c9baff5b77d1ecb6b1eb73cebd8bb91f4062983347a918dcd668ac75d8a5", signature: "signed-verified", verifiedOn: "2026-11-12" });
    expect(releaseTarget(preview("android", { signature: "unsigned" }))).toBeNull();
  });
  test("previews never invent customer qualification", () => {
    expect(availableNativeReleases().map((e) => e.id)).toEqual(["android", "windows"]);
    for (const s of nativeReleaseSummary().filter((s) => "url" in s)) {
      expect(s.customerQualified).toBe(false);
      expect(s).not.toHaveProperty("qualifiedOn");
      expect(s.access).toBe(RELEASE_ACCESS_NOTE);
      expect(s.verifiedOn).toBe("2026-11-12");
    }
  });
  test("four internal builds exist but have no distribution link", () => {
    for (const id of ["ios", "linux", "mac-apple-silicon", "mac-intel"] as const) {
      expect(entry(id).internalBuildVerified).toBe(true);
      expect(releaseTarget(entry(id))).toBeNull();
      expect(nativeReleaseSummary().find((s) => s.platform === entry(id).name)?.status).toBe("Internal native build verified; distribution preparation pending");
    }
  });
  test("rejects foreign repositories, tags, artifacts and GitHub lookalikes", () => {
    const source = preview("windows").release?.target ?? "";
    for (const target of [source.replace("joshuagjuarez", "attacker"), source.replace("PothOS-by-JoshOps-AI", "Other"), source.replace("v1.0.8-beta.1", "v1.0.8-beta.2"), source.replace("github.com", "github.com.evil.test"), source.replace("windows-x64.exe", "windows-arm64.exe")]) {
      expect(releaseTarget(preview("windows", { target }))).toBeNull();
    }
  });
  test("rejects HTTP, credentials, ports, query redirects, fragments and IP targets", () => {
    const source = preview("windows").release?.target ?? "";
    for (const target of [source.replace("https:", "http:"), source.replace("github.com", "user:pass@github.com"), source.replace("github.com", "github.com:8443"), `${source}?redirect=https://evil.test`, `${source}#download`, source.replace("github.com", "127.0.0.1")]) {
      expect(releaseTarget(preview("windows", { target }))).toBeNull();
    }
  });
  test("rejects literal, encoded and double-encoded traversal on trusted origins", () => {
    for (const segment of ["../", "%2e%2e/", "%252e%252e%252f", "%2e%2e%5c", "..\\"]) {
      expect(releaseTarget(withRelease("windows", `https://joshops.ai/releases/${segment}pothos-1.0.0.exe`))).toBeNull();
    }
    expect(releaseTarget(preview("windows", { target: `${RELEASE_DOWNLOAD_BASE}../${"JoshOps-AI-1.0.8-windows-x64.exe"}` }))).toBeNull();
  });
  test("rejects unsafe/debug targets and platform or architecture mismatches", () => {
    for (const target of ["https://joshops.ai/internal/pothos-1.0.0.exe", "https://joshops.ai/pothos-1.0.0-debug.exe", "https://example.lovable.app/pothos-1.0.0.exe", "https://joshops.ai/pothos-1.0.0-arm64.exe", "https://joshops.ai/pothos-1.0.0.dmg"]) expect(releaseTarget(withRelease("windows", target))).toBeNull();
    expect(releaseTarget(preview("windows", { target: entry("android").release?.target }))).toBeNull();
    expect(releaseTarget({ ...preview("android"), channel: "google-play" })).toBeNull();
    expect(releaseTarget(withRelease("mac-intel", "https://joshops.ai/pothos-1.0.0-arm64.dmg"))).toBeNull();
  });
  test("keeps exact store validation and trusted company installers", () => {
    expect(validateRelease(withRelease("mac-apple-silicon", "https://joshops.ai/releases/pothos-1.0.0-arm64.dmg"))).toEqual([]);
    expect(validateRelease(withRelease("ios", "https://apps.apple.com/us/app/pothos/id1234567890"))).toEqual([]);
    expect(validateRelease(withRelease("android", "https://play.google.com/store/apps/details?id=ai.joshops.pothos"))).toEqual([]);
    expect(releaseTarget(withRelease("ios", "https://apps.apple.com/"))).toBeNull();
    expect(releaseTarget(withRelease("android", "https://play.google.com/store/apps/details"))).toBeNull();
  });
  test("requires evidence, real dates, version and preview checksum metadata", () => {
    expect(releaseTarget(preview("windows", { verifiedOn: "2026-02-30" }))).toBeNull();
    expect(releaseTarget(preview("windows", { sha256: "invalid" }))).toBeNull();
    expect(releaseTarget(preview("windows", { bytes: 0 }))).toBeNull();
    expect(releaseTarget(preview("windows", { evidence: " " }))).toBeNull();
    expect(releaseTarget(preview("windows", { version: "latest" }))).toBeNull();
    expect(releaseTarget(withRelease("windows", "https://joshops.ai/pothos-1.0.0.exe", { qualifiedOn: "soon" }))).toBeNull();
  });
});

describe("download public parity", () => {
  test("remains routed, prerendered and linked", () => {
    expect(PRERENDER_ROUTES).toContain("/download");
    expect(read("public/sitemap.xml")).toContain("<loc>https://joshops.ai/download</loc>");
    expect(PRIMARY_NAV.some((i) => i.to === "/download")).toBe(true);
    expect(FOOTER_GROUPS.flatMap((g) => g.links).some((l) => l.to === "/download")).toBe(true);
    expect(searchSite("download")[0].path).toBe("/download");
  });
  test("crawler projections exactly match catalogue status and signature evidence", () => {
    for (const f of ["index.html", "public/llms.txt"]) expect(read(f)).toContain(nativeReleaseCopy());
  });
  test("public tools report catalogue state and canonical account entry", () => {
    const services = (listServices as any).handler({}, {}).structuredContent.services[0];
    const eco = (getEcosystem as any).handler({}, {}).structuredContent;
    expect(services.downloads.webApp).toBe(PERSONAL_APP_URL);
    expect(services.downloads.nativeApps).toEqual(nativeReleaseSummary());
    expect(eco.downloads.nativeApps).toEqual(nativeReleaseSummary());
    expect(eco.downloads.access).toBe(RELEASE_ACCESS_NOTE);
    expect(eco.downloads.application).toBe("JoshOps AI");
  });
  test("preserves explicit optional shared-project consent", () => {
    expect(read("src/pages/Download.tsx")).toContain("Shared projects are optional. Review an offered pilot and choose Join before sending a shared message. Your private notes stay private.");
  });
});
