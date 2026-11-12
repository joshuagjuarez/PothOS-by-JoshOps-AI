# JoshOps AI connection kit

Version 0.3.2 — private release staging. The application is JoshOps AI; PothOS and your ArcheAgent are inside it. This is a connector package, not the native runtime installer.


PothOS by JoshOps AI. Start at https://pothos.joshops.ai/install.
Accept your own recipient-bound invitation and sign in with that same account
when connecting an AI host. Downloading this kit does not activate an account.

PothOS software is free for personal, nonprofit and business use. An invitation
controls hosted access; it is not a payment requirement. An account waiting
for the native free-access migration may still be unavailable. Contact support
instead of starting a new paid subscription.

Public mission and design documentation is available. A community source
release is in preparation; no standalone runtime source or native runtime
download has been released. Runtime license terms are still being reviewed.
This kit retains its existing license and does not license the private runtime.

This kit contains public connection settings, instructions and the portable
customer plugin source. It is not a native device runtime or a local model.
The current connected web beta requires internet. Your AI host subscription and
its custom-connection availability are separate from PothOS access. Keep
existing host settings; merge only the named entry rather than replacing a file.
Never paste a password or API token into these examples.

## ChatGPT

Open https://chatgpt.com/plugins, choose the plus button, then Add custom MCP
server. Name it PothOS; URL https://mcp.joshops.ai/mcp; authentication OAuth.
Sign in to your own invited PothOS account, complete the connection, install the
personal plugin and select it in a new Work chat. This is a personal custom
connection; it is not a public plugin-directory listing. Host account and
workspace policies apply. You do not upload this ZIP to make that connection.

## Codex CLI

If no PothOS entry already exists, add the remote connection:

    codex mcp add pothos --url https://mcp.joshops.ai/mcp
    codex mcp login pothos

Use codex mcp list to inspect existing entries first. For a retained entry, log
in rather than adding another. config/codex.toml is the equivalent merge snippet.
These commands use your own host's authentication flow. No credentials ship here.

## Gemini CLI

For a compatible installed Gemini CLI with remote HTTP OAuth support:

    gemini mcp add --transport http pothos https://mcp.joshops.ai/mcp

Inside the interactive CLI, use /mcp auth pothos. config/gemini.json is the
merge snippet for its mcpServers settings. Inspect gemini mcp list first.
Your provider entitlement determines which Google CLI/interface is available;
this kit does not convert or transfer subscriptions. Other Google interfaces
need their own supported custom-connection setup.

## Claude Code

For a compatible installed Claude Code:

    claude mcp add --transport http pothos https://mcp.joshops.ai/mcp

Use /mcp inside Claude Code and complete OAuth with your own invited account.
Inspect claude mcp list first. config/claude.json is a project merge example;
no --dangerously-skip-permissions or trust-all setting is required.

## First useful test

Ask: Check my PothOS connection. Save a private note named first-idea.md:
My first PothOS beta test. Read it back.

Confirm that the tool returns the actual saved text and its receipt. Then ask
for the same note in another independently connected eligible host, signed in
with the same PothOS account. Compare the actual text and hash. This tests
continuity; a successful configuration message alone does not prove it.

Shared pilots are separate: review the offered project and explicitly choose
whether to join. Only selected shared messages enter that project. A submitted
print idea is not proof that a printer started or finished. Personal notes remain
in the account's private workspace.

## Help

https://joshops.ai/support
joshua@joshops.ai

Report your host, device, what you expected, actual error and the request/receipt
ID if shown. Do not include tokens, passwords or private unrelated messages.

## Official connection references

- ChatGPT: https://developers.openai.com/plugins/deploy/connect-chatgpt
- Codex: https://learn.chatgpt.com/docs/extend/mcp?surface=cli
- Gemini CLI: https://geminicli.com/docs/tools/mcp-server/
- Claude Code: https://code.claude.com/docs/en/mcp

These are provider-supported configuration patterns. Recipient-side host/device
execution still needs testing with each tester's own account and version.
