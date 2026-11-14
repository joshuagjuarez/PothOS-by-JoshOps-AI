# Local engine choices in JoshOps AI

JoshOps AI is one application. PothOS provides continuity, memory and the workspace; a compatible local model supplies an engine within that workspace. Changing engines should not mean starting a new identity or losing that continuity.

JoshOps AI, designed by Joshua David Gustafson-Juarez, has configured the following engine families in its native fleet. These are build choices, not paid model tiers.

| Build choice | Observed configuration | Configured engine memory budget |
| --- | --- | --- |
| **Nema Foundation** | NVIDIA Nemotron 3 Nano 4B, Q4_K_M, CPU, 4,096-token context | 8 GiB |
| **Qwen 9B** | Qwen 3.5 9B, Q4_K_M, Q5_K_M or Q8_0 CPU profiles; an observed Q5_K_M Metal profile; 4,096-token context | 13 GiB on the observed CPU profiles; 12 GiB on the Metal profile |
| **Qwen 27B** | Qwen 3.8 27B, UD-Q4_K_M, CPU text profile, 8,192-token context | 24 GiB |
| **Apple Foundation Models** | The supported on-device system model, when available on the device | Managed by Apple; check availability at runtime |

These figures are **configured engine budgets**, not minimum total device RAM or download sizes. The operating system, workspace, context and other applications also use memory. Some observed Qwen CPU configurations include a separate vision projector; that does not establish vision support in every recipient build.

Nema Foundation is the JoshOps build name for the NVIDIA-based option; older notes may call it Nemo. The observed upstream Q4_K_M weight file is approximately 2.84 GB. Other quantizations and projectors have different sizes. We will publish measured recipient requirements with their qualified packages.

## What is available

The public release currently includes connected recipient previews and a connection kit. Those previews do not include the complete standalone Personal runtime and all local weights. A Linux companion component has passed its freeze, required-module checks and CLI invocation, and its release signature has been independently verified. A current Mac recipient app and DMG are signed; Apple's notarization is being processed. These are separate milestones, not a claim that every complete local installer is ready.

The complete Personal package is being assembled around the native application, CLI, local continuity and a compatible mounted engine. Apple Foundation Models is an option where the system reports it available. It requires supported hardware, software and model availability; applications must handle an unavailable system model explicitly.

Published architecture and developer interfaces support community work. Enterprise participation adds hands-on implementation, organizational support, custom orchestration and legacy-data integration under the program's terms. A larger model alone does not confer organizational access. Each participant's private data, accounts and permissions remain their own.

## Attribution and development

These integrations preserve upstream model attribution and applicable licenses. Model names identify components; they do not imply a vendor partnership. Runtime configuration, integration and orchestration are distinct from changes to model weights.

- [NVIDIA Nemotron 3 Nano 4B GGUF and license information](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF)
- [Qwen 3.5 9B model card](https://huggingface.co/Qwen/Qwen3.5-9B)
- [Qwen 3.8 27B model card](https://huggingface.co/Qwen/Qwen3.8-27B)
- [Apple Foundation Models framework](https://developer.apple.com/foundation-models-framework)
- [Apple Intelligence requirements and availability](https://support.apple.com/en-us/121115)

Future engines and builds will be added as they are qualified. Private workflow cards, orchestration internals, personal corpora and credentials are not part of this catalogue. See [license status](../LICENSE_STATUS.md), [downloads](DOWNLOADS.md) and [contribution guidance](../CONTRIBUTING.md) for the actual published scope.

Updated November 14, 2026.
