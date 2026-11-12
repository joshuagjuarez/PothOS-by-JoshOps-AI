import smileLogo from "@/assets/joshops-ai-logo.png.asset.json";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { oauthReturnPath, rememberReturn, takeReturn } from "@/lib/oauthConsent";
import { hasPending } from "@/lib/pendingInvitation";

export const Route = createFileRoute("/auth")({
  // Only the allowlisted consent path survives; anything else is dropped.
  validateSearch: (s: Record<string, unknown>): { next?: string } => {
    const next = oauthReturnPath(s["next"]);
    return next ? { next } : {};
  },
  head: () => ({
    meta: [
      { title: "Sign in | JoshOps AI" },
      { name: "description", content: "Sign in to PothOS and continue in your World: memory, projects and ArcheAgents that carry your work forward." },
      { property: "og:title", content: "Sign in | JoshOps AI" },
      { property: "og:description", content: "Sign in to PothOS and continue in your World: memory, projects and ArcheAgents that carry your work forward." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pothos.joshops.ai/auth" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Sign in | JoshOps AI" },
      { name: "twitter:description", content: "Sign in to PothOS and continue in your World: memory, projects and ArcheAgents that carry your work forward." },
    ],
    links: [{ rel: "canonical", href: "https://pothos.joshops.ai/auth" }],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";
const PROVIDER_LABEL = { google: "Google", apple: "Apple" } as const;

function AuthPage() {
  const navigate = useNavigate();
  // Re-validated here: unknown raw search keys can survive alongside validateSearch output.
  const returnTo = oauthReturnPath(Route.useSearch().next);
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [invited, setInvited] = useState(false);

  useEffect(() => {
    setInvited(hasPending());
    void supabase.auth.getSession().then(({ data }) => {
      const pending = takeReturn();
      if (data.session) go(returnTo ?? pending);
      else if (pending && !returnTo) rememberReturn(pending);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** After sign-in: the validated consent page if one was requested, then a pending invitation
   *  (fixed path, never taken from the URL), otherwise the app. */
  function go(path: string | null) {
    const safe = oauthReturnPath(path);
    if (safe) navigate({ href: safe, replace: true });
    else if (hasPending()) navigate({ to: "/invite", replace: true });
    else navigate({ to: "/app" });
  }

  async function oauth(provider: "google" | "apple") {
    setLoading(true);
    if (returnTo) rememberReturn(returnTo);
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + "/auth" });
    if (result.error) {
      toast.error(`${PROVIDER_LABEL[provider]} sign-in didn't work. It may not be turned on yet — try email instead.`);
      setLoading(false);
      return;
    }
    if (!result.redirected) go(takeReturn() ?? returnTo);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setNotice("");
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: returnTo ? `${location.origin}/auth?next=${encodeURIComponent(returnTo)}` : `${location.origin}/app`,
            data: { name },
          },
        });
        if (error) throw error;
        if (data.session) go(returnTo);
        else setNotice("Check your email to confirm your account, then sign in.");
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        go(returnTo);
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/reset-password` });
        if (error) throw error;
        setNotice("If the account exists, a reset link is on its way.");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen fog-bg flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm glass-strong rounded-2xl p-6 space-y-5">
        <div className="text-center">
          <h1 className="display flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-lg">
            <img src={smileLogo.url} alt="" className="h-7 w-7 shrink-0" />
            JoshOps AI
          </h1>
          <p className="text-xs text-muted-foreground mt-2">Your PothOS. Your ArcheAgent.</p>
          {returnTo && <p className="text-sm mt-3">Sign in to continue connecting an app to your PothOS account.</p>}
          {!returnTo && invited && <p className="text-sm mt-3">Sign in or create your own account to accept your invitation.</p>}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" disabled={loading} onClick={() => void oauth("google")}>
            Google
          </Button>
          <Button variant="outline" disabled={loading} onClick={() => void oauth("apple")}>
            Apple
          </Button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <label className="space-y-1 block">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
          )}
          <label className="space-y-1 block">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          {mode !== "forgot" && (
            <label className="space-y-1 block">
              <Label>Password</Label>
              <Input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
          )}
          <Button className="w-full" disabled={loading}>
            {mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}
          </Button>
        </form>
        {notice && (
          <p role="status" className="text-sm text-primary">
            {notice}
          </p>
        )}
        <div className="flex justify-between text-xs text-muted-foreground">
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "Create account" : "Sign in"}</button>
          <button onClick={() => setMode("forgot")}>Forgot?</button>
        </div>
        <Link to="/" className="block text-center text-xs">
          ← back
        </Link>
      </div>
    </div>
  );
}
