# Rebuild the staged native candidates

Application: JoshOps AI 1.0.8. Both candidate packages render the existing master App with the recipient native-account profile.

| Package | Actual build source commit | Private retained artifact |
| --- | --- | --- |
| Windows x86_64 NSIS | `c671eb8800003a77b48845a5037687a68b3a123a` | [Installer, build return and Cargo lock](https://github.com/joshuagjuarez/Memex-OS/actions/runs/43152274034/artifacts/13914978340) |
| Android ARM64 APK/AAB | `fd6d0f817c81195ce26ccfae88be25a080c75455` | [APK/AAB, build return and Cargo lock](https://github.com/joshuagjuarez/Memex-OS/actions/runs/43151840214/artifacts/13915061139) |

Both builds used an identical resolved Rust dependency lock: `d5edfcd9d1843421f0b1caf874f31d5c7967222ee3e42af3849b00ee8ae045b0`. The artifact contains that exact Cargo.lock; preserve it when reproducing these candidates. The first converged build had to resolve newly joined native-account dependencies, so its retained lock is part of the build input record rather than an assumption that the older committed lock already matched.

Use the private repository's `.github/workflows/master-cross-platform.yml` at the recorded commit for the exact checkout, toolchain, account profile and Tauri commands. Preserve the pinned llama.cpp commit for Android. Rebuild in a separate checkout; do not reset an installed app's working source or copy founder credentials.

The source branch continues at `codex/master-release-staging-20261111`. Later workflow-only maintenance does not retroactively change these artifacts' recorded source commits. Each subsequent package needs its own measured return.

The existing Windows callback now routes to the process holding the original OAuth state, following [Tauri's desktop deep-link integration](https://v2.tauri.app/plugin/deep-linking/). Exact callback, account generation and state validation remain with the existing native account owner.

These artifacts are unsigned, and neither a store upload nor recipient device acceptance has been claimed. Android APK installation requires signing. Source licensing and private-state export review remain separate before public source promotion.
