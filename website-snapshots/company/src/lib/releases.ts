// Shared native distribution catalogue. Developer-preview verification is not
// customer qualification; the page, crawler projection and info tools share it.
export type ReleaseChannel = "app-store" | "google-play" | "installer";
export type PlatformId = "ios" | "android" | "windows" | "linux" | "mac-apple-silicon" | "mac-intel";

export const RELEASE_REPO_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI";
export const RELEASE_TAG = "v1.0.8-beta.1";
export const RELEASE_EVIDENCE = `${RELEASE_REPO_URL}/releases/tag/${RELEASE_TAG}`;
export const RELEASE_DOWNLOAD_BASE = `${RELEASE_REPO_URL}/releases/download/${RELEASE_TAG}/`;
export const RELEASE_ACCESS_NOTE = "Free public downloads. Choose your device or connect your AI assistant.";
export const DEVICE_ACCESS_URL = `${RELEASE_REPO_URL}/issues/new?template=developer-participation.yml`;
export const RELEASE_ISSUES_URL = `${RELEASE_REPO_URL}/issues/new/choose`;
export const INTERNAL_BUILD_STATUS = "Native app running on enrolled devices. Request access for your device.";
export const NATIVE_LABEL = "Native application";
export const PREVIEW_STATUS = "Download available";

export interface QualifiedRelease {
  target: string;
  version: string;
  qualifiedOn: string;
  evidence: string;
  stage?: "customer-qualified";
}
export interface PreviewRelease {
  target: string;
  version: string;
  evidence: string;
  stage: "developer-preview";
  verifiedOn: string;
  bytes: number;
  sha256: string;
  signature: "signed-verified" | "unsigned";
  // A preview must not manufacture a customer qualification date.
  qualifiedOn?: never;
}
export interface PlatformRelease {
  id: PlatformId;
  name: string;
  source: string;
  channel: ReleaseChannel;
  internalBuildVerified?: boolean;
  /** Platform-specific enrolled-device status and evidence, when reviewed. */
  enrollment?: { status: string; evidence: string };
  release: QualifiedRelease | PreviewRelease | null;
}

export const NATIVE_RELEASES: readonly PlatformRelease[] = [
  { id: "ios", name: "iPhone and iPad", source: "iOS / iPadOS", channel: "app-store", internalBuildVerified: true, enrollment: { status: "Signed native app · device enrollment required", evidence: "Signed v1.0.7 (build 20261112125225) verified on three enrolled devices. Not distributed through the App Store." }, release: null },
  { id: "android", name: "Android", source: "ARM64 · Direct APK", channel: "installer", release: {
    stage: "developer-preview", target: `${RELEASE_DOWNLOAD_BASE}JoshOps-AI-1.0.8-android-arm64.apk`, version: "1.0.8",
    verifiedOn: "2026-11-12", evidence: RELEASE_EVIDENCE, bytes: 172263845,
    sha256: "7429c9baff5b77d1ecb6b1eb73cebd8bb91f4062983347a918dcd668ac75d8a5", signature: "signed-verified",
  } },
  { id: "windows", name: "Windows", source: "x64 · Installer", channel: "installer", release: {
    stage: "developer-preview", target: `${RELEASE_DOWNLOAD_BASE}JoshOps-AI-1.0.8-windows-x64.exe`, version: "1.0.8",
    verifiedOn: "2026-11-12", evidence: RELEASE_EVIDENCE, bytes: 7777933,
    sha256: "d0676fc5bf382355dc09fe0814ccd4af64ac2243b3ad0705ca4afb686ca03adb", signature: "unsigned",
  } },
  { id: "linux", name: "Linux", source: "Ubuntu / Linux x86_64", channel: "installer", internalBuildVerified: true, release: null },
  { id: "mac-apple-silicon", name: "Mac with Apple silicon", source: "macOS · Apple silicon", channel: "installer", internalBuildVerified: true, release: null },
  { id: "mac-intel", name: "Mac with Intel", source: "macOS · Intel", channel: "installer", internalBuildVerified: true, release: null },
];

const CHANNEL_FOR: Record<PlatformId, readonly ReleaseChannel[]> = {
  ios: ["app-store"], android: ["google-play", "installer"], windows: ["installer"],
  linux: ["installer"], "mac-apple-silicon": ["installer"], "mac-intel": ["installer"],
};
const INSTALLER_EXTENSIONS: Partial<Record<PlatformId, readonly string[]>> = {
  android: [".apk"], windows: [".msi", ".msix", ".exe"], linux: [".appimage", ".deb", ".rpm"],
  "mac-apple-silicon": [".dmg", ".pkg"], "mac-intel": [".dmg", ".pkg"],
};
const INSTALLER_HOST = /^(?:[a-z0-9-]+\.)*joshops\.ai$/;
const VERSION = /^\d+\.\d+\.\d+$/;
const BLOCKED = /debug|internal|staging|localhost|preview|lovable|trycloudflare|ngrok/i;
const validDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;

