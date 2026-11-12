# PothOS browser contract

## Public release wording and connection guidance

JoshOps AI is the application; each person's PothOS and ArcheAgent are inside it. "Your local agentic computing environment" connects memory, files, tools and ongoing work across devices and authorized AI assistants. Personal, Entrepreneur, Enterprise and Developer describe uses of the same environment. Google Workspace uses each person's authorized accounts; personal Google subscriptions and company Workspace administration are distinct.

Public Windows x64 and signed Android ARM64 downloads are available through https://joshops.ai/download. Connection tools and community documentation are available at https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI. Release and terms documents retain their exact runtime license boundaries; these public links do not license the private runtime or change hosted invitation admission.

`/connect` presents ChatGPT's custom-MCP path and the verified Gemini CLI path (`gemini mcp add --transport http pothos <canonical display address>`, then `/mcp auth pothos` and `/mcp`). Remote assistants need an authenticated reachable MCP endpoint, not a marketing website per model. Local CLI clients may use supported local transports. The browser only displays the canonical MCP constant and never connects to it. Gemini Apps, Muse/Meta and additional adapters remain contributor work without verified live recipient evidence or directory approval.

Current public connection kit: https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.8-beta.1/JoshOps-AI-connection-kit-0.3.2.zip, 30,854 bytes, SHA-256 `3e391e445507282a5714910aff716b3ba25e2a21c68605fe59f604b9dbc9ac04`. It is plugin/setup material, not an app installer. Historical bundled kits remain unchanged.

Routine help uses repository [Issues](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues/new/choose) and [Discussions](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/discussions); security uses [private advisories](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/security/advisories/new). [Build with us](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues/new?template=developer-participation.yml) is a participation request, not an access grant. [Support the project](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/blob/main/docs/SUPPORT-THE-PROJECT.md) is optional and unrelated to software access. Dated legal contacts are preserved.

## Signed-in app: Master hand-off (`/app`)

`/app` shows the existing native Master app full-viewport in one iframe (`title="PothOS workspace"`, no border, no `sandbox`; `allow` limited to microphone, camera, clipboard and fullscreen for `https://mcp.joshops.ai`). There is no other signed-in shell; the earlier World shell below is not routed. Implementation: `src/lib/masterHandoff.ts` (controller) and `src/components/MasterWorkspace.tsx` (view). The upstream `frame-ancestors` restricts which page may host the frame.

| Browser request | Purpose |
| --- | --- |
| `POST https://mcp.joshops.ai/master/ticket` | `Authorization: Bearer <current access token>`, `Content-Type: application/json`, body `{}`, `credentials: include` → `{ url, expires_in, principalId }` |
| `POST https://mcp.joshops.ai/master/refresh` | Same headers/body/credentials; refreshes the same-person viewer cookie |
| `POST https://mcp.joshops.ai/master/logout` | Body `{}`, `credentials: include`, no bearer; revokes only this browser's viewer cookie |

- **Ticket check.** The frame loads a ticket only if `principalId` equals the captured session's `user.id`, `expires_in` is a positive number ≤ 300, and `url` is byte-for-byte `https://mcp.joshops.ai/master/open?ticket=<base64url 20–160>` (no other parameter, port, credentials, fragment or alternate spelling). Anything else shows "didn't open" and nothing loads.
- **Status mapping.** `403` → "isn't ready yet" (unprovisioned; no Founder access implied). `401` → sign-in not confirmed. Other non-2xx, network failure or a 15 s timeout → can't reach. Every error offers Retry connection and Sign out.
- **Tokens.** The access token is only ever sent in the `Authorization` header; it is never in a URL, logged or stored. The captured session is held in memory.
- **Account change.** Handled inside the auth event without awaiting the auth client: the frame unmounts at once, in-flight requests are aborted and their results ignored, and if a viewer had been opened its `/master/logout` is queued. The next ticket is requested only after that logout has finished, so a late logout cannot revoke the new viewer.
- **Same-account refresh.** `TOKEN_REFRESHED` and a 4-minute timer call `/master/refresh` with the new token; the frame is not re-rendered or reloaded. A `401` may request one new ticket; a second refusal without a successful refresh in between shows Reconnect instead of looping. `403` shows the unavailable state. Network errors keep the open frame.
- **Messages from the frame.** Accepted only when `event.origin === "https://mcp.joshops.ai"` and `event.source` is the mounted frame's `contentWindow`. `{type:"pothos.master.expired"}` refreshes the session and viewer; a repeat within 60 s requests one new ticket; further repeats show Reconnect. `{type:"pothos.master.signout"}` signs out.
- **Sign out.** `/master/logout` (bounded to 5 s, failure tolerated) and then `supabase.auth.signOut({ scope: "local" })` — this browser only; never global or native device logout.
- **Provisioning.** The native backend decides Founder provisioning from the immutable principal. This app never infers it from email, metadata or storage.

