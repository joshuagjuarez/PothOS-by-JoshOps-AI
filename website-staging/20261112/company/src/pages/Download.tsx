import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Laptop, Monitor, Smartphone, TabletSmartphone, Terminal, type LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";
import CatMark from "@/components/CatMark";
import PothosPresenceArt from "@/components/pothos/PothosPresenceArt";
import { PERSONAL_APP_URL, POTHOS_ACTIVATION, CONNECTION_KIT, POTHOS_CONNECT_URL, POTHOS_INSTALL_URL } from "@/lib/personalApp";
import { CONTACT_PATH } from "@/lib/contact";
import { DOWNLOAD_PATH, NATIVE_RELEASES, releaseTarget, signatureStatus, RELEASE_ACCESS_NOTE, RELEASE_ISSUES_URL, RELEASE_REPO_URL, INTERNAL_BUILD_STATUS, PREVIEW_STATUS, type PlatformId, type PlatformRelease } from "@/lib/releases";

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
      {target && release ? (
        <>
          <p className="jo-dl-label">{release.stage === "developer-preview" ? PREVIEW_STATUS : "Customer-qualified release"}</p>
          <a className="jo-btn jo-btn-quiet jo-dl-action" href={target} rel="noopener">
            {ACTION[entry.channel]} <span className="jo-dl-version">v{release.version}</span>
          </a>
          {release.stage === "developer-preview" && (
            <>
              <span className="jo-badge jo-dl-signature">{signatureStatus(release)}</span>
              <p>{release.bytes.toLocaleString("en-US")} bytes · Verified {release.verifiedOn} UTC</p>
              <details className="jo-dl-checksum">
                <summary>Checksum &amp; release evidence</summary>
                <p>SHA-256: <code>{release.sha256}</code></p>
                <a className="jo-link" href={release.evidence}>Release manifest <ArrowUpRight size={16} aria-hidden="true" /></a>
              </details>
            </>
          )}
        </>
      ) : (
        <>
          <p>{INTERNAL_BUILD_STATUS}</p>
          <div className="jo-inline-links jo-dl-platform-actions">
            <Link className="jo-btn jo-btn-quiet jo-dl-action" to={CONTACT_PATH}>Join native testing</Link>
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
      <PageHead title="Download JoshOps AI" description="Your PothOS. Your ArcheAgent. Free community beta downloads for Windows and Android. Native testing for Apple and Linux. Your PothOS and ArcheAgent across your devices." path={DOWNLOAD_PATH} />
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="jo-page-hero jo-dl-hero" aria-labelledby="page-title">
          <div className="jo-entry-mark jo-dark">
            <PothosPresenceArt size={148} compact className="jo-presence-mark" />
          </div>
          <h1 id="page-title">Download JoshOps AI</h1>
          <p className="jo-page-lede">Your PothOS. Your ArcheAgent.</p>
        </section>
        <div className="jo-page-body jo-dl">
          <section className="jo-dl-section" aria-labelledby="native-title">
            <h2 id="native-title">Choose your device</h2>
            <p className="jo-dl-sub">{RELEASE_ACCESS_NOTE}</p>
            <p className="jo-dl-sub">One application, with your PothOS and ArcheAgent inside. Choose a download or join native testing. Android is a direct APK download; Windows has no Authenticode publisher signature. These community beta packages are still being tested on new users’ devices.</p>
            <ul className="jo-dl-grid">
              {NATIVE_RELEASES.map((entry) => <PlatformCard key={entry.id} entry={entry} />)}
            </ul>
          </section>
          <section className="jo-dl-section" aria-labelledby="phone-node-title">
            <h2 id="phone-node-title">Your phone is a node, too.</h2>
            <p>The native app has its own local workspace and an Apple Foundation adapter for supported iPhones and iPads. Each enrolled device has its own identity and permitted work. Local model readiness and connection to the fleet are checked separately.</p>
            <a className="jo-link" href={`${RELEASE_REPO_URL}/blob/main/docs/PHONE_NODES.md`}>Supported devices, local engines and current connection status</a>
          </section>
          <section className="jo-dl-web" aria-labelledby="web-title">
            <CatMark size={40} className="jo-dl-logo" />
            <div>
              <h2 id="web-title">Open app / Connect your AI</h2>
              <p>Open your PothOS workspace with the tools available to your account. The connected web app needs internet.</p>
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
            <p className="jo-dl-label">First beta test</p>
            <h2 id="test-title">Save a note, then read it back.</h2>
            <p>In one connected chat, ask PothOS to save a private note. Then ask for it back. Shared projects are optional. Review an offered pilot and choose Join before sending a shared message. Your private notes stay private.</p>
          </section>
          <section className="jo-dl-section jo-dl-price" aria-labelledby="price-title">
            <h2 id="price-title">Free on every device.</h2>
            <p>PothOS software is free, always, with no per-device or per-ArcheAgent fee. The connection kit is setup files and plugin source only, not the PothOS runtime source. Standalone runtime source and final runtime license terms remain unreleased.</p>
            <p className="jo-inline-links">
              <Link className="jo-link" to="/pricing">Pricing <ArrowRight size={16} aria-hidden="true" /></Link>
              <a className="jo-link" href={RELEASE_ISSUES_URL}>Support / report an issue <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="jo-link" href={RELEASE_REPO_URL}>Contribute <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a className="jo-link" href="mailto:joshua@joshops.ai?subject=JoshOps%20AI%20project%20support">Sponsor or support the project</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
