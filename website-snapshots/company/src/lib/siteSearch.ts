// Local, deterministic search over this site's public pages. No network, no models.
import { nativeReleaseSummary } from "./releases";
import { PURPOSE_LINK_URL } from "./siteNav";

export interface SearchEntry {
  title: string;
  path: string;
  section: string;
  summary: string;
  keywords: string;
  external?: boolean;
}

export const SEARCH_INDEX: SearchEntry[] = [
  { title: "JoshOps AI", path: "/", section: "Company", summary: "The company home: PothOS, ventures and research.", keywords: "home company houston texas joshops" },
  { title: "PothOS", path: "/pothos", section: "Product", summary: "Your own AI computing environment: a continuing ArcheAgent, memory, files, local computing, tools and workflows.", keywords: "product pothos ai computing environment full stack worlds archeagents files tools workflows talk work illustration local ai" },
  { title: "Memory timeline and sources", path: "/pothos#memory", section: "PothOS", summary: "Recorded, inferred, corrected and proposed — every memory shows its roots.", keywords: "memory timeline provenance sources corrections history" },
  { title: "Worlds", path: "/pothos#worlds", section: "PothOS", summary: "Separate Worlds for a life, a practice or a small business, each with its own sharing boundary.", keywords: "worlds personal professional business household practice boundary sharing" },
  { title: "ArcheAgents", path: "/pothos#archeagents", section: "PothOS", summary: "A continuing digital representative with identity, memory and responsibilities that develops with you.", keywords: "archeagent archeagents agent representative identity arche greek" },
  { title: "Talk and Work", path: "/pothos#talk-work", section: "PothOS", summary: "Keep talking while independent work runs in the same World.", keywords: "talk work runs conversation tasks artifacts" },
  { title: "How PothOS is built", path: "/pothos#stack", section: "PothOS", summary: "Application, platform and infrastructure layers rooted in compute and sources you control.", keywords: "stack layers infrastructure platform application architecture orchestration mcp" },
  { title: "Pricing", path: "/pricing", section: "Product", summary: "PothOS is free. Always. No software fee for personal, nonprofit or business use.", keywords: "price pricing cost free community source license nonprofit business plan billing payment prompt get started sign up invitation invite get pothos" },
  { title: "Download JoshOps AI", path: "/download", section: "Product", summary: nativeReleaseSummary().map((release) => `${release.platform}: ${release.status}`).join(". "), keywords: "download downloads install installer app apps native iphone ipad ios android windows linux mac macos apple silicon intel app store google play desktop mobile web app beta invitation tester connect home screen" },
  { title: "Documentation", path: "/docs", section: "Docs", summary: "Sign in, ArcheAgents and devices, AI accounts, Worlds, Talk and Work.", keywords: "docs help setup documentation guide how to" },
  { title: "Connect your AI accounts", path: "/docs#connections", section: "Docs", summary: "Bring your own ChatGPT, Codex or other supported accounts; subscriptions stay with the provider.", keywords: "connections accounts providers chatgpt codex cli subscription api keys integrations" },
  { title: "Where PothOS runs today", path: "/docs#availability", section: "Docs", summary: "Browser first; other surfaces open to customers as they qualify.", keywords: "availability local runtime devices mac ubuntu iphone ipad windows android browser" },
  { title: "ArcheAgents and devices", path: "/docs#nodes", section: "Docs", summary: "One persistent home per ArcheAgent, reachable from your phone, tablet, computer or browser.", keywords: "devices phone tablet computer runtime home hardware" },
  { title: "Products", path: "/products", section: "Company", summary: "PothOS today, free; Enterprise and Developer capabilities are release work.", keywords: "products catalog enterprise developer" },
  { title: "Business", path: "/business", section: "Company", summary: "Small-business operations in PothOS today; Enterprise administration is release work in progress.", keywords: "business enterprise team organization small business operations coming soon" },
  { title: "Developers", path: "/developers", section: "Company", summary: "Developer tooling is release work in progress. Bring the CLI and provider accounts you already own.", keywords: "developers developer api cli build coming soon" },
  { title: "Ventures", path: "/ventures", section: "Ventures", summary: "Purpose Link and Bare Sole Media — technology in service of people and stories.", keywords: "ventures studio" },
  { title: "Purpose Link", path: PURPOSE_LINK_URL, section: "Ventures", summary: "Houston community-resource navigation.", keywords: "purpose link purposelink community resources social services navigation houston", external: true },
  { title: "Bare Sole Media", path: "/ventures#bare-sole-media", section: "Ventures", summary: "Photography, video and storytelling.", keywords: "bare sole media baresole photography video storytelling creative" },
  { title: "Public R&D", path: "/research", section: "Research", summary: "Portable interfaces, robotics and continuity across screens — in research and development.", keywords: "research r&d robotics portable interfaces screens future horizons" },
  { title: "About JoshOps AI", path: "/about", section: "Company", summary: "A Houston software company founded by Joshua Gustafson-Juarez.", keywords: "about company founder joshua gustafson-juarez story mission" },
  { title: "Joshua Gustafson-Juarez", path: "/portfolio", section: "Company", summary: "Founder of JoshOps AI — systems architect and orchestrator in Houston, Texas.", keywords: "founder joshua gustafson juarez portfolio profile golden ticket join the ops imperfection movement youtube collaboration" },
  { title: "Learn PothOS", path: "/learn", section: "Learn", summary: "Start with one real task: Worlds, ArcheAgents, local and cloud boundaries.", keywords: "learn tutorial first task getting started" },
  { title: "Support and recovery", path: "/support", section: "Support", summary: "Account recovery, useful support reports and help with PothOS.", keywords: "support help recovery sign in trouble appointment" },
  { title: "Contact JoshOps AI", path: "/support#contact", section: "Support", summary: "Email joshua@joshops.ai for PothOS help, or reach business, press, PurposeLink or Bare Sole Media.", keywords: "contact email help support business press interviews media purposelink bare sole media production" },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9$&]+/g, " ")
    .trim();

const tokenize = (value: string) => normalize(value).split(" ").filter(Boolean);

/** Every query word must match somewhere; titles weigh most. Stable order on ties. */
export function searchSite(query: string, limit = 8): SearchEntry[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const scored: { entry: SearchEntry; score: number; index: number }[] = [];
  SEARCH_INDEX.forEach((entry, index) => {
    const title = normalize(entry.title);
    const titleWords = title.split(" ");
    const keywords = normalize(`${entry.keywords} ${entry.section}`);
    const summary = normalize(entry.summary);
    let score = 0;
    for (const token of tokens) {
      let best = 0;
      if (titleWords.includes(token)) best = 10;
      else if (titleWords.some((w) => w.startsWith(token))) best = 7;
      else if (title.includes(token)) best = 5;
      if (keywords.split(" ").some((w) => w.startsWith(token))) best = Math.max(best, 4);
      if (summary.includes(token)) best = Math.max(best, 2);
      if (best === 0) return;
      score += best;
    }
    if (normalize(query) === title) score += 20;
    scored.push({ entry, score, index });
  });
  return scored
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((s) => s.entry);
}

export const SUGGESTED_SEARCHES = ["PothOS", "Pricing", "ArcheAgents", "Worlds", "Purpose Link", "Research"];
