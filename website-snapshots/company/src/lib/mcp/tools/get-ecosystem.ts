import { defineTool } from "@lovable.dev/mcp-js";
import { CONNECTION_KIT, POTHOS_CONNECT_URL, PERSONAL_APP_URL, POTHOS_ACTIVATION, POTHOS_DEFINITION, POTHOS_FIRST_RELEASE, POTHOS_FREE_POLICY, POTHOS_PRICE_HEADLINE, POTHOS_PRIVACY_URL, POTHOS_RELEASE_STATUS, POTHOS_SEPARATE_COSTS, POTHOS_TAGLINE } from "../../personalApp";
import { DOWNLOAD_PATH, nativeReleaseSummary, RELEASE_ACCESS_NOTE } from "../../releases";

const ecosystem = {
  company: {
    name: "JoshOps AI",
    summary: "A Houston-rooted software company and venture home.",
    website: "https://joshops.ai/",
  },
  product: {
    name: "PothOS",
    summary: `${POTHOS_TAGLINE} ${POTHOS_DEFINITION}`,
    pricing: `${POTHOS_PRICE_HEADLINE} ${POTHOS_FREE_POLICY}`,
    release: POTHOS_RELEASE_STATUS,
    focus: "Your context, ready for what comes next: a continuing home for your ArcheAgent's memory, files and work across supported devices and connections, with permissions chosen by the user. The PothOS software is free.",
    separateCosts: POTHOS_SEPARATE_COSTS,
    activation: `${POTHOS_ACTIVATION} ${POTHOS_FIRST_RELEASE}`,
    entry: PERSONAL_APP_URL,
    privacy: POTHOS_PRIVACY_URL,
  },
  ventures: [
    { name: "Purpose Link", role: "A Houston community-resource navigation venture.", url: "https://purposelink.joshops.ai/" },
    { name: "Bare Sole Media", role: "A creative photography, video, and storytelling venture." },
  ],
  research: "Practical software, portable interfaces, and robotics are in research and development.",
  downloads: {
    page: `https://joshops.ai${DOWNLOAD_PATH}`,
    webApp: { url: PERSONAL_APP_URL, status: "Available now to invited testers (connected web beta; needs internet)", install: "https://pothos.joshops.ai/install", connect: "https://pothos.joshops.ai/connect" },
    application: "JoshOps AI",
    access: RELEASE_ACCESS_NOTE,
    connectionKit: { ...CONNECTION_KIT, setup: POTHOS_CONNECT_URL },
    nativeApps: nativeReleaseSummary(),
  },
  publicRoutes: ["/", "/products", "/pothos", "/business", "/developers", "/ventures", "/research", "/learn", "/support", "/docs", "/about", "/portfolio", "/pricing", DOWNLOAD_PATH],
  notice: "Public information only; access is by invitation inside the PothOS app.",
};

export default defineTool({
  name: "get_ecosystem", title: "Get JoshOps AI public structure",
  description: "Describe JoshOps AI, its PothOS product entry, distinct ventures, public R&D, and public routes.",
  inputSchema: {}, annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({ content: [{ type: "text", text: JSON.stringify(ecosystem, null, 2) }], structuredContent: ecosystem }),
});
