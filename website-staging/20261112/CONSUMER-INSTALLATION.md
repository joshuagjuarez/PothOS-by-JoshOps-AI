# Consumer installation correction

Apply this small correction to the existing company project dcb0040c-0ff9-414e-8a48-abd69e6d9b79, current source b48a5879eff63322f9d8e5ba08c3af6ca5a7f678. It does not create another app.

Joshua rejected contributor/testing requests as substitutes for a consumer download.

- Replace src/pages/Download.tsx and src/lib/releases.ts with the prepared files in this folder's company tree. Keep the current card styling.
- Update tests/downloads.test.ts from the prepared source; require the consumer fallback and prohibit a contributor-form fallback on platform actions.
- Recompute existing crawler download copy with nativeReleaseCopy() for index.html and public/llms.txt. Preserve all unrelated content.
- Real installer URLs, hashes, versions and signing state are unchanged. Windows/Android buttons download their actual files. Other platforms say Native download pending and Use web app, pointing to the existing /install route.
- A web app is not described as a DMG, native iOS app or store listing. No false App Store/Google Play badges.
- Contributor and open-source links remain only in their own section. No consumer is asked to open a GitHub issue to install.
- Existing Apple archive is development-signed; current native export preflight returned WAIT_FOR_AUTHENTICATION. This page correction does not complete missing store or Mac/Linux package delivery.
- Run existing tests/build, verify platform CTA destinations, then report the source commit. No extra features, packages, account changes or new project.
