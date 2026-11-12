// One canonical account entry. Never substitute a preview/editor URL or env value.
export const PERSONAL_APP_URL = "https://pothos.joshops.ai/auth";
/** The PothOS app home ("Explore PothOS" from the founder profile). */
export const POTHOS_HOME_URL = "https://pothos.joshops.ai";
/**
 * Product-owner decision, 2026-11-06: PothOS software is free, always, for
 * personal, nonprofit and business use. There is no software fee of any kind.
 * Crawler files and public info tools copy the sentences below verbatim.
 */
export const POTHOS_SOFTWARE_PRICE_USD = 0;
export const POTHOS_PRICE_HEADLINE = "PothOS is free. Always.";
export const POTHOS_FREE_POLICY =
  "PothOS software is free for personal, nonprofit and business use. The software price is $0, with no subscription, per-ArcheAgent, device, seat, business or enterprise software fee. Adding more ArcheAgents never creates a software charge.";
/** Policy is decided; release readiness is separate and not yet verified. */
export const POTHOS_RELEASE_STATUS =
  "PothOS is a free community project, and a community source release is in preparation. Standalone runtime source and final runtime license terms remain unreleased. JoshOps AI Windows and Android developer previews are distributed through invited GitHub access, not a fully customer-qualified release.";
export const POTHOS_OPEN_SOURCE =
  "PothOS is for individuals, educators, nonprofits, developers and businesses. License terms for the runtime are being reviewed and will be published with the community source release. Existing Apache-2.0 grants cover specific public documentation only and do not license the private runtime.";
export const POTHOS_PURPOSE =
  "PothOS exists for human-governed memory continuity across infrastructure, platforms, software, devices and models. It is designed to preserve original meaning and corrections, reduce noise and recover useful signal, so a person can develop themselves and help others. Your thinking stays yours: PothOS is built for cognitive sovereignty and never to exploit your private signal.";
/**
 * Public community links, 2026-11-06. The dedicated product repository is verified public and is
 * the primary product and documentation destination. It holds documentation and community
 * preparation only; no standalone runtime source is released or linked.
 */
export const POTHOS_REPO_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI";
export const POTHOS_COMMUNITY_HUB_URL = POTHOS_REPO_URL;
export const POTHOS_CONTRIBUTION_THREAD_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues/1";
export const POTHOS_ISSUES_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues";
export const JOSHOPS_PUBLIC_REPO_URL = "https://github.com/joshuagjuarez/JoshOps-AI---Public";
export const POTHOS_LICENSE_NOTICE_URL = "https://github.com/joshuagjuarez/joshuagjuarez/blob/main/docs/pothos/community-release-policy.md";
export const POTHOS_COMMUNITY_LINKS =
  "PothOS repository (documentation and community preparation; no runtime source released yet): https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI. Community discussion: https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues/1. Bugs and contributions: https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues. JoshOps AI public repository: https://github.com/joshuagjuarez/JoshOps-AI---Public. Licensing notice: https://github.com/joshuagjuarez/joshuagjuarez/blob/main/docs/pothos/community-release-policy.md.";
/** Public PothOS documentation. */
export const POTHOS_DOCS_URL = POTHOS_REPO_URL;
export const POTHOS_DOCS_SUPPORT_URL = "https://github.com/joshuagjuarez/joshuagjuarez/blob/main/docs/pothos/support.md";
export const PURPOSE_LINK_URL = "https://purposelink.joshops.ai";
export const POTHOS_OWN_AAS =
  "The planned community framework lets people create their own ArcheAgents under their own authority. This documentation release does not include a standalone framework or a personal ArcheAgent. The Founder's own ArcheAgents, voices, memories, accounts and environment stay private.";
export const POTHOS_COGNITIVE_PRIVACY =
  "Cognitive privacy is a release requirement, not an untested guarantee. Local personal context, explicit choice about external services, permission boundaries, and controls to inspect, correct, export and recover your information must be documented and verified before a standalone build is described as qualified for local use. A hierarchy title never grants actual access, and local software is not automatically secure.";
