# Getting PothOS: distribution paths

Updated November 7, 2026. These are the release paths and their current standing.
The [product contract](PRODUCT_CONTRACT.md) defines the shared official entry
and boundaries for every route below.

**Start at [Personal PothOS](https://pothos.joshops.ai).** Use
[the app](https://pothos.joshops.ai/app) and
[Connect](https://pothos.joshops.ai/connect) for the existing product entry and
connection flow. Personal PothOS is the official front door for individuals,
nonprofits and businesses. Each operator needs their own identity, data and
permitted connections; the common entry is not shared access to private data.

**GitHub is one distribution channel. It does not have to be the only download
location or the interface every person uses.** The intended experience is an
ordinary app or installation flow, with source and developer tools available
under the final applicable license.

## Current availability

The public repository contains the announcement, requirements and contribution
materials. The connection kit, a hosted app, a clean source candidate and a
standalone runtime are different deliverables. No independently installable
PothOS runtime or signed native installer is supplied by this repository yet.

The separate browser/source export candidate is preparation from an existing
interface. It is not the public entry or an accepted replacement for Personal
PothOS or the native application. Its preparation does not establish native
runtime installation, a public source license or store approval. Continue the
existing native application and shared runtime for native packages.

## Planned routes

| Route | Intended use | Requirement before calling it available |
| --- | --- | --- |
| Browser app | Existing [Personal PothOS](https://pothos.joshops.ai), with [App](https://pothos.joshops.ai/app) and [Connect](https://pothos.joshops.ai/connect) | Verified empty-account onboarding, actual backend connection, tenant isolation and clear local/cloud behavior; the official entry alone does not establish these checks |
| Home-screen web app | Convenient phone or tablet entry | Tested installability and permissions on each supported browser/device; it remains a web app |
| macOS direct download | Full desktop/native tool integration | A tested package, Developer ID signing and notarization, dependency notices, update and recovery instructions |
| Mac App Store | Discovery and managed updates | A store-compliant build and Apple's review |
| iPhone and iPad App Store | Native mobile experience | A qualified iOS/iPadOS build, privacy disclosures, account lifecycle and review of executable-code/device capabilities |
| Windows and Linux | Local desktop installations | Per-platform build, integrity/signing where applicable, packaging, model/runtime prerequisites and clean-machine verification |
| Android | Play or an authorized direct distribution route | Signed build, current publisher/distribution requirements and device qualification |
| Source archive and repository | Study, modify, build and contribute | Final rights/license scope, a reviewed code-only archive, build instructions and dependency inventory |
| Plugin or MCP client | Connect a chosen assistant to the person's permitted tools | Its own authenticated service connection; a plugin does not itself install the full native runtime |

Apple documents both the Mac App Store and direct Mac distribution using
Developer ID and notarization. Its iOS/iPadOS review rules constrain executable
code and downloaded functionality. A desktop terminal, developer environment or
emulator therefore needs platform-specific design and review. Do not assume
identical execution rights on every device.
[Apple Mac distribution](https://developer.apple.com/macos/distribution/) ·
[App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

Apple's Enterprise Program is for an organization's internal employee apps. The
PothOS Enterprise experience is a product mode; that name does not make the Apple
Enterprise Program a route for worldwide public distribution.
[Apple Enterprise Program](https://developer.apple.com/programs/enterprise/)

Android supports multiple distribution routes, including websites and app
marketplaces. The exact signed artifact and current applicable publisher rules
still have to be checked.
[Android distribution](https://developer.android.com/distribute/marketing-tools/alternative-distribution)

## One clear download entry

The existing Personal PothOS front door is the common entry. As native packages
qualify, it should point to each official platform/version, its license, checksums
or signatures, source archive, dependency notices, installation steps and known
limits. Assets may be hosted on GitHub Releases, the project website or a suitable
store. A link should become an installation option only when its actual artifact
is available and verified.

A customer should not need the founder's profile, a private account, a personal
memory export or the founder's devices to run an independently released build.

## Free software price and external costs

Official PothOS software will be free of charge for personal, nonprofit and
ordinary business use. That commitment does not make hardware, electricity,
network access, optional cloud hosting or another provider's API usage free.
Those choices and costs must be visible before the person selects them.

## Useful release evidence

Start with one honestly supported configuration. A new operator should be able
to install it, create an empty profile, connect an admitted local model/tool,
perform a useful task, restart, and recover the original record. Publish the
exact configuration and observed limitations. Add other platforms as they pass
their own checks.

See [release status](RELEASE_STATUS.md), [capabilities](CAPABILITIES.md),
[cognitive privacy](PRIVACY.md) and [license status](../LICENSE_STATUS.md).
