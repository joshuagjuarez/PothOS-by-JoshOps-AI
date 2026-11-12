/**
 * Browser install-prompt lifecycle. The install button exists only while the browser has
 * supplied a `beforeinstallprompt` event; it disappears after use, dismissal or installation.
 * No storage, network or service worker is involved.
 */
export interface DeferredPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
export type InstallState = { available: boolean; installed: boolean; busy: boolean };

export function createInstallController(target: Pick<Window, "addEventListener" | "removeEventListener">) {
  let deferred: DeferredPrompt | null = null;
  let state: InstallState = { available: false, installed: false, busy: false };
  const subs = new Set<(s: InstallState) => void>();
  const set = (p: Partial<InstallState>) => {
    state = { ...state, ...p };
    subs.forEach((f) => f(state));
  };
  const onPrompt = (e: Event) => {
    e.preventDefault();
    if (state.installed) return;
    deferred = e as DeferredPrompt;
    set({ available: true });
  };
  const onInstalled = () => {
    deferred = null;
    set({ available: false, installed: true, busy: false });
  };
  target.addEventListener("beforeinstallprompt", onPrompt);
  target.addEventListener("appinstalled", onInstalled);
  return {
    get state() {
      return state;
    },
    subscribe(f: (s: InstallState) => void) {
      subs.add(f);
      return () => void subs.delete(f);
    },
    async install(): Promise<"accepted" | "dismissed" | "unavailable"> {
      const p = deferred;
      if (!p || state.busy) return "unavailable";
      deferred = null; // a prompt event can be used only once
      set({ busy: true });
      try {
        await p.prompt();
        const { outcome } = await p.userChoice;
        // Accepting the prompt is only a request; installed is set solely by `appinstalled`.
        set({ available: false, busy: false });
        return outcome;
      } catch {
        set({ available: false, busy: false });
        return "unavailable";
      }
    },
    dispose() {
      target.removeEventListener("beforeinstallprompt", onPrompt);
      target.removeEventListener("appinstalled", onInstalled);
      subs.clear();
    },
  };
}

export type InstallOutcome = "accepted" | "dismissed" | "unavailable" | null;
/** Visible status: confirmed installation always wins over an earlier prompt answer. */
export function installStatus(state: InstallState, last: InstallOutcome): string {
  if (state.installed) return "JoshOps AI is installed on this device.";
  if (last === "accepted") return "Installation requested. Follow your browser\u2019s instructions.";
  if (last === "dismissed") return "Not installed. You can use the steps below at any time.";
  return "";
}
