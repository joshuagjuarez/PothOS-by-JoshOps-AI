# Phone nodes and local engines

JoshOps AI is one application. Each enrolled phone can carry its own PothOS workspace, ArcheAgent identity and supported local engine. Memex coordinates the fleet; a phone remains a separately addressed node.

## Existing implementation

The iOS master contains a native Apple Foundation adapter using `SystemLanguageModel.default`, local conversation storage, model inventory, addressed Huddle participation, and a bounded workspace relay. The relay keeps original request IDs and separates each enrolled device. An engine is one worker used by the agent; it does not replace the agent's identity or grant access.

The November 12 source repair moves phone relays above presentation views so opening the orb, workbench or coworker overlay does not unmount them. It uses the existing orb and halos for a simple PothOS home, and checks local Foundation readiness independently of the network. Native TypeScript and two lifecycle regression tests passed. The corrected iOS master was signed and installed on the maintainer's enrolled iPhone. Independent device readback matches signed build 20261112073914, bundle ai.joshops.app. Cross-device plugin delivery remains a separate test.

The current Founder plugin-to-phone path still has a measured dependency: its registered shared backend cannot start because its Tailscale account proof is unavailable. Phone installation, local engine availability and cross-device routing are separate observations. Repair of that connection is tracked under the existing release work; no working remote phone session is claimed here.

## Apple devices

Apple lists iPhone 15 Pro/Pro Max, iPhone 16 models and later, iPhone Air and iPhone Duo as Apple Intelligence-capable families. Supported iPads include iPad mini with A17 Pro or A20 Pro and iPads with M1 or later. Language, region, OS and downloaded-model readiness still apply. The app queries actual availability rather than assuming it from the device name. See [Apple's current requirements](https://support.apple.com/en-us/121115).

The existing native Foundation adapter requires iOS/iPadOS 26 or later and an available on-device model. Local generation does not require a cloud model subscription. Apple's framework supports generation, structured outputs and tool integration; the app must supply each permitted tool. See [Apple's Foundation Models documentation](https://developer.apple.com/documentation/foundationmodels/generating-content-and-performing-tasks-with-foundation-models).

Persistent identity and stored work survive sessions. Execution still follows the phone's lifecycle: the current relay participates while the app is visible. Always-on background serving has not been qualified. [Apple background execution](https://developer.apple.com/documentation/backgroundtasks) requires the appropriate system-managed tasks.

## Adapter inventory

| Adapter or profile | Evidence and scope |
| --- | --- |
| Apple Foundation | Native Swift on-device adapter in the iOS master; readiness checked on the actual device |
| MLX local models | Existing mobile adapter; selected weights must be downloaded, verified and loaded |
| Granite 4.0 H-Tiny / Qwen 3.5 4B | Phone/tablet defaults listed in the master model manifest; a default is not installation proof |
| Nemotron / Qwen fleet workers | Existing fleet profiles include `nemo` and `qwen9`; engine size, quantization and running state must come from each worker's measured profile |
| Larger Qwen / Bonsai models | Existing configuration includes larger choices; their capacity and availability depend on the actual device |
| Android local models | Native engine libraries are packaged; the published APK does not bundle model weights |
| Additional providers and models | Contributions use existing adapter contracts, scoped tools and return evidence; arbitrary model compatibility is not assumed |

## Connecting assistants and phone data

Use the [existing connection kit](CONNECTIONS.md) for supported MCP clients. A connection to the shared service does not itself prove a direct connection from Gemini, ChatGPT or Muse to a phone. Addressing, device enrollment, original-request recovery and a return from that device must be verified together.

Phone data stays behind its native permission and adapter boundaries. Photos, health information and another app's private storage are not opened merely by enabling a language model. The Founder profile's hidden-photo exclusion remains in force. External posting requires a separate authorized action.

## Help build it

Contribute lifecycle fixes, local-engine tests, accessible touch UI, scoped adapters and reproducible device results through [Discussions](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/discussions) and the [participation form](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues/new?template=developer-participation.yml). Use your own account and devices; never include credentials or private user records in reports.

For optional sponsorship or donated testing hardware, [start a project-support discussion](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/discussions). Software access is not conditioned on sponsorship.
