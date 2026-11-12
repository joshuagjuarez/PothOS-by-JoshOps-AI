import { defineTool } from "@lovable.dev/mcp-js";
import { PERSONAL_APP_URL, POTHOS_ACTIVATION, POTHOS_DEFINITION, POTHOS_FIRST_RELEASE, POTHOS_FREE_POLICY, POTHOS_OPEN_SOURCE, POTHOS_PRICE_HEADLINE, POTHOS_PRIVACY_URL, POTHOS_PURPOSE, POTHOS_OWN_AAS, POTHOS_COMMUNITY_LINKS, POTHOS_COGNITIVE_PRIVACY, POTHOS_CONTRIBUTE, POTHOS_COMMUNITY_SUPPORT, POTHOS_DOCS_URL, POTHOS_RELEASE_STATUS, POTHOS_SEPARATE_COSTS, POTHOS_SOFTWARE_PRICE_USD, POTHOS_TAGLINE } from "../../personalApp";
import { DOWNLOAD_PATH, nativeReleaseSummary, RELEASE_ACCESS_NOTE } from "../../releases";

const services = [
  {
    name: "PothOS",
    purpose: POTHOS_PURPOSE,
    summary: `${POTHOS_TAGLINE} ${POTHOS_DEFINITION}`,
    price: `$${POTHOS_SOFTWARE_PRICE_USD}`,
    pricing: `${POTHOS_PRICE_HEADLINE} ${POTHOS_FREE_POLICY}`,
    release: POTHOS_RELEASE_STATUS,
    openSource: `${POTHOS_OPEN_SOURCE} ${POTHOS_PURPOSE}`,
    openDevelopment: `${POTHOS_OWN_AAS} ${POTHOS_COGNITIVE_PRIVACY} ${POTHOS_CONTRIBUTE}`,
    documentation: POTHOS_DOCS_URL,
    communityLinks: POTHOS_COMMUNITY_LINKS,
    community: POTHOS_COMMUNITY_SUPPORT,
    status: `${POTHOS_ACTIVATION} ${POTHOS_FIRST_RELEASE}`,
    privacy: POTHOS_PRIVACY_URL,
    support: "joshua@joshops.ai",
    stack: ["Interface: Worlds across supported phones, tablets, computers, browsers and plugins", "Work, memory and orchestration: memory with sources and corrections, files, tools and workflows", "Local runtime and compute on supported hardware you choose"],
    focus: ["A continuing ArcheAgent with its identity, preferences and permissions", "Memory and files with sources and corrections", "Connection to the supported AI engines, accounts and devices you already use"],
    worlds: "Personal, professional, nonprofit and small-business Worlds, each with its own sharing boundary.",
    entry: PERSONAL_APP_URL,
    downloads: { application: "JoshOps AI", access: RELEASE_ACCESS_NOTE, page: `https://joshops.ai${DOWNLOAD_PATH}`, webApp: PERSONAL_APP_URL, nativeApps: nativeReleaseSummary() },
    notes: [POTHOS_SEPARATE_COSTS, "The connection kit is setup files and plugin source only, not the PothOS runtime source.", "This information tool does not enroll or charge."],
  },
  { name: "Organization administration and developer tooling", price: null, status: "Release work in progress, not a separate paid tier" },
];

export default defineTool({
  name: "list_services", title: "List JoshOps AI public offers",
  description: "List PothOS pricing (free, always) and availability. Applies to PothOS only, not JoshOps AI or separate ventures; this does not apply, enroll, or charge.",
  inputSchema: {}, annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({ content: [{ type: "text", text: JSON.stringify(services, null, 2) }], structuredContent: { services } }),
});