export const POTHOS_VOICE_STATUS =
  "Voice work exists in the native project. A consumer package and its microphone, speaker and hardware behavior are still being qualified.";
export const POTHOS_CONTRIBUTE =
  "Contribution priorities include keyboard navigation, screen-reader labeling, visible microphone permission, recording and cancel behavior, qualified speech input and output, clean packaging, tested local-model adapters, continuity and recovery, permission isolation, and documentation.";
export const POTHOS_COMMUNITY_SUPPORT =
  "Community help is available through the public documentation and support page. For private support, email joshua@joshops.ai. Automatic community Help Desk delivery into the maintainer's private environment has not been verified. Choose a reduced report to send; do not include personal memory or credentials.";
export const PURPOSE_LINK_NOTE =
  "Purpose Link is a separate, Houston-first community resource navigation project in development and an intended application of the same mission. Global adaptation and social justice uses are goals, not proven worldwide service, and it shares no membership, records or data access with PothOS.";
export const POTHOS_SEPARATE_COSTS =
  "Hardware, optional third-party hosting, external AI subscriptions or API usage, and model licenses are separate. There is no promise of unlimited compute or a permanently funded hosted service. The hosted invitation controls access; it is never a payment requirement.";

/** PothOS privacy and service page, published by the PothOS app. */
/** Connected web app install guide and AI-host connection page (existing Master app). */
export const POTHOS_INSTALL_URL = "https://pothos.joshops.ai/install";
export const POTHOS_CONNECT_URL = "https://pothos.joshops.ai/connect";

/**
 * Public connection kit hosted by the PothOS app. Plugin source, instructions and
 * host configuration examples only: no credentials, native runtime or model
 * installer. Separate from the native release catalogue in releases.ts.
 */
export const CONNECTION_KIT = {
  version: "0.3.2",
  url: "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/releases/download/v1.0.8-beta.1/JoshOps-AI-connection-kit-0.3.2.zip",
  sha256: "3e391e445507282a5714910aff716b3ba25e2a21c68605fe59f604b9dbc9ac04",
  bytes: 30854,
  label: "Download connection kit (ZIP, 30 KB)",
  summary: "Plugin source, setup instructions and host configuration examples for connecting an eligible AI host. No credentials, native runtime or model installer.",
} as const;

export const POTHOS_PRIVACY_URL = "https://pothos.joshops.ai/privacy";

/**
 * Current hosted access. Invitation is access control only, never payment. The
 * hosted app's billing transition is owned by the PothOS app, not this site.
 * Crawler files copy these sentences verbatim.
 */
export const POTHOS_ACTIVATION =
  "The hosted beta currently requires an invitation and your own account. Free-access migration is in progress. If your account still shows a payment prompt, contact support; do not start a new paid subscription.";
/** Connected web beta status (the existing full PothOS app). Crawler files copy it verbatim. */
export const POTHOS_WEB_BETA =
  "The connected PothOS web beta is available now to invited testers. On a phone, tablet or computer you can add it to your home screen or dock where supported; it needs an internet connection.";
export const POTHOS_FIRST_RELEASE =
  "The first release provides memory continuity and supported connected AI tools, including compatible MCP connections. Richer interactive presence is coming.";

/** Founder-approved plain-language product definition. Visible pages, metadata, crawler files and public info tools reuse it. */
export const POTHOS_TAGLINE = "Your own AI computing environment.";
export const POTHOS_DEFINITION =
  "PothOS brings a continuing ArcheAgent, memory, files, local computing, tools and workflows into one personal environment. Connect the AI engines and devices you use, and keep your identity, preferences and work together.";
/** Future direction only — not controls available today. */
export const POTHOS_ROADMAP = "The same environment is designed to grow with custom skins, avatars, voices and new ways to interact.";

/** Founder-attributed naming context for "Why PothOS?" (product page and llms.txt reuse it verbatim). */
export const POTHOS_NAME_HEADING = "Why PothOS?";
export const POTHOS_NAME_STORY =
  "Joshua Gustafson-Juarez chose the name PothOS for pothos: the deep yearning toward what is still beyond reach. For him, it expresses the drive to connect the disconnected parts of life and turn intention into useful action.";
