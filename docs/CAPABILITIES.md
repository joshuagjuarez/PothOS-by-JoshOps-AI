# Capabilities and developer participation

Updated November 7, 2026.

PothOS is intended to give people reusable tools for local AI, continuing work
and control of their information. Personal, Enterprise and Developer are
experiences within the same product direction. They do not imply different
ownership of a person's private information, a right to another tenant's data,
or paid access tiers for the official software.

The current public repository is documentation. The table below separates
existing implementation evidence from independently distributed customer
capability. It is not a promise that every listed tool is already included in
an installable public package.

## Current capability map

| Capability | Evidence in the underlying project | Public release work remaining |
| --- | --- | --- |
| World/workspace interface | Existing browser components for scoped work, agents, projects and connections | Clean-user routing, own-account/backend setup and end-to-end qualification |
| Drafts and conversation recovery | Existing account-lifecycle, encrypted browser-vault and original-request recovery primitives | Verify the released build's account switch, revocation, restart and recovery behavior |
| Local model and tool connections | Existing service/adapter work; support depends on the actual model, runtime, device and permission | Package a supported local configuration and document any external processing |
| IDE and terminal | Existing native editor/terminal source and historical operator evidence | Clean module export, dependency rights, customer installation and platform-specific execution |
| 3D printing / slicing integration | Existing native workflow that invokes an external slicer and preserves output evidence | Qualify the exact slicer/tool version and license, supported printer profile, G-code review and user-owned device connection |
| Slicer inside the browser | No browser/WASM slicing implementation verified in this source audit | Do not advertise a browser slicer until an actual implementation is qualified |
| Game/scene work | Existing scene, viewport and owned-game workflow components | Clear asset rights and separately package the supported tools |
| General emulator | Not verified by this audit | Identify the actual emulator, system, source/license and demonstrated behavior before claiming support |
| Voice and accessibility | Voice integration source and documented accessibility requirements; the clean candidate's voice functions currently return unavailable | Connect and qualify the actual speech runtime/provider, then verify recording controls, physical devices, keyboard/screen-reader use and any external processing |
| Multiple people in a business | Product direction and permission/tenant mechanisms under development | Independent user identities, explicit memberships, correct data separation and revoke/leave behavior |
| Smart devices, API, MCP and SSH | Adapter-oriented architecture and selected integrations | Per-device/provider compatibility, authentication, permission and actual task evidence |

The IDE, printing and scene components do not become part of the browser app
merely because that app has a navigation entry. A feature should disclose whether
it is local, remote, connected, unavailable or still a proposal.

## What developers can contribute now

- A focused review or improvement to a public requirement.
- A synthetic task and expected result for a supported local model or tool.
- Clean-install, restart and recovery acceptance cases.
- Voice, keyboard and screen-reader findings with the tested device/build.
- A dependency/license inventory or a small clean-module packaging proposal.
- A device adapter with explicit capability, permission, failure and recovery
  behavior.

Use the current [contribution process](../CONTRIBUTING.md). Substantial source
contributions need the final inbound/outbound rights scope; public visibility
alone is not a complete code license.

## Model and provider names

Developers from many ecosystems are welcome. A model name, client interface and
local runtime are different things. For example, OpenAI's gpt-oss and Google's
Gemma provide relevant self-managed model paths. Claude-related development
support is a different category from a locally distributed Claude model.
Compatibility must be tested for the exact model/runtime/version.

[OpenAI open-weight models](https://help.openai.com/en/articles/11870455-openai-open-weight-models-gpt-oss) ·
[Google Gemma](https://ai.google.dev/gemma/docs/get_started) ·
[Claude for Open Source](https://claude.com/contact-sales/claude-for-oss)

These references identify possible contribution ecosystems. They do not
establish a partnership, endorsement, grant award or completed PothOS integration.

## A useful first contribution

Choose one configuration, one useful task and one observable result. Document
what stayed on the device, what left it, what the user authorized, and how the
same work is recovered after interruption. Report failures alongside successes.

The project welcomes people who improve the toolset and help others understand
it. The measure is demonstrated usefulness, accessibility and human control.