### Activation and billing (`/app` 402 state, `/account`)

Implementation: `src/lib/masterBilling.ts` (controller), `src/components/billing/*` (views), `src/routes/_authenticated/account.tsx`. Billing routes are on the same fixed origin, `Authorization: Bearer <current access token>` only, `credentials: omit` (no cookies), `cache: no-store`, 15 s timeout, never retried automatically.

| Browser request | Purpose |
| --- | --- |
| `GET https://mcp.joshops.ai/master/account` | → `{ok:true,value:{schema:"pothos.master-account.v1",standing:"active"\|"unpaid",ready,checkout_state:null\|"open"\|"complete"\|"expired"\|"intent_review",period_end:unixSeconds\|null,billing_available:boolean}}`; `billing_available` is required (Founder `false`; any account with an existing Stripe subscription `true`, even unpaid). Read-only; run on load of the activation state and `/account`, on "Check my account", and on return from the provider page. |
| `POST https://mcp.joshops.ai/master/checkout` | **Not called by this client since software policy 2026-11-06.1 (PothOS software is free).** Historical shape: body exactly `{"request_id":"<32 lowercase hex>"}` (no principal, customer, price or quantity) → `CHECKOUT_PENDING` + `url` (checkout page), `BILLING_ACTION_REQUIRED` (`ready:false`) + `url` (billing portal, for an existing incomplete or past-due subscription; never treated as a new purchase), or `ALREADY_ACTIVE` (`ready:true`, no URL). Only on an explicit click; the returned page opens only as the result of that click. |
| `POST https://mcp.joshops.ai/master/billing-portal` | Body `{}` → `PORTAL_READY` + `url`. Only on an explicit "Manage billing" click, and only offered when the account read says `billing_available:true` (active or unpaid), so people can fix payment details or cancel. |

- **Ticket status `402`.** Only `{ok:false,error:"PAID_CONTINUITY_NOT_CURRENT"}` (or `error.code` equal to it) shows the in-place refusal state for the signed-in account ("waiting for the free-access update", no purchase action, account identity, Check my account, Sign out, Account, Privacy and service, GitHub support). Any other `402` shows "isn't ready yet". `401`/`403` keep their existing meaning.
- **Active never comes from the browser.** An account read with `standing:"active"` and `ready:true`, or a checkout answer `ALREADY_ACTIVE`, only requests the original `/master/ticket` again. A read-only answer does this at most once per activation state; if that ticket is still refused the view says so and waits for the user's "Open PothOS". Query parameters such as `paid=true` and any local flag are ignored.
- **One checkout at a time.** A synchronous guard drops double clicks; buttons are disabled while a request is pending. Network failure, timeout, `401`, `409`/`503` (shown as "in progress or busy"), other non-2xx or an unreadable reply keep the request id in memory; the next manual click reuses it. The id is dropped after `CHECKOUT_PENDING` or `BILLING_ACTION_REQUIRED` with a valid URL, `ALREADY_ACTIVE`, an account change, or an account read with `checkout_state:"expired"` (unless a click is in flight), so the next manual click is a new request. An account read never starts a checkout.
- **Provider pages.** `CHECKOUT_PENDING` opens only `https://checkout.stripe.com/…`; the portal and `BILLING_ACTION_REQUIRED` only `https://billing.stripe.com/…`: lowercase exact host, https, no credentials, port 443 or none, no whitespace/backslash/control characters. The full URL including its fragment is opened in this tab with `location.assign`. Anything else opens nothing and shows a help message.
- **Account change / sign-out.** Clears billing state synchronously inside the auth event, aborts in-flight requests and ignores their late answers, so account A's link is never shown or opened for B and B never reuses A's request id. `/account` sign-out revokes this browser's viewer (`/master/logout`) and then signs out locally.
- **Founder.** The Founder's ticket succeeds, so `/app` opens his Master directly with no activation step. `/account` offers no purchase or Manage billing to an account with `billing_available:false` that is active (existing access, `period_end:null`), and offers no purchase until the account has been read. The browser never decides who is Founder.
- **Master frame → account page.** `{type:"pothos.master.account"}` (same origin and frame rules as above) opens `/account`. A focus-only "Account and billing" link sits above the frame for keyboard users; it is hidden otherwise so the Master stays unobscured.

