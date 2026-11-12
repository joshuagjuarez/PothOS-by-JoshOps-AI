import { createFileRoute } from "@tanstack/react-router";
import MasterWorkspace from "@/components/MasterWorkspace";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "JoshOps AI — Your World" },
      { name: "description", content: "Talk, work, memory, projects and connections for your World and ArcheAgents in PothOS." },
      { property: "og:title", content: "JoshOps AI — Your World" },
      { property: "og:description", content: "Talk, work, memory, projects and connections for your World and ArcheAgents in PothOS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MasterWorkspace,
});
