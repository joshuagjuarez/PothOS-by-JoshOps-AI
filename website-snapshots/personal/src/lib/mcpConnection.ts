/**
 * Display-only values for the /connect guidance page. The browser never calls this address;
 * the person pastes it into their own MCP host, which signs them in through OAuth.
 */
export const MCP_SERVER_DISPLAY_URL = "https://mcp.joshops.ai/mcp";
export const FIRST_TEST_PROMPT =
  "Check my PothOS connection. Save a private note named first-idea.md: My first PothOS beta test. Read it back.";

/** Official setup guides for other remote-MCP hosts (not verified PothOS recipes). */
export const MCP_HOST_DOCS = [
  { name: "Claude", href: "https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp" },
  { name: "Claude Code", href: "https://docs.anthropic.com/en/docs/claude-code/mcp" },
  { name: "VS Code", href: "https://code.visualstudio.com/docs/copilot/chat/mcp-servers" },
  { name: "Cursor", href: "https://docs.cursor.com/context/model-context-protocol" },
];

/** Static public connection kit (plugin source, host config examples, README). Not an app installer. */
export const CONNECTION_KIT = {
  version: "0.3.2",
  href: "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.8-beta.1/JoshOps-AI-connection-kit-0.3.2.zip",
  filename: "JoshOps-AI-connection-kit-0.3.2.zip",
  sizeLabel: "30,854 bytes",
  sha256: "3e391e445507282a5714910aff716b3ba25e2a21c68605fe59f604b9dbc9ac04",
} as const;

/** Official Gemini Apps (web) developer-mode guide. Real recipient testing with PothOS is unverified. */
export const GEMINI_DEV_MODE = {
  settingsHref: "https://gemini.google.com/devmode",
  docsHref: "https://developers.google.com/connected-apps/mcp/dev-mode/usage",
} as const;

/**
 * Muse (Bodhi) directory status. PothOS has not been submitted or approved there in verified records;
 * never render a connected state or an add button for it.
 */
export const MUSE_CONNECTOR = {
  platformHref: "https://platform.muse.ai/",
  status: "Submission not yet completed",
} as const;