### Invitation-only access (`/invite`, `/app` activation state, `/account`)

Implementation: `src/lib/masterAccess.ts` (controller), `src/lib/pendingInvitation.ts` (pending invitation across sign-in), `src/components/billing/AccessPanels.tsx`, `src/routes/invite.tsx`. Same transport rules as billing: fixed routes named only in `masterHandoff.ts`, `Authorization: Bearer` only, `credentials: omit`, `cache: no-store`, 15 s timeout, never retried automatically. Envelope `{ok:true,value}` / `{ok:false,error:CODE}`.

`GET /master/account` (still `pothos.master-account.v1`) now also requires `invited:boolean`, `coverage_kind:"paid"|"sponsored"|"grace"|"founder"|null`, `can_invite:boolean`, and `standing` may be `"invitation_required"`. An `invitation_required` account must have `ready:false`, `invited:false`, `coverage_kind:null` and `access_reason:"INVITATION_REQUIRED"|"INVITATION_REVOKED"`, or the read is treated as unreadable. When `invited`, `grace` is either `null` or the full `pothos.invited-access.v1` object (with `explanation_required_for_first_month:false`, `maximum_additional_months:1`); any other shape makes the read unreadable. Missing new fields make the read unreadable, so no purchase is offered until the server says the account is invited and unpaid.

