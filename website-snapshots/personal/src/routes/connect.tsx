import smileLogo from "@/assets/joshops-ai-logo.png.asset.json";
import { SOFTWARE_POLICY, SUPPORT_URL, DISCUSSIONS_URL, SECURITY_REPORT_URL, DEVELOPER_PARTICIPATION_URL, PROJECT_SUPPORT_URL } from "@/lib/softwarePolicy";
import { CONNECTION_KIT, GEMINI_DEV_MODE, MUSE_CONNECTOR, FIRST_TEST_PROMPT, MCP_HOST_DOCS as HOSTS, MCP_SERVER_DISPLAY_URL } from "@/lib/mcpConnection";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const TITLE = "Connect your AI | JoshOps AI";
const DESCRIPTION = "Connect ChatGPT or Gemini CLI to your own PothOS inside JoshOps AI using authenticated MCP.";
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
          JoshOps AI
        </Link>
        <h1>Connect your AI</h1>
        <p>
          Do this after you've accepted your invitation. Use your own account. What you can reach depends on what's
          available to your account and workspace. Remote assistants need an authenticated, reachable MCP endpoint,
          not a separate marketing website for each model. Local CLI clients may use supported local transports.
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
          <h2>Gemini CLI</h2>
          <p>Verified connection path. In your terminal, add the HTTPS MCP server:</p>
          <code>gemini mcp add --transport http pothos {MCP_SERVER_DISPLAY_URL}</code>
          <ol>
            <li>Start Gemini CLI with <code>gemini</code>.</li>
            <li>Run <code>/mcp auth pothos</code> and complete OAuth with your own invited PothOS account.</li>
            <li>Run <code>/mcp</code> to check the connection and tools, then send the first test prompt below.</li>
          </ol>
          <p><a href="https://geminicli.com/docs/tools/mcp-server/">Official Gemini CLI MCP guide</a>.
            Local clients can also use supported stdio transports; follow your installed runtime's documentation.</p>
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
            <strong>Phone or tablet:</strong> add JoshOps AI from the <Link to="/install">install page</Link> and connect your
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
            Version {CONNECTION_KIT.version}. SHA-256 <code style={{ wordBreak: "break-all" }}>{CONNECTION_KIT.sha256}</code>.
          </p>
        </section>

        <section>
          <h2>More adapters</h2>
          <p>Additional integrations are contributor work, not verified connections.</p>
          <p>Gemini Apps (web): <a href={GEMINI_DEV_MODE.settingsHref}>Developer Mode</a>,
            Choose an app, then Create new. Use the server address above and your own invited account.
            Host availability and account policies apply; web and mobile recipient testing remains unverified.
            <a href={GEMINI_DEV_MODE.docsHref}> Google's guide</a>.</p>
          <p>Muse (Bodhi): <strong>{MUSE_CONNECTOR.status}</strong>.
            Muse reviews functionality, security and legal requirements before directory listing.
            PothOS submission and an approved Muse listing have not yet been verified. Follow the connection options shown in your own Muse account.
            <a href={MUSE_CONNECTOR.platformHref}> Muse platform</a>. Meta and other adapters also need live verification.</p>
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
          <a href="https://joshops.ai/download">Download for your device</a> · <Link to="/install">Install web app</Link> · <Link to="/app">Open JoshOps AI</Link> ·{" "}
          <Link to="/privacy">Privacy and service</Link> · <Link to="/terms">Beta terms</Link> · <a href={SUPPORT_URL}>Support</a> · <a href={DISCUSSIONS_URL}>Discussions</a> · <a href={SECURITY_REPORT_URL}>Report a security issue</a>
        </p>
        <p><a href={DEVELOPER_PARTICIPATION_URL}>Build with us</a> · <a href={PROJECT_SUPPORT_URL}>Support the project</a>. Optional sponsorship is unrelated to software access.
        </p>
      </main>
    </div>
  );
}
