import smileLogo from "@/assets/joshops-ai-logo.png.asset.json";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MasterHandoff, MASTER_ORIGIN, type MasterErrorReason, type MasterState } from "@/lib/masterHandoff";
import { ActivationPanel } from "@/components/billing/ActivationPanel";
import { useMasterBilling } from "@/components/billing/useMasterBilling";
import { useMasterAccess } from "@/components/billing/useMasterAccess";
import { CoveredMonth, InvitationPanel } from "@/components/billing/AccessPanels";

const FRAME_LOAD_TIMEOUT_MS = 30_000;
const FRAME_ALLOW = ["microphone", "camera", "clipboard-read", "clipboard-write", "fullscreen"]
  .map((p) => `${p} ${MASTER_ORIGIN}`)
  .join("; ");

const ERRORS: Record<MasterErrorReason, { title: string; body: string }> = {
  session: { title: "We couldn't confirm your sign-in", body: "Try again, or sign out and sign back in." },
  unreachable: { title: "Can't reach your workspace right now", body: "Check your connection and try again." },
  invalid: {
    title: "Your workspace didn't open",
    body: "Something about the connection didn't look right, so we stopped. Please try again.",
  },
  expired: { title: "Your workspace session ended", body: "Reconnect to pick up where you left off." },
};

/** The signed-in app: the existing native Master app, full viewport. */
export default function MasterWorkspace() {
  const ctlRef = useRef<MasterHandoff | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const navigate = useNavigate();
  const [state, setState] = useState<MasterState>({ phase: "loading" });
  const [loadedMount, setLoadedMount] = useState<number | null>(null);

  useEffect(() => {
    const ctl = new MasterHandoff({ auth: supabase.auth });
    ctlRef.current = ctl;
    const off = ctl.subscribe(setState);
    const onMessage = (ev: MessageEvent) => {
      if (ctl.message(ev, frameRef.current?.contentWindow ?? null) === "account") void navigate({ to: "/account" });
    };
    window.addEventListener("message", onMessage);
    ctl.start();
    return () => {
      window.removeEventListener("message", onMessage);
      off();
      ctl.dispose();
      if (ctlRef.current === ctl) ctlRef.current = null;
    };
  }, [navigate]);

  const mount = state.phase === "ready" ? state.mount : null;
  useEffect(() => {
    if (mount === null || loadedMount === mount) return;
    const t = window.setTimeout(() => ctlRef.current?.frameTimedOut(mount), FRAME_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [mount, loadedMount]);

  const retry = () => ctlRef.current?.retry();
  const signOut = () => void ctlRef.current?.signOut();

  if (state.phase === "ready") {
    return (
      <div className="master-root">
        {/* Keyboard route to the account page; visible only when focused, so the workspace stays unobscured. */}
        <Link to="/account" className="master-account-link">
          Account
        </Link>
        <iframe
          key={state.mount}
          ref={frameRef}
          src={state.src}
          title="JoshOps AI workspace"
          allow={FRAME_ALLOW}
          className="master-frame"
          onLoad={() => setLoadedMount(state.mount)}
        />
        {loadedMount !== state.mount && (
          <div className="master-overlay pw-gate" aria-busy="true" role="status">
            <img src={smileLogo.url} alt="" className="pw-gate-logo" />
            <p>Opening your workspace…</p>
          </div>
        )}
      </div>
    );
  }

  if (state.phase === "activation")
    return (
      <Activation
        key={state.principalId}
        principalId={state.principalId}
        email={state.email}
        afterActive={state.afterActive}
        onActive={() => ctlRef.current?.retryAfterActivation()}
        onOpenPothos={retry}
        onSignOut={signOut}
      />
    );

  if (state.phase === "loading" || state.phase === "signed-out")
    return (
      <main className="pw-gate" aria-busy="true">
        <img src={smileLogo.url} alt="" className="pw-gate-logo" />
        <p role="status">{state.phase === "loading" ? "Opening your workspace…" : "Signing you out…"}</p>
      </main>
    );

  const copy =
    state.phase === "unavailable"
      ? {
          title: "Your workspace isn't ready yet",
          body: "PothOS hasn't been set up for this account yet. You can try again later or sign out.",
        }
      : ERRORS[state.reason];
  return (
    <main className="pw-gate">
      <img src={smileLogo.url} alt="" className="pw-gate-logo" />
      <h1>{copy.title}</h1>
      <p role="alert">{copy.body}</p>
      <div className="pw-gate-actions">
        <button type="button" onClick={retry}>
          {state.phase === "error" && state.reason === "expired" ? "Reconnect" : "Retry connection"}
        </button>
        <button type="button" onClick={signOut}>
          Sign out
        </button>
      </div>
    </main>
  );
}

/** In-place state for the account the workspace refused with its old paid admission (402). Never mounts the frame. */
function Activation(props: {
  principalId: string;
  email: string | null;
  afterActive: boolean;
  onActive: () => void;
  onOpenPothos: () => void;
  onSignOut: () => void;
}) {
  const { principalId, email, afterActive, onActive, onOpenPothos, onSignOut } = props;
  const billing = useMasterBilling(onActive);
  // A redeemed invitation or covered month only leads to the real ticket being requested again.
  const access = useMasterAccess((op) => (op === "extension" ? billing.checkAccount() : onOpenPothos()));
  const [signingOut, setSigningOut] = useState(false);
  // Only this account's billing answers are shown; anything else waits for the matching account.
  const s = billing.state && billing.state.principalId === principalId ? billing.state : null;
  const acct = s?.account ?? null;
  const accessForThis = access.state?.principalId === principalId ? access : { ...access, state: null };
  const signOut = () => {
    setSigningOut(true);
    onSignOut();
  };

  // A read-only check may reopen the workspace once; after that, opening again is the user's call.
  const autoDone = useRef(false);
  useEffect(() => {
    if (afterActive || autoDone.current || acct?.standing !== "active" || !acct.ready) return;
    autoDone.current = true;
    onActive();
  }, [afterActive, acct, onActive]);

  // Signed in but not invited: the invitation screen, never the workspace or a purchase.
  if (acct?.standing === "invitation_required")
    return (
      <main className="pw-gate pw-gate-act">
        <img src={smileLogo.url} alt="" className="pw-gate-logo" />
        <InvitationPanel access={accessForThis} account={acct} email={email} onCheck={billing.checkAccount} onSignOut={signOut} signingOut={signingOut} />
      </main>
    );

  return (
    <main className="pw-gate pw-gate-act">
      <img src={smileLogo.url} alt="" className="pw-gate-logo" />
      <ActivationPanel
        state={s}
        email={email}
        afterActive={afterActive}
        onCheck={billing.checkAccount}
        onOpenPothos={onOpenPothos}
        onSignOut={signOut}
        signingOut={signingOut}
        covered={acct ? <CoveredMonth account={acct} access={accessForThis} /> : null}
      />
    </main>
  );
}