| Browser request | When | Accepted answer |
| --- | --- | --- |
| `POST /master/invitation/redeem` `{token, request_id}` | "Accept invitation" or "Use this code", after `auth.getUser(<captured token>)` confirms the displayed account | `INVITATION_REDEEMED` with `admission.invited:true` and a valid invited `account`; then the account is re-read and the original ticket requested |
| `POST /master/grace/request` `{request_id}` | "Use my covered month" (no explanation field) | `GRACE_AWARDED` (`payment_verified:false`, `coverage_kind:"grace"`, `period_end > period_start`), `GRACE_PENDING_RECOVERY` (`automatic_retry:false`), `ALREADY_COVERED` |
| `POST /master/grace/recover` `{grace_ref}` | "Check again" on a pending covered month (ref from that answer or `grace.primary_ref`) | same as above |
| `POST /master/grace/extension` `{request_id, context}` | "Send for review", 3–500 characters | `AWAITING_FOUNDER_REVIEW` + `extension_ref` |
| `POST /master/owner/invitations` `{recipient_email, sponsored, request_id}` | `/account` owner tools, shown only when `can_invite:true` | `INVITATION_ISSUED`; `coverage` must match `sponsored`, `redeemed:false`, `company_membership_granted:false`, `invitation_url` exactly `https://pothos.joshops.ai/invite#token=<token>` |
| `POST /master/owner/invitations/revoke` `{invitation_ref, sponsorship_only, request_id}` | "Withdraw" / "Remove legacy coverage" | **Assumed** `{status:<UPPER_CODE>, invitation_ref:<same ref>}` (the shape wasn't specified) |
| `GET /master/owner/grace/review` | `/account` owner tools load and "Refresh requests" | `{requests:[{extension_ref, principal_ref, context, requested_at}]}` (≤ 200) |
| `POST /master/owner/grace/decision` `{extension_ref, approved, request_id}` | "Approve one more month" / "Decline" | grace answer when approved, `EXTENSION_DENIED` with the same `extension_ref` when declined |

- **Ticket refusal.** `402` or `403` with `error` `INVITATION_REQUIRED` / `INVITATION_REVOKED` shows the activation state (no frame mounts); the account read then shows the invitation screen. **Assumption for the backend:** the ticket refuses uninvited accounts with one of these codes; a `402 PAID_CONTINUITY_NOT_CURRENT` for an uninvited account also works because the account read decides the screen.
- **Request ids.** 32 lowercase hex, one per operation and its inputs, kept in memory. Network failure, timeout, `5xx`, `409`/`429`/`503` or an unreadable `ok:true` answer keep it, and the next manual click reuses it. A definite answer (`2xx` read, `4xx`, `ok:false`) or an account change drops it. After an uncertain owner decision only the same decision can be retried. Recover and review carry no request id.
- **Invitation token.** Read only from the `/invite` fragment `#token=<[A-Za-z0-9._~-]{16,512}>` and removed from the address bar at once; a query-string token is never read. Kept in memory and, only so a Google/Apple sign-in redirect can return to it, in this tab's `sessionStorage` (one key, 60-minute expiry, owned by the first account that signs in after it was opened). Removed on completed redemption, a definite refusal, sign-out, or any other account. After sign-in, `/auth` returns to the fixed `/invite` path when an invitation is waiting, after the OAuth consent return (which keeps priority and its exact allowlist).
- **Owner links.** Issued links live only in controller memory, are copied to the clipboard only on an explicit "Copy link" click, and are cleared on account change. Nothing is emailed. `can_invite` only decides whether the tools are shown; the server checks verified Founder identity on every owner call.

## Earlier World shell routes (not routed from `/app`)

The browser binds only to authenticated, same-origin routes. This app serves them as thin server proxies (`src/routes/api/pothos/v1/*.ts` → `src/lib/pothosProxy.server.ts`) to ONE fixed native route each:

| Same-origin route | Fixed native target |
| --- | --- |
| `GET /api/pothos/v1/bootstrap` | `https://mcp.joshops.ai/api/pothos/v1/bootstrap` |
| `GET /api/pothos/v1/workspace` | `https://mcp.joshops.ai/api/pothos/v1/workspace` |
| `POST /api/pothos/v1/turns` | `https://mcp.joshops.ai/api/pothos/v1/turns` |
| `POST /api/pothos/v1/recovery` | `https://mcp.joshops.ai/api/pothos/v1/recovery` |

The native routes own every decision (token, current session, membership, capability, tenant, routing). The browser never reports success while they are unbound.

### Proxy rules

- Requires `Authorization: Bearer <Supabase access token>`; the proxy confirms it with the project auth server (`auth.getUser`) before anything is forwarded. Otherwise `401`, nothing forwarded.
- Forwards only that bearer token, `accept`, and for POST `content-type: application/json` plus the exact `Idempotency-Key`. Cookies, user/role headers, service keys and any other header are never forwarded. Tokens are never logged.
- POST bodies: ≤ 16 KB, strict schema (unknown fields rejected), `Idempotency-Key` must equal `requestId`, `worldId`/`actorId` both or neither, `text` 1–8000 chars (turns only; recovery has no text). Invalid → `400`, nothing forwarded.
- One attempt, never retried by the proxy. Redirects refused (`502`). Timeouts: bootstrap 10 s, workspace 15 s, turns 25 s, recovery 15 s → `504`. Network failure → `504`. Response bodies bounded (64 KB / 1 MB / 256 KB / 256 KB) → `502` if exceeded or a 2xx isn't JSON.
- Upstream status is preserved exactly: `200`, `202` pending, `401/403` refused, `404`, `409` conflict/held, `429`, `5xx`. Responses are `cache-control: no-store`.
- No Lovable AI or any inference runs in this app.

### Session check RPC (for the native verifier)

`public.pothos_current_session()` — no arguments, `authenticated` only (revoked from `PUBLIC`, `anon`, `service_role`). A security-invoker wrapper over `private.current_session_status()` (security definer, `search_path = ''`). Called with the user's own bearer token, it reports only that caller's own session:

```json
{ "active": true, "user_id": "uuid", "session_id": "uuid|null", "user_disabled": false, "session_not_after": "timestamptz|null" }
```

`session_id` is `auth.jwt()->>'session_id'`; `active` is true only when that session row exists for `auth.uid()` in `auth.sessions`, is before `not_after` (if set), and the user in `auth.users` exists with no `deleted_at` and no current `banned_until`. A token without `session_id` reports `active: false`.

## `GET /api/pothos/v1/bootstrap`

- Requires the current Supabase bearer session.
- Returns the authenticated `principalId` plus account-scoped capability strings.
- Every signed-in account enters the same World shell. Only the exact server-issued capability `founder.master`, for the same `principalId`, adds Founder access inside it:
  - the default account conversation becomes Memex (`addressee: "memex"`, using the existing Memex draft/thread/pending/history slots) instead of PothOS (`addressee: "pothos"`);
  - a "Founder workbench" destination appears, which hosts the existing `PresenceApp` (Hybrid/Focus, prototype drawers, Live). Talk, Worlds and the other destinations stay one click away.
- Explicit World/ArcheAgent targets are unchanged for both kinds of account: they keep `addressee: "pothos"` plus `worldId`/`actorId`, and their existing slots.
- An unavailable (404, 401/403, 5xx, network) or mismatched response grants nothing. The signed-in consumer shell stays usable with account-scoped local drafts, local history and a Connect action, and no Founder access, server World data or node permissions. This is never a Founder fallback.
- Access is exactly the latest check. The browser re-checks on token refresh, on returning to the tab and on Connect; any check without the capability removes the workbench and the Memex default immediately, without remounting the shell or touching drafts or waiting requests. Stored Memex slots stay in the account's own storage and are not rendered.
- Responses must be non-cacheable. Capabilities must come from verified server membership, never from email, metadata, browser storage or a UI control.

## `GET /api/pothos/v1/workspace`

- Requires the same bearer session.
- Returns the matching `principalId` plus observed account counts for `memory`, `files` and `connections`.
- The UI shows loading until it returns, and an offline shell (local drafts + Connect) on failure. Earlier data is cleared, never shown as current.
- A count is shown only when the authenticated response reports it. A missing count stays unknown, never zero.

### Optional World data (same response)

Decoded by `parseWorldWorkspace` (`src/lib/worldPayload.ts`). Every list is bounded, every ID must match `^[A-Za-z0-9_-]{1,64}$`, strings are length-bounded and control-character free, times must parse. Invalid records are dropped, never rendered. Any record carrying a `principalId` other than the caller's is dropped.

| Field | Shape | Rules |
| --- | --- | --- |
| `worlds[]` | `{ id, name, summary?, updatedAt?, pinned?, agents[], projects[] }` | max 50. A World needs at least one ArcheAgent to be selectable. |
| `worlds[].agents[]` | `{ id, name, role?, duties?[], talk }` | `talk: "available"` enables scoped Talk; anything else means not set up. |
| `worlds[].projects[]` | `{ id, name, summary?, status?, updatedAt?, pinned? }` | `status` ∈ active, planning, paused, completed. |
| `runs[]` | `{ id, worldId, actorId, projectId?, title, status, updatedAt?, events[] }` | Must reference a listed World and one of its ArcheAgents. `status` ∈ queued, running, waiting, completed, failed, cancelled. |
| `runs[].events[]` | `{ kind, principalId, worldId, actorId, runId, text, at }` | Public activity only: `kind` ∈ progress, tool_summary, artifact, answer_delta. Must carry the exact principal/World/ArcheAgent/run. Hidden reasoning or system payloads are dropped. |
| `memory[]` | `{ id, worldId, projectId?, kind, title, detail?, source?, sourceRef?, passage?, eventAt?, capturedAt?, at?, corrects?[] }` | `kind` ∈ timeline, source, correction. At least one valid time. See "Memory projection" below. |
| `connections[]` | `{ id, kind, name, state, detail? }` | `kind` ∈ provider, plugin, skill, device; `state` ∈ connected, available, needs_setup, paused, offline. The UI never activates a paused provider or asks for credentials. |

### Memory projection

This is a view adapter over records owned by the existing memory owner. It does not define, extend or replace TripleSemantic/MRLS semantics, store memory, or derive any field.

| Field | Meaning in the view | Bounds |
| --- | --- | --- |
| `eventAt` | When the remembered thing happened. Shown as "Happened". | ISO time, ≤ 40 chars |
| `capturedAt` | When it was captured into memory. Shown as "Captured". | ISO time, ≤ 40 chars |
| `at` | Legacy generic record date. Shown as "Record date"; never read as an event or capture time. | ISO time, ≤ 40 chars |
| `source` | Source label. | ≤ 200 chars |
| `sourceRef` | Source reference, shown as plain text (never followed as a link). | ≤ 300 chars |
| `passage` | Quoted passage from the source. | ≤ 1200 chars |
| `corrects[]` | Earlier record IDs this record corrects, nearest first. | ≤ 20 valid IDs, deduplicated, never its own ID |

- Each supplied time is shown separately with its own label, even when two are equal. A missing time is not shown and never filled from another.
- A record needs at least one valid time; an invalid optional field is omitted, not guessed.
- Ancestry stays inside the World: an ID that names a listed record in another World is removed. An ID that isn't listed is shown as "an earlier record".
- **Required before live binding:** the memory owner must publish the mapping from its native record fields to each field above (including which native time is the event time and which is the capture time). Until that mapping exists, nothing should be sent in these fields.

The UI shows only what is returned. Run status and events are displayed as reported; nothing is simulated or timed client-side. Live streaming of events is a future addition to this same public-event shape and needs its own owner.

## `POST /api/pothos/v1/turns`

- Requires the bearer session and an `Idempotency-Key` equal to `requestId`. (Same-origin cookies stop at this app's proxy; they are never forwarded.)
- `202` means accepted and still running: the request stays waiting, under its original IDs, for recovery.
- Input: `{ threadId, requestId, text, addressee }`, plus `worldId` and `actorId` when the user has selected a World/ArcheAgent from the workspace response.
- The default account conversation ("Your World" / PothOS) sends no `worldId`/`actorId`, exactly as before.

### Scoped turns

- A scope is a declaration, not a permission. The server must verify World membership and ArcheAgent capability and reject otherwise.
- The browser only dispatches a scoped turn when the selected ArcheAgent has `talk: "available"`; otherwise it refuses locally with a plain message and keeps the draft.

### `addressee`: declared node identity

`addressee` has exactly two valid values:

| Value    | Sent by                                   |
| -------- | ----------------------------------------- |
| `pothos` | The consumer Personal workspace           |
| `memex`  | The default conversation of a server-verified Founder, including the Founder workbench (Hybrid chat and Focus voice) |

The value is a declaration only and grants nothing. The server must check it against the caller's trusted capability and tenant binding. For example, it must reject `memex` unless the account holds a Founder capability for that tenant. The UI never implements this permission.

### Output

- Must echo the same `threadId` and `requestId`, with a nonempty `text`.
- A scoped turn's reply must echo the same `worldId` and `actorId`. A default-conversation reply must not include either. Otherwise the reply is treated as unconfirmed (same request kept for "Check again").
- May include `engine` (string): the engine the runtime actually used. The UI shows it only when present. It never infers or invents one.

### Server obligations

- Enforce account/thread ownership, request uniqueness, bounded input, authorization, revocation and rate limits.
- Own the actual routing and tenant isolation.
- A duplicate request returns the stored terminal result or `409 held`. It must not start a second effect.

## `POST /api/pothos/v1/recovery`

- Same bearer and `Idempotency-Key` (= `requestId`) rules as turns.
- Input: `{ threadId, requestId, addressee }` plus `worldId`/`actorId` exactly as originally sent. No `text`: recovery never starts new work.
- `200` with the turns output shape (same echo rules) completes the original request. `202`/`409` still working; `404` no result yet; `401/403` sign in again. In every non-`200` case the original request stays waiting; the browser never releases or replays it from recovery.

## Browser-side guarantees

- **One thread per account, addressee and scope.** Every new message reuses that scope's stored `threadId`. Draft, waiting messages and history are stored per scope too, so switching World/ArcheAgent never shows another scope's replies, and switching back restores them. Each reply keeps the ArcheAgent name it was sent under.
- **Local drafts** (project, work, skill) are a separate per-account store filtered by World and ArcheAgent. They never overwrite the Talk draft and are never sent; copy/download is the user's own hand-off. A storage failure is shown to the user.
- **Unknown delivery keeps the original request.** This covers timeouts, network loss, 5xx, 409, 429, mismatched echoes and account changes mid-flight. The original `requestId` and `threadId` are kept under a principal-scoped key and survive navigation and reload. "Check again" calls `/recovery` with that exact request's IDs and scope; it never re-sends the text through `/turns`.
- **No discard for waiting messages.** Nothing implies remote cancellation. The user can write and send a separate message, which gets a new `requestId` in the same thread. The waiting one is never replayed silently.
- **Definitive refusals release the request.** A 404, 401/403 or other 4xx releases it, and the draft stays in the composer.
- **Drafts are kept** in the account's own slots on denied, offline, empty, timeout, account-change and unbound responses. Edits made while a request is in flight are not overwritten.
- **Where it is kept.** Talk drafts, threads, waiting messages, history and local drafts live in the account's browser private storage (AES-GCM, see `docs/private-storage.md`) once the user unlocks it, or in this tab's memory only while it is locked or not set up. Nothing is persisted in plaintext. The request bodies sent to `/turns` and `/recovery` are unchanged by this; private storage is not a server-side or end-to-end encryption claim.
- **Locked mid-request.** If private storage is locked, or the account changes, while a reply is on its way, the reply is not written locally; the stored original stays waiting and "Check again" recovers it by its original IDs.
- **Account fencing.** `advanceAgentGeneration()` runs on `SIGNED_OUT` and `USER_UPDATED`. `enterPrincipal()` advances on account replacement before the keyed workspace remounts. A token refresh for the same principal does not advance the generation or duplicate a turn.
- **Voice stays unavailable** until an equivalent authenticated owner is joined.
- **Live panel shows "connection needed".** It has no built-in or typed-in host. It stays that way until a trusted same-origin capability for it is added to this contract.

## Prohibited

- Never point these paths at `mcp.joshops.ai/mcp`. That endpoint is MCP, not this REST contract.
- No raw LAN/model/SSH endpoint, arbitrary or user-editable URL, frontend provider secret, Lovable AI Gateway, or scripted local reply presented as an engine answer.

## Projection contract (existing authenticated desktop relay)
POST `/api/pothos/v1/projection/tickets` delegates through the fixed server proxy to `https://mcp.joshops.ai/api/pothos/v1/projection/tickets`. JSON is strictly `{ "node": "RTX" | "MK1" | "MK2" | "MK3" }`. After Supabase JWT verification, the BFF forwards only the bearer, bounded JSON, and fixed `Origin: https://pothos.joshops.ai`; it never forwards browser Origin, Host, Cookies, or a caller-selected target. Native ticket owner still authorizes the principal and target; a route is not a grant. Redirects and proxy retries are refused.

The browser opens only `wss://mcp.joshops.ai/api/pothos/v1/projection/stream`, then sends exactly the opaque one-use ticket and registered node in the first bounded JSON frame. The client cancels stale generations and disconnects on account/token change. The existing relay binds ticket redemption to identity, node, canonical Origin, expiry, one-use consumption, and continuing native authorization. Foreign Origin, target mismatch, spent/revoked ticket, owner 503, and permission revocation remain failures. The installed native owner must separately adopt the canonical Origin preimage change; this source contract does not claim that live effect, Google-login qualification, or Apple handoff.
