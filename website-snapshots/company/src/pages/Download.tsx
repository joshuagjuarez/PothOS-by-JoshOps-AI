import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Laptop, Monitor, Smartphone, TabletSmartphone, Terminal, type LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";
import CatMark from "@/components/CatMark";
import PothosPresenceArt from "@/components/pothos/PothosPresenceArt";
import { PERSONAL_APP_URL, POTHOS_ACTIVATION, CONNECTION_KIT, POTHOS_CONNECT_URL, POTHOS_INSTALL_URL, JOSHOPS_POSITIONING, JOSHOPS_GWS, POTHOS_BUILD_WITH_US, POTHOS_BUILD_WITH_US_URL, POTHOS_DISCUSSIONS_URL, POTHOS_SUPPORT_PROJECT_URL, POTHOS_SECURITY_URL, POTHOS_LICENSE_STATUS_URL } from "@/lib/personalApp";
import { CONTACT_PATH } from "@/lib/contact";
import { DOWNLOAD_PATH, NATIVE_RELEASES, releaseTarget, signatureStatus, RELEASE_ACCESS_NOTE, RELEASE_ISSUES_URL, RELEASE_REPO_URL, RELEASE_TAG, RELEASE_EVIDENCE, DEVICE_ACCESS_URL, NATIVE_LABEL, INTERNAL_BUILD_STATUS, PREVIEW_STATUS, type PlatformId, type PlatformRelease } from "@/lib/releases";

const ICONS: Record<PlatformId, LucideIcon> = {
  ios: TabletSmartphone, android: Smartphone, windows: Monitor,
  linux: Terminal, "mac-apple-silicon": Laptop, "mac-intel": Laptop,
};
const ACTION: Record<PlatformRelease["channel"], string> = {
  "app-store": "View in the App Store", "google-play": "View in Google Play", installer: "Download",
};

function PlatformCard({ entry }: { entry: PlatformRelease }) {
  const Icon = ICONS[entry.id];
  const target = releaseTarget(entry);
  const release = entry.release;
  return (
    <li className="jo-dl-card jo-dl-platform">
      <Icon className="jo-dl-icon" size={26} aria-hidden="true" />
      <h3>{entry.name}</h3>
      <p>{entry.source}</p>
      <p className="jo-dl-label">{target ? PREVIEW_STATUS : NATIVE_LABEL}</p>
      {target && release ? (
        <>
          <a className="jo-btn jo-btn-quiet jo-dl-action" href={target} rel="noopener">
            {ACTION[entry.channel]} <span className="jo-dl-version">v{release.version}</span>
          </a>
          {release.stage === "developer-preview" && (
            <>
              <span className="jo-badge jo-dl-signature">{signatureStatus(release)}</span>
              <p>{release.bytes.toLocaleString("en-US")} bytes · Verified {release.verifiedOn} UTC</p>
              <details className="jo-dl-checksum">
                <summary>Checksum</summary>
                <p>SHA-256: <code>{release.sha256}</code></p>
              </details>
            </>
          )}
        </>
      ) : (
        <>
          {entry.enrollment && <span className="jo-badge jo-dl-signature">{entry.enrollment.status}</span>}
          <p>{INTERNAL_BUILD_STATUS}</p>
          <div className="jo-inline-links jo-dl-platform-actions">
            <a className="jo-btn jo-btn-quiet" href={DEVICE_ACCESS_URL}>Request device access <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="jo-link" href={PERSONAL_APP_URL}>Open web app</a>
          </div>
        </>
      )}
    </li>
  );
}

