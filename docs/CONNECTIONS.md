# Connect an assistant to JoshOps AI

Use the existing MCP server `https://mcp.joshops.ai/mcp` and sign in with **your own account**. The client session and native application resolve the same permitted account/work records; installing a connector does not copy another user's data or confer founder access.

| Surface | Setup and current standing |
| --- | --- |
| ChatGPT / Codex | Use the existing connection package and OAuth flow in a supported host. Current kit 0.3.2 is downloadable. Public directory approval is separate and is not claimed. |
| Gemini CLI | Configure the same HTTP MCP address using the CLI's supported OAuth flow. Validate that client session with the checks below before calling it connected. |
| Gemini app | Availability depends on that app's supported connector surface; the CLI's connection does not prove the Gemini app is connected. |
| Muse / Meta AI | Preserve the existing relationship and intended adapter. A fresh supported client-side connection and public submission have not been verified; no working endpoint beyond the shared MCP contract is invented. |
| JoshOps AI native apps | Use the native sign-in owner. The Windows/Android recipient candidates render the existing master App after account verification. |
| Linux / Windows / macOS developer tools | Use the same selected account and repository permissions through supported CLI/MCP adapters. Credentials remain local to the appropriate credential owner. |

## Verify one connection

1. Sign in to your account and inspect the returned permitted workspace/capabilities.
2. Save a synthetic note through an actually exposed continuity operation, recording its original request ID.
3. Read it back from another authorized surface of the same account.
4. Restart that surface and recover the same record without replaying the save.
5. Verify another independent account cannot read it.

Report the host/client version, app version, original request/receipt reference and redacted error through [Support](../SUPPORT.md). Do not post access tokens, passwords or private notes.

These are qualification steps, not claims that every provider has passed them. Provider subscriptions and capabilities remain separate from JoshOps AI accounts.

## HTTPS, domains and local connections

The hosted JoshOps AI connection uses the existing authenticated HTTPS MCP endpoint above. A host such as a cloud assistant must be able to reach the endpoint and complete its supported sign-in flow. You do not need a separate marketing website or a new domain for each AI model. Self-hosted operators provide a reachable endpoint with valid TLS and their own authentication configuration; never expose a bare model server or copy the Founder's credentials.

MCP also supports local stdio connections in compatible CLI hosts. Local transport does not require a public website. Transport choice follows the host's actual supported features. See the [MCP transport specification](https://modelcontextprotocol.io/specification/latest/basic/transports).

## Working from a connected chat

Ask your ArcheAgent to recover the existing task, inspect the source it is permitted to access, delegate a bounded change to an available worker, run the registered checks, and return the original work and result references. A new chat resumes those records rather than starting another copy of the job. Available operations come from your authenticated account and enrolled runtime; host tools and native tools are separate inventories.

Local workers handle supported work first. An operator can configure an authorized cloud worker when needed, with separate account, quota and cost controls. A general consumer connection does not inherit a maintainer's engineering permissions or unrestricted shell access. A CLI, TUI and SSH are interfaces/transports around the selected operation; they are not a universal grant.

## Google accounts and organizations

JoshOps AI is designed to work with Google Workspace. Personal and company accounts retain separate sessions and grants. Google AI subscriptions, Workspace administrator roles and Gmail/Drive API consent are distinct. Select the intended account explicitly, preserve the other account's session, and verify the identity and scopes returned by Google before using its services. Store issued credentials with the runtime's credential owner, outside source and chat. A hidden file or environment variable can retain an issued credential; it cannot create a missing provider grant.

Personal, Entrepreneur, Enterprise and Developer uses share the same application. Connect only the services needed for the selected person's or organization's work. [Contribute adapters and workflows](../CONTRIBUTING.md) or [support development](SUPPORT-THE-PROJECT.md).