/** Reject raw/encoded traversal before URL normalization can conceal it. */
function unsafePath(target: string): boolean {
  let value = target;
  for (let i = 0; i < 4; i++) {
    if (value.includes("\\") || /(?:^|\/)\.{1,2}(?:\/|[?#]|$)/.test(value)) return true;
    try {
      const decoded = decodeURIComponent(value);
      if (decoded === value) return false;
      value = decoded;
    } catch { return true; }
  }
  return true;
}

/** Empty errors permits a distribution link, not a claim of customer qualification. */
export function validateRelease(entry: PlatformRelease): string[] {
  const r = entry.release;
  if (!r) return ["no reviewed distribution target"];
  const errors: string[] = [];
  const preview = r.stage === "developer-preview";
  if (!(CHANNEL_FOR[entry.id] ?? []).includes(entry.channel)) errors.push("wrong channel for platform");
  if (!VERSION.test(r.version)) errors.push("version must look like 1.2.3");
  if (!r.evidence.trim()) errors.push("release evidence missing");
  if (preview) {
    if (!validDate(r.verifiedOn)) errors.push("preview verification date missing");
    if (r.qualifiedOn !== undefined) errors.push("preview is not customer-qualified");
    if (!Number.isSafeInteger(r.bytes) || r.bytes <= 0 || !/^[a-f0-9]{64}$/.test(r.sha256)) errors.push("preview artifact metadata missing");
    if (entry.channel !== "installer" || !["windows", "android"].includes(entry.id)) errors.push("unapproved preview platform");
    if (!["signed-verified", "unsigned"].includes(r.signature)) errors.push("signature status missing");
  } else if (!validDate(r.qualifiedOn)) errors.push("qualification date missing");
  if (entry.id === "android" && entry.channel === "installer" && (!preview || r.signature !== "signed-verified")) errors.push("APK requires signed verified preview");

  let url: URL;
  try { url = new URL(r.target); } catch { return [...errors, "target is not a URL"]; }
  if (url.protocol !== "https:") errors.push("target must use https");
  if (url.username || url.password || url.port) errors.push("target must not carry credentials or a port");
  if (/^[\d.]+$/.test(url.hostname) || url.hostname.includes(":")) errors.push("target must not be an IP address");
  if (unsafePath(r.target)) errors.push("unsafe target path");
  if (BLOCKED.test(r.target)) errors.push("target looks like a debug, internal or preview build");
  if (url.hash) errors.push("target must not carry a fragment");

  if (entry.channel === "app-store") {
    if (url.hostname !== "apps.apple.com" || !/^\/(?:[a-z]{2}\/)?app\/[a-z0-9-]+\/id\d{6,}$/.test(url.pathname)) errors.push("not an exact App Store listing");
  } else if (entry.channel === "google-play") {
    if (url.hostname !== "play.google.com" || url.pathname !== "/store/apps/details" || !/^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)+$/i.test(url.searchParams.get("id") ?? "")) errors.push("not an exact Google Play listing");
  } else {
    const path = url.pathname.toLowerCase();
    const github = url.hostname === "github.com";
    // Only the two reviewed assets, in this exact repository/tag, are admitted.
    const approved = NATIVE_RELEASES.find((e) => e.id === entry.id)?.release;
    if (github ? !preview || r.target !== approved?.target || r.evidence !== RELEASE_EVIDENCE : !INSTALLER_HOST.test(url.hostname)) errors.push("installer origin or release path not approved");
    if (url.search) errors.push("installer must not carry query parameters");
    if (!(INSTALLER_EXTENSIONS[entry.id] ?? []).some((ext) => path.endsWith(ext))) errors.push("installer type does not match platform");
    if (!path.includes(r.version)) errors.push("installer URL must name its version");
    const architectures: Partial<Record<PlatformId, RegExp>> = { windows: /arm64|aarch64|x86(?!_64)|ia32/i, android: /x64|x86|armeabi/i, "mac-intel": /arm64|aarch64/i, "mac-apple-silicon": /x64|x86|intel/i };
    if (architectures[entry.id]?.test(path)) errors.push("installer architecture does not match platform");
  }
  return errors;
}
export function releaseTarget(entry: PlatformRelease): string | null {
  return validateRelease(entry).length === 0 && entry.release ? entry.release.target : null;
}
export function availableNativeReleases(): PlatformRelease[] { return NATIVE_RELEASES.filter((e) => releaseTarget(e) !== null); }
export function comingSoonNativeReleases(): PlatformRelease[] { return NATIVE_RELEASES.filter((e) => releaseTarget(e) === null); }
export function signatureStatus(release: PreviewRelease): string {
  return release.signature === "signed-verified" ? "Signed APK · signature verified" : "Unsigned · no Authenticode publisher signature";
}
export function nativeReleaseSummary() {
  return NATIVE_RELEASES.map((entry) => {
    const target = releaseTarget(entry);
    const r = entry.release;
    return {
      application: "JoshOps AI", platform: entry.name, source: entry.source,
      status: target ? r?.stage === "developer-preview" ? PREVIEW_STATUS : "Customer-qualified release" : entry.enrollment?.status ?? INTERNAL_BUILD_STATUS,
      ...(target && r ? { url: target, version: r.version, evidence: r.evidence,
        ...(r.stage === "developer-preview" ? { verifiedOn: r.verifiedOn, bytes: r.bytes, sha256: r.sha256, signature: signatureStatus(r), access: RELEASE_ACCESS_NOTE, customerQualified: false } : { customerQualified: true, qualifiedOn: r.qualifiedOn }),
      } : {}),
    };
  });
}
/** Static crawler projections are generated from this same catalogue. */
export function nativeReleaseCopy(): string {
  return `Download JoshOps AI. ${RELEASE_ACCESS_NOTE} ` + nativeReleaseSummary().map((r) =>
    `${r.platform}: ${r.status}. ${"verifiedOn" in r ? `v${r.version}; ${r.bytes} bytes; ${r.signature}; verified ${r.verifiedOn} UTC; SHA-256 ${r.sha256}; ${r.url}.` : "url" in r ? `v${r.version}; qualified ${r.qualifiedOn}; ${r.url}.` : `Request device access: ${DEVICE_ACCESS_URL}. Open web app.`}`
  ).join(" ");
}
export const DOWNLOAD_PATH = "/download";