export default function Download() {
  return (
    <div className="jo-site jo-page">
      <PageHead title="Download JoshOps AI" description={`${JOSHOPS_POSITIONING} ${RELEASE_ACCESS_NOTE}`} path={DOWNLOAD_PATH} />
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="jo-page-hero jo-dl-hero" aria-labelledby="page-title">
          <div className="jo-entry-mark jo-dark">
            <PothosPresenceArt size={148} compact className="jo-presence-mark" />
          </div>
          <h1 id="page-title">Download JoshOps AI</h1>
          <p className="jo-page-lede">{JOSHOPS_POSITIONING}</p>
        </section>
        <div className="jo-page-body jo-dl">
          <section className="jo-dl-section" aria-labelledby="native-title">
            <h2 id="native-title">Choose your device</h2>
            <p className="jo-dl-sub">{RELEASE_ACCESS_NOTE}</p>
            <p className="jo-dl-sub">One application. Your PothOS and ArcheAgent across your connected devices.</p>
            <ul className="jo-dl-grid">
              {NATIVE_RELEASES.map((entry) => <PlatformCard key={entry.id} entry={entry} />)}
            </ul>
          </section>
          <section className="jo-dl-web" aria-labelledby="web-title">
            <CatMark size={40} className="jo-dl-logo" />
            <div>
              <h2 id="web-title">Open app / Connect your AI</h2>
              <p>Open your PothOS workspace with the tools available to your account. The connected web app needs internet. {JOSHOPS_GWS}</p>
              <p>{POTHOS_ACTIVATION} <Link className="jo-link" to={CONTACT_PATH}>Request invitation</Link></p>
            </div>
            <div className="jo-actions jo-actions-start jo-dl-web-actions">
              <a className="jo-btn jo-btn-primary" href={PERSONAL_APP_URL}>Open app <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className="jo-btn jo-btn-quiet" href={POTHOS_INSTALL_URL}>Install web app <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className="jo-btn jo-btn-quiet" href={POTHOS_CONNECT_URL}>Connect your AI <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </section>
          <section className="jo-dl-section" aria-labelledby="kit-title">
            <p className="jo-dl-label">Connection kit · v{CONNECTION_KIT.version}</p>
            <h2 id="kit-title">Connect an AI host yourself</h2>
            <p>{CONNECTION_KIT.summary}</p>
            <p>{CONNECTION_KIT.bytes.toLocaleString("en-US")} bytes · OAuth endpoints and capabilities unchanged.</p>
            <p className="jo-inline-links">
              <a className="jo-btn jo-btn-quiet" href={CONNECTION_KIT.url}>{CONNECTION_KIT.label}</a>
              <a className="jo-link" href={POTHOS_CONNECT_URL}>Setup guide <ArrowUpRight size={16} aria-hidden="true" /></a>
            </p>
            <details className="jo-dl-checksum"><summary>Checksum</summary><p>SHA-256: <code>{CONNECTION_KIT.sha256}</code></p></details>
          </section>
          <section className="jo-dl-section" aria-labelledby="test-title">
            <p className="jo-dl-label">First workflow</p>
            <h2 id="test-title">Continue work from your AI assistant.</h2>
            <p>From a connected assistant, ask your ArcheAgent to save where a piece of work stands. Close the chat, open a new one, and ask it to recover that work. Seeing the saved state come back proves continuity across sessions. The assistant can only reach the tools and Worlds your account permits.</p>
            <p>Shared projects are optional. Review an offered pilot and choose Join before sending a shared message. Your private notes stay private.</p>
          </section>
          <section className="jo-dl-section" aria-labelledby="build-title">
            <h2 id="build-title">Build with us</h2>
            <p>{POTHOS_BUILD_WITH_US}</p>
            <p className="jo-inline-links">
              <a className="jo-btn jo-btn-quiet" href={POTHOS_BUILD_WITH_US_URL}>Build with us <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="jo-link" href={POTHOS_DISCUSSIONS_URL}>Discussions <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="jo-link" href={POTHOS_SUPPORT_PROJECT_URL}>Support the project <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="jo-link" href={RELEASE_ISSUES_URL}>Report an issue <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="jo-link" href={POTHOS_SECURITY_URL}>Report a security issue privately <ArrowUpRight size={16} aria-hidden="true" /></a>
            </p>
          </section>
          <section className="jo-dl-section jo-dl-price" aria-labelledby="price-title">
            <h2 id="price-title">Free on every device.</h2>
            <p>PothOS software is free, always, with no per-device or per-ArcheAgent fee. <Link className="jo-link" to="/pricing">Pricing <ArrowRight size={16} aria-hidden="true" /></Link></p>
            <details className="jo-dl-checksum">
              <summary>Release details</summary>
              <p>The Android APK is signed and downloads directly, not from Google Play. The Windows installer is unsigned. On iPhone and iPad, JoshOps AI runs as a participating device with a native local workspace and supported routing; it is not an always-running server and does not reach every Apple app.</p>
              <p>Release tag <code>{RELEASE_TAG}</code>. Android and Windows assets are verified by size and SHA-256; Android signature verified, Windows unsigned.</p>
              {NATIVE_RELEASES.filter((e) => e.enrollment).map((e) => <p key={e.id}>{e.name}: {e.enrollment?.evidence}</p>)}
              <p>The connection kit is setup files and plugin source, not the runtime. Standalone runtime source remains separately governed by the published licensing status.</p>
              <p className="jo-inline-links">
                <a className="jo-link" href={RELEASE_EVIDENCE}>Release manifest <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a className="jo-link" href={POTHOS_LICENSE_STATUS_URL}>Licensing status <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a className="jo-link" href={RELEASE_REPO_URL}>Repository <ArrowUpRight size={16} aria-hidden="true" /></a>
              </p>
            </details>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
