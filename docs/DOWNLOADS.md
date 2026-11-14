# Download JoshOps AI

**For everyone:** published installer downloads do not require a GitHub account. The web app uses your JoshOps AI account. GitHub source, issues and contributor forms are optional developer resources, not the installation flow.

[Official download page](https://joshops.ai/download) · [Mac release and checksums](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/tag/v1.0.10-beta.1) · [Earlier platform releases](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/tag/v1.0.8-beta.1)

| Platform | Download | Status |
| --- | --- | --- |
| Windows x64 | [Installer 1.0.8](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.8-beta.1/JoshOps-AI-1.0.8-windows-x64.exe) | Official direct download; no Authenticode publisher signature |
| Android ARM64 | [Signed APK 1.0.8](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.8-beta.1/JoshOps-AI-1.0.8-android-arm64.apk) | Existing Android signing identity reused; signature verified |
| Android developers | [Signed AAB 1.0.8](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.8-beta.1/JoshOps-AI-1.0.8-android-arm64.aab) | App bundle for developer review; not a Google Play listing |
| ChatGPT / MCP clients | [Connection kit 0.3.2](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.8-beta.1/JoshOps-AI-connection-kit-0.3.2.zip) | OAuth configuration and scoped plugin source |
| Mac Apple silicon | [Notarized DMG 1.0.10](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.10-beta.1/JoshOps-AI-1.0.10-macos-arm64-notarized.dmg) | Developer ID signature verified; Apple notarization accepted; stapled and Gatekeeper checked |
| Mac Intel | [Use web app](https://pothos.joshops.ai/install) | Native installation verified; public Intel installer pending; the link opens the web app |
| Linux Ubuntu x86_64 | [Use web app](https://pothos.joshops.ai/install) | Existing native installations verified; public installer not yet published; the link opens the web app |
| iPhone / iPad | [Use web app](https://pothos.joshops.ai/install) | Native app exists; public App Store/TestFlight distribution is not available yet; the link opens the web app |

The application is JoshOps AI, with your PothOS and ArcheAgent inside it. [Choose your home computer, phone/tablet and assistant](DEVICE_SETUP.md). The simple interface and the environment's supported computing capabilities are separate. These community beta builds use the existing account-connected backend; the complete standalone Python harness is not bundled. Use your own admitted account and permissions.

These release files are public downloads. Founder repositories, private data and credentials are separate and are not download prerequisites.

Exact SHA-256 values and the Android signing certificate fingerprint are in [release-artifacts.json](release-artifacts.json) and each release's checksum file. The Mac 1.0.10 release also includes the exact dependency locks, an inventory and notices for 334 dependencies. No App Store, Google Play or public plugin-directory approval is claimed. Fresh recipient-device acceptance remains to be completed.

[Phone nodes and local engines](PHONE_NODES.md) · [Support](../SUPPORT.md) · [Licensing](../LICENSE_STATUS.md) · [Connection setup](CONNECTIONS.md)

## What makes a download official?

These are project-issued files linked from the JoshOps AI website and its official GitHub repository. "Official" identifies the publisher; it does not mean every package has store approval or a platform publisher certificate. Android can be distributed as a signed APK directly from a website ([Android distribution guide](https://developer.android.com/distribute/marketing-tools/alternative-distribution)). For the planned broad iPhone/iPad release, App Store Connect manages App Store submission and TestFlight testing ([Apple distribution guide](https://developer.apple.com/app-store-connect/)). Store buttons will point to the actual listing or invitation when published; they will not be placeholders.
