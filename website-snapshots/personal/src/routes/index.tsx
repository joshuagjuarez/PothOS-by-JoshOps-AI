import smileLogo from "@/assets/joshops-ai-logo.png.asset.json";
import { COMMUNITY_SOURCE_STATUS, SOFTWARE_POLICY, PROJECT_REPOSITORY_URL, DEVELOPER_PARTICIPATION_URL, PROJECT_SUPPORT_URL, SUPPORT_URL, DISCUSSIONS_URL, SECURITY_REPORT_URL } from "@/lib/softwarePolicy";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const TITLE = "JoshOps AI | Your local agentic computing environment";
const DESCRIPTION =
  "Your local agentic computing environment. Connect memory, files, tools and ongoing work across your devices and authorized AI assistants.";
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
          name: "JoshOps AI",
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
            JoshOps AI
          </div>
          <h1 className="display text-3xl sm:text-5xl leading-tight max-w-2xl">
            JoshOps AI
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Your local agentic computing environment.
          </p>
        </div>

        <div className="space-y-2 max-w-md">
          <p className="text-sm text-foreground">
            Your PothOS and ArcheAgent are inside it. Memory, files, tools and ongoing work connect across your devices and authorized AI assistants.
          </p>
          <p className="text-sm text-muted-foreground">
            PothOS software: {SOFTWARE_POLICY.headline} For personal, nonprofit and commercial use, with no fee per
            ArcheAgent, device or seat. {COMMUNITY_SOURCE_STATUS}
          </p>
          <p className="text-sm text-muted-foreground">
            Personal, Entrepreneur, Enterprise and Developer are uses of the same environment.
            Designed to work with Google Workspace through your authorized accounts; your personal Google subscription
            and company Workspace administration are distinct. Hosted access remains by invitation.
          </p>
          <p className="text-sm text-muted-foreground">
            <a href={PROJECT_REPOSITORY_URL}>Build with the community</a> · <a href={DEVELOPER_PARTICIPATION_URL}>Build with us</a> · <a href={PROJECT_SUPPORT_URL}>Support the project</a>.
            Optional sponsorship is unrelated to software access.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
          <Button asChild className="flex-1 h-11">
            <Link to="/app">Open JoshOps AI</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 h-11">
            <Link to="/connect">Connect your AI</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 h-11">
            <a href="https://joshops.ai/download">Download for your device</a>
          </Button>
        </div>
      </main>

      <footer className="p-5 text-center text-[10px] uppercase tracking-widest text-muted-foreground space-x-4">
        <span>JoshOps AI</span>
        <Link to="/privacy" className="underline-offset-4 hover:underline">
          Privacy and service
        </Link>
        <a href="https://joshops.ai/download" className="underline-offset-4 hover:underline">
          Download for your device
        </a>
        <Link to="/install" className="underline-offset-4 hover:underline">
          Install web app
        </Link>
        <Link to="/connect" className="underline-offset-4 hover:underline">
          Connect your AI
        </Link>
        <a href={SUPPORT_URL}>Support</a>
        <a href={DISCUSSIONS_URL}>Discussions</a>
        <a href={SECURITY_REPORT_URL}>Report a security issue</a>
      </footer>
    </div>
  );
}
