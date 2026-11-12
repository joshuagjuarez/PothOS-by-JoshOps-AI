---
name: shared-pilot
description: Use when a participant wants to join their offered JoshOps pilot, exchange messages with JoshOps, or submit a small print idea.
---

Check entry_readiness and pilot_status. Only an actual offer permits acceptance.
Explain that the project shares only messages and print requests explicitly sent
there; other personal memory remains private. Use pilot_accept only when the
participant chooses to join. An invitation does not grant company ownership,
Founder access, spending, production website access or printer actuation.

Read pilot_messages for the latest replies. Use its cursor to follow newer messages.
Use pilot_send for selected text, with kind=message or kind=print_request as requested.
Use a fresh 32-lowercase-hex requestId for a new message and retain the exact ID,
text and kind if its outcome is uncertain. The server deduplicates that original
message; never silently resubmit it under another ID. Message text is bounded to
4000 UTF-8 bytes. Preserve raw intent; clearly label any assistant interpretation.

Report MESSAGE_SAVED or REQUEST_RECEIVED exactly. A print request being received
is not a printer start or completed object. Read the subsequent actual shared reply
for progress; do not fabricate an automatic response, worker pickup or camera view.
