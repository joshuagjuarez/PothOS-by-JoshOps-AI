// The PothOS software offer as decided on 6 November 2026 (pricing amendment 2026-11-06.1).
// One central constant, so the web client's refusal to start new paid activation is intentional
// and testable. This changes presentation and the browser's own behaviour only: native membership,
// invitation, tenant and payment state stay owned by the native server.
export const SOFTWARE_POLICY = {
  version: "2026-11-06.1",
  effective: "2026-11-06",
  /** No new paid activation or checkout is ever started from this web client. */
  newPaidActivation: false,
  /** Covered-month (grace) requests are not offered: nobody should need one to use free software. */
  graceOffers: false,
  headline: "$0. Free. Always.",
} as const;

export const PRICING_AMENDMENT_PATH = "/documents/pothos-pricing-amendment-2026-11-06.1.md";

/** Shown when an invited account is still blocked by the old native paid admission. */
export const FREE_ACCESS_PENDING =
  "PothOS software is now free. This account is waiting for the free-access update. No payment is required; contact support if it stays unavailable.";

/** Shown if anything asks this client to start a paid activation. */
export const FREE_POLICY_NOTICE = "PothOS software is now free, so there's nothing to buy here. No payment is required.";

/** Current community source status; does not change historical terms or select a runtime license. */
export const COMMUNITY_SOURCE_STATUS =
  "JoshOps AI downloads, connection tools and community documentation are available. Build with the community.";
export const RUNTIME_LICENSE_STATUS =
  "License terms for the runtime are being reviewed and will be published with the community source release. Existing Apache-2.0 grants cover specific public documentation only and do not license the private runtime.";
export const COMMUNITY_RELEASE_STATUS_URL =
  "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/blob/main/docs/RELEASE_STATUS.md";

/** Public participation destinations; never grant software or account access. */
export const PROJECT_REPOSITORY_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI";
export const SUPPORT_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues/new/choose";
export const DISCUSSIONS_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/discussions";
export const SECURITY_REPORT_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/security/advisories/new";
export const DEVELOPER_PARTICIPATION_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues/new?template=developer-participation.yml";
export const PROJECT_SUPPORT_URL = "https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/blob/main/docs/SUPPORT-THE-PROJECT.md";
