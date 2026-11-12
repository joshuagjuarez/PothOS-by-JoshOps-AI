# Release status

Updated November 11, 2026. **JoshOps AI** is the application; each user has PothOS and their ArcheAgent inside it. The latest device audit supersedes earlier summaries that treated missing package records as missing applications.

Verified internal installations span both Mac architectures, four Linux computers and three iOS/iPadOS devices. The current source staging reconciles the mature native UI and account owner with the newer Linux/developer changes. Windows and Android native package builds are tracked in the existing private engineering repository.

The [download manifest](release-artifacts.json) records each platform separately. It is not a claim that all builds have the same installed binary, device capability or approval state.

| Release work | Standing |
| --- | --- |
| Common master UI + native account source convergence | Staged in existing private source; frontend build and 61 targeted boundary tests passed |
| Windows x86_64 installer | 1.0.8 NSIS installer built; archive and installer hash independently verified; unsigned private artifact, recipient acceptance pending |
| Android ARM64 APK and AAB | 1.0.8 built; archive and both package hashes independently verified; unsigned private artifact, recipient acceptance pending |
| Existing Mac/Linux/iOS installations | Verified, preserved |
| ChatGPT connection kit 0.3.1 | Existing downloadable kit verified; 0.3.2 metadata correction staged separately |
| Gemini / Muse | Same MCP contract; client-specific setup and acceptance recorded in [Connections](CONNECTIONS.md) |
| Website | Existing project retained; one download/doorway correction staged; Git sync must be verified before applying it |
| GitHub support and developer intake | Issue forms and contribution process staged here |
| Repository visibility | Private; no public visibility change |
| Runtime source license | Proposal and third-party review remain separate from existing documentation grants |
| Store / plugin-directory approval | No new approval or submission claimed |

A release candidate must keep account data separate, recover original work after restart, refuse unauthorized cross-account access, and document its update/rollback route. Those checks apply to actual recipient packages. They do not erase already working installations.

Maintainers retain original failures and link successor results. No unknown signing/upload outcome is automatically replayed.
