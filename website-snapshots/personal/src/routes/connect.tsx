import smileLogo from "@/assets/joshops-ai-logo.png.asset.json";
import { SOFTWARE_POLICY } from "@/lib/softwarePolicy";
import { CONNECTION_KIT, GEMINI_DEV_MODE, MUSE_CONNECTOR, FIRST_TEST_PROMPT, MCP_HOST_DOCS as HOSTS, MCP_SERVER_DISPLAY_URL } from "@/lib/mcpConnection";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const TITLE = "Connect your AI assistant | PothOS by JoshOps AI";
const DESCRIPTION = "Connect ChatGPT or another MCP host to your own PothOS account.";
const PAGE_URL = "https://pothos.joshops.ai/connect";

export const Route = createFileRoute("/connect")({
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
  component: ConnectPage,
});

function Copy({ label, value }: { label: string; value: string }) {
  const [msg, setMsg] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setMsg("Copied");
    } catch {
      setMsg("Couldn't copy. Select the text instead.");
    }
  };
  return (
    <div className="pw-plan">
      <code style={{ wordBreak: "break-word" }}>{value}</code>
      <div className="pw-gate-actions">
        <button type="button" onClick={copy} aria-label={`Copy ${label}`}>
          Copy {label}
        </button>
        <span role="status" aria-live="polite">
          {msg}
        </span>
      </div>
    </div>
  );
}


function ConnectPage() {
  return (
    <div className="min-h-screen fog-bg">
      <main className="pw-legal">
        <Link to="/" className="pw-legal-brand">
          <img src={smileLogo.url} alt="" className="h-6 w-6" />
          PothOS · by JoshOps AI
        </Link>
        <h1>Connect your AI assistant</h1>
        <p>
          Do this after you've accepted your invitation. Use your own account. What you can reach depends on what's
          available to your account and workspace.
        </p>

        <section>
          <h2>Server address</h2>
          <Copy label="server address" value={MCP_SERVER_DISPLAY_URL} />
        </section>

        <section>
          <h2>ChatGPT</h2>
          <ol>
            <li>
              Open{" "}
              <a href="https://chatgpt.com/plugins" target="_blank" rel="noreferrer">
                chatgpt.com/plugins
              </a>
              .
            </li>
            <li>Select +, then Add custom MCP server.</li>
            <li>Name it PothOS and paste the server address above.</li>
            <li>Sign in when asked, using the same account that accepted your invitation, and allow access.</li>
            <li>Install the plugin, start a new Work chat and turn PothOS on.</li>
            <li>Send the first test prompt below.</li>
          </ol>
        </section>

        <section>
          <h2>Gemini Apps (web)</h2>
          <ol>
            <li>
              In Gemini, open Settings, then{" "}
              <a href={GEMINI_DEV_MODE.settingsHref} target="_blank" rel="noreferrer">
                Gemini Apps Developer Mode
              </a>
              .
            </li>
            <li>Choose an app, then Create new.</li>
            <li>Enter the server address above.</li>
            <li>Sign in when asked, using the same account that accepted your invitation.</li>
            <li>Check that the PothOS tools appear.</li>
            <li>Send the first test prompt below to save and read back the same private note.</li>
          </ol>
          <p>
            If Gemini already shows a PothOS connected app for your account, use it and check that its tools appear.
            Not every Google account has these controls, and Google decides which tools are exposed. Connecting through
            Gemini CLI has been completed; Gemini on the web and mobile hasn't yet been confirmed with a tester.{" "}
            <a href={GEMINI_DEV_MODE.docsHref} target="_blank" rel="noreferrer">
              Google's guide
            </a>
          </p>
        </section>

        <section>
          <h2>Muse (Bodhi)</h2>
          <p>
            <strong>{MUSE_CONNECTOR.status}</strong>
          </p>
          <p>
            Muse lists connectors in its directory only after reviewing their function, security and legal
            requirements. PothOS submission and an approved Muse listing have not yet been verified. Follow the connection options shown in your own Muse account.{" "}
            <a href={MUSE_CONNECTOR.platformHref} target="_blank" rel="noreferrer">
              Muse platform
            </a>
          </p>
        </section>

        <section>
          <h2>First test prompt</h2>
          <Copy label="test prompt" value={FIRST_TEST_PROMPT} />
          <p>
            Check that the note was saved and read back, and that it's still there in a new chat. An assistant saying it
            worked isn't proof on its own.
          </p>
        </section>

        <details>
          <summary>Phone, computer or team setup</summary>
          <p>
            <strong>Phone or tablet:</strong> add PothOS from the <Link to="/install">install page</Link> and connect your
            assistant's app with your own login.
          </p>
          <p>
            <strong>One computer:</strong> connect your chosen assistant or runtime with the same server address and
            your own login.
          </p>
          <p>
            <strong>Several devices or a team:</strong> each person and device signs in with their own account and
            selected runtime. Never share one login or keys between people.
          </p>
        </details>

        <section>
          <h2>Shared pilot projects</h2>
          <p>Connecting doesn't join you to any project. If someone shares a pilot with you:</p>
          <ol>
            <li>Accept the shared pilot yourself when you receive it.</li>
            <li>Then, in a new chat, ask PothOS to show that pilot's messages or send one.</li>
          </ol>
        </section>

        <section>
          <h2>Connection kit</h2>
          <p>
            A small ZIP with the PothOS plugin files, example settings for other AI assistants, and a README. It isn't an
            app installer and doesn't contain an AI model or a self-contained runtime; it only helps your assistant connect
            to your own account.
          </p>
          <p>
            PothOS software is free ({SOFTWARE_POLICY.headline}). Your AI provider's own subscription or usage charges are
            separate.
          </p>
          <p>
            <a href={CONNECTION_KIT.href} download={CONNECTION_KIT.filename} className="pw-act-primary">
              Download connection kit (ZIP, {CONNECTION_KIT.sizeLabel})
            </a>
          </p>
          <p className="pw-act-fine">
            Version {CONNECTION_KIT.version}. SHA-256 <code style={{ wordBreak: "break-all" }}>{CONNECTION_KIT.sha256}</code> (
            <a href={CONNECTION_KIT.checksumHref} download>
              checksum file
            </a>
            ).
          </p>
        </section>

        <section>
          <h2>Compatible MCP hosts</h2>
          <p>Other hosts that support remote MCP servers with sign-in may also work. Their own guides:</p>
          <ul>
            {HOSTS.map((h) => (
              <li key={h.name}>
                <a href={h.href} target="_blank" rel="noreferrer">
                  {h.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p>
          <a href="https://joshops.ai/download">Download apps</a> · <Link to="/install">Install web app</Link> · <Link to="/app">Open JoshOps AI</Link> ·{" "}
          <Link to="/privacy">Privacy and service</Link> · <Link to="/terms">Beta terms</Link> · <a href="mailto:joshua@joshops.ai">Support</a>
        </p>
      </main>
    </div>
  );
}
