import smileLogo from "@/assets/joshops-ai-logo.png.asset.json";
import { SUPPORT_URL, DISCUSSIONS_URL, SECURITY_REPORT_URL } from "@/lib/softwarePolicy";
import { CONNECTION_KIT } from "@/lib/mcpConnection";
import { createInstallController, installStatus, type InstallOutcome, type InstallState } from "@/lib/installPrompt";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const TITLE = "Install JoshOps AI | Your PothOS and ArcheAgent";
const DESCRIPTION = "Download JoshOps AI for your device or add the connected web app, then connect your authorized AI assistants.";
const PAGE_URL = "https://pothos.joshops.ai/install";

export const Route = createFileRoute("/install")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: InstallPage,
});

const STEPS: { title: string; steps: string[] }[] = [
  {
    title: "iPhone or iPad (Safari)",
    steps: ["Open this page in Safari.", "Tap Share.", "Tap Add to Home Screen, keep Open as Web App on if shown, then tap Add."],
  },
  {
    title: "Android (Chrome)",
    steps: ["Open this page in Chrome.", "Tap Install above if it appears, or open the ⋮ menu.", "Choose Install app or Add to Home screen."],
  },
  {
    title: "Computer (Chrome or Edge)",
    steps: ["Click Install above if it appears.", "Or click the install icon at the right of the address bar, or open the menu and choose Install JoshOps AI."],
  },
  {
    title: "Mac (Safari)",
    steps: ["On recent macOS, choose File, then Add to Dock.", "If that option isn't there, use Chrome or Edge, or keep JoshOps AI as a bookmark."],
  },
];

function InstallPage() {
  const ctl = useRef<ReturnType<typeof createInstallController> | null>(null);
  const [st, setSt] = useState<InstallState>({ available: false, installed: false, busy: false });
  const [last, setLast] = useState<InstallOutcome>(null);
  useEffect(() => {
    const c = createInstallController(window);
    ctl.current = c;
    const off = c.subscribe(setSt);
    return () => {
      off();
      c.dispose();
      ctl.current = null;
    };
  }, []);
  const install = async () => {
    setLast((await ctl.current?.install()) ?? null);
  };

  return (
    <div className="min-h-screen fog-bg">
      <main className="pw-legal">
        <Link to="/" className="pw-legal-brand">
          <img src={smileLogo.url} alt="" className="h-6 w-6" />
          JoshOps AI
        </Link>
        <span className="ws-orb" data-state="ready" aria-hidden="true" style={{ pointerEvents: "none" }}>
          <span />
        </span>
        <h1>JoshOps AI</h1>
        <p>
          Your PothOS and ArcheAgent are inside JoshOps AI. Add the connected web app to your home screen or dock.
          It needs an internet connection.
        </p>
        <div className="pw-gate-actions">
          <Link to="/app" className="pw-act-primary">
            Open JoshOps AI
          </Link>
          <Link to="/auth">Sign in</Link>
          <Link to="/connect">Connect your AI</Link>
          <a href="https://joshops.ai/download">Download for your device</a>
          {st.available && (
            <button type="button" onClick={install} disabled={st.busy}>
              {st.busy ? "Installing…" : "Install JoshOps AI"}
            </button>
          )}
        </div>
        <p role="status" aria-live="polite">
          {installStatus(st, last)}
        </p>

        {STEPS.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <ol>
              {s.steps.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
          </section>
        ))}

        <section>
          <h2>Download for your device</h2>
          <p>
            <a href="https://joshops.ai/download">Download for your device</a> from the official JoshOps AI download page,
            with public Windows x64 and signed Android ARM64 packages, plus connection tools.
          </p>
        </section>

        <section>
          <h2>Next</h2>
          <p>
            After accepting your invitation, you can <Link to="/connect">Connect your AI</Link>.
            Setting up another assistant by hand? The{" "}
            <a href={CONNECTION_KIT.href} download={CONNECTION_KIT.filename}>
              connection kit (ZIP, {CONNECTION_KIT.sizeLabel})
            </a>{" "}
            has the plugin files and example settings. It isn't an app installer or a self-contained runtime.
          </p>
          <p>
            <Link to="/privacy">Privacy and service</Link> · <Link to="/terms">Beta terms</Link> · <a href={SUPPORT_URL}>Support</a> · <a href={DISCUSSIONS_URL}>Discussions</a> · <a href={SECURITY_REPORT_URL}>Report a security issue</a> · <a href="https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI">Product repository</a>
          </p>
        </section>
      </main>
    </div>
  );
}
