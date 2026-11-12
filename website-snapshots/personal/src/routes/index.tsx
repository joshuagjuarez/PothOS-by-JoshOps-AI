import smileLogo from "@/assets/joshops-ai-logo.png.asset.json";
import { COMMUNITY_SOURCE_STATUS, SOFTWARE_POLICY } from "@/lib/softwarePolicy";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const TITLE = "PothOS by JoshOps AI | Your World, continued";
const DESCRIPTION =
  "PothOS keeps your World (memory, projects and ArcheAgents) continuing across your work and devices.";
const PAGE_URL = "https://pothos.joshops.ai/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://pothos.joshops.ai/#website",
          url: PAGE_URL,
          name: "PothOS by JoshOps AI",
          alternateName: "PothOS",
          publisher: {
            "@type": "Organization",
            "@id": "https://joshops.ai/#organization",
            name: "JoshOps AI",
            url: "https://joshops.ai/",
          },
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

  // The public introduction renders immediately (also in the server HTML). A signed-in
  // visitor is still sent on to /app once the session is known; if the check fails the
  // public page simply stays usable.
  useEffect(() => {
    let live = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (live && data.session) navigate({ to: "/app" });
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen fog-bg flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            <img src={smileLogo.url} alt="" className="h-6 w-6 shrink-0" />
            PothOS · by JoshOps AI
          </div>
          <h1 className="display text-3xl sm:text-5xl leading-tight max-w-2xl">
            Your World,
            <br />
            continued.
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Memory, projects and ArcheAgents that keep your work going,
            <br />
            for you, your practice or your small business.
          </p>
        </div>

        <div className="space-y-2 max-w-md">
          <p className="text-sm text-foreground">
            Memory that continues, and connections to the AI tools you already use.
          </p>
          <p className="text-sm text-muted-foreground">
            PothOS software: {SOFTWARE_POLICY.headline} For personal, nonprofit and commercial use, with no fee per
            ArcheAgent, device or seat. {COMMUNITY_SOURCE_STATUS}
          </p>
          <p className="text-sm text-muted-foreground">PothOS is by invitation for now.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button asChild className="flex-1 h-11">
            <Link to="/auth">Enter</Link>
          </Button>
        </div>
      </main>

      <footer className="p-5 text-center text-[10px] uppercase tracking-widest text-muted-foreground space-x-4">
        <span>PothOS by JoshOps AI</span>
        <Link to="/privacy" className="underline-offset-4 hover:underline">
          Privacy and service
        </Link>
        <a href="https://joshops.ai/download" className="underline-offset-4 hover:underline">
          Download apps
        </a>
        <Link to="/install" className="underline-offset-4 hover:underline">
          Install web app
        </Link>
        <Link to="/connect" className="underline-offset-4 hover:underline">
          Connect
        </Link>
      </footer>
    </div>
  );
}
