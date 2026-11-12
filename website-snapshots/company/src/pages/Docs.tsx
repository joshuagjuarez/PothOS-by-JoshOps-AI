import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";
import { nativeReleaseSummary } from "@/lib/releases";
import { HELP_EMAIL } from "@/lib/contact";
import {
  PERSONAL_APP_URL,
  POTHOS_ACTIVATION,
  POTHOS_RELEASE_STATUS,
  POTHOS_SEPARATE_COSTS,
  POTHOS_FIRST_RELEASE,
  POTHOS_PRIVACY_URL,
  POTHOS_PURPOSE,
  POTHOS_OWN_AAS,
  POTHOS_COGNITIVE_PRIVACY,
  POTHOS_VOICE_STATUS,
  POTHOS_CONTRIBUTE,
  POTHOS_COMMUNITY_SUPPORT,
  POTHOS_COMMUNITY_HUB_URL,
  POTHOS_CONTRIBUTION_THREAD_URL,
  POTHOS_LICENSE_NOTICE_URL,
  POTHOS_ISSUES_URL,
  POTHOS_DOCS_SUPPORT_URL,
  PURPOSE_LINK_URL,
  PURPOSE_LINK_NOTE,
} from "@/lib/personalApp";

const availability: { surface: string; status: string }[] = [
  { surface: "Browser", status: "Where you start — sign in or create an account" },
  ...nativeReleaseSummary().map((release) => ({ surface: release.platform, status: release.status + ("signature" in release ? `; ${release.signature}` : "") })),
  { surface: "IDE / terminal, HelpDesk and Huddle", status: "Running in the Founder’s stack; customer access in qualification" },
];

export default function Docs() {
  return (
    <div className="product-page jo-site">
      <PageHead
        title="PothOS Help, setup & availability"
        description="How to start with PothOS: sign in, ArcheAgents and devices, bring your own AI accounts, Worlds, Talk and Work, and where PothOS runs today."
        path="/docs"
      />
      <Header />
      <main id="main" tabIndex={-1} className="simple-page docs">
        <p className="kicker">Help & setup</p>
        <h1>Start with the browser.</h1>
        <section id="sign-in">
          <h2>Accept your invitation</h2>
          <p>
            {POTHOS_ACTIVATION} One account opens your permitted Worlds on every interface you use.
          </p>
          <p>
            {POTHOS_FIRST_RELEASE} Read the <a href={POTHOS_PRIVACY_URL}>PothOS privacy &amp; service page</a>, or
            email <a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a> for help.
          </p>
          <a className="btn-primary" href={PERSONAL_APP_URL}>
            Open PothOS
          </a>
        </section>
        <section id="nodes">
          <h2>ArcheAgents and devices</h2>
          <p>
            PothOS software is free, with no per-ArcheAgent fee. Each ArcheAgent has one persistent
            home for its memory and work. You can reach it from your phone, tablet, computer, browser or a plugin —
            devices and Worlds never add a charge. One account can have several ArcheAgents, and on supported hardware one
            machine can run several of them, each kept separate.
          </p>
          <p>
            ArcheAgents can call on other agents and work with other PothOS systems only with the permissions you grant
            for selected Worlds and projects. That doesn’t share your personal memory or give unrestricted access.
          </p>
          <p>
            {POTHOS_RELEASE_STATUS} {POTHOS_SEPARATE_COSTS}
          </p>
        </section>
        <section id="connections">
          <h2>Bring your own AI accounts</h2>
          <p>
            Connect your own ChatGPT or Codex account, or other supported accounts. Connecting a provider is separate
            from signing in, and those subscriptions stay with the provider. Provider credentials stay out of the
            browser and out of your memory files.
          </p>
          <p>
            Local-first work and supported subscription or CLI connections reduce how much you depend on metered APIs.
            Your providers’ and hosts’ terms still apply.
          </p>
        </section>
        <section id="worlds">
          <h2>Worlds, projects and ArcheAgents</h2>
          <p>
            A World is a part of your life or work. Projects live inside a World. An ArcheAgent is a continuing digital
            representative with its own identity, memory and responsibilities, and it develops with you — whichever
            engine you choose. The name joins the Greek <em>archē</em> (beginning, origin, principle) with{" "}
            <em>agent</em>, one that acts.
          </p>
          <p>
            Each World has its own sharing boundary. Personal memory isn’t shared into a work World unless you choose to
            share it.
          </p>
        </section>
        <section id="talk-work">
          <h2>Talk and Work</h2>
          <p>
            Work runs separately from your conversation. Keep talking while it continues; asking about a run doesn’t
            change it. Drafts and work packets can be copied out for use elsewhere — nothing is sent to another
            provider automatically.
          </p>
          <p>
            Sharing a World lets people work from the same sources and runs. It isn’t screen sharing or remote control
            of a device; those aren’t available in PothOS today.
          </p>
        </section>
        <section id="availability">
          <h2>Where PothOS runs today</h2>
          <p>
            The browser is where you start today. Richer interactive capabilities keep rolling out inside the same
            PothOS app, and other surfaces already run in the Founder’s own stack and open to customers as they
            qualify.
          </p>
          <ul className="avail-list">
            {availability.map((a) => (
              <li key={a.surface}>
                <b>{a.surface}</b>
                <span>{a.status}</span>
              </li>
            ))}
          </ul>
          <p>
            Choose your device on <Link to="/download">Downloads</Link>. The connected web beta is available now to invited testers; native apps appear
            there as each release becomes available.
          </p>
          <p>
            Where a host is enrolled, local foundation models such as Nemotron or Apple Foundation Models can be
            configured, with power controls for local model use.
          </p>
        </section>
        <section id="open-development">
          <h2>A free community project</h2>
          <p>{POTHOS_PURPOSE}</p>
          <p>{POTHOS_RELEASE_STATUS}</p>
          <p>{POTHOS_OWN_AAS}</p>
          <p>{POTHOS_COGNITIVE_PRIVACY}</p>
          <p>{POTHOS_VOICE_STATUS} {POTHOS_CONTRIBUTE}</p>
          <p>
            <a href={POTHOS_COMMUNITY_HUB_URL} target="_blank" rel="noopener noreferrer">PothOS repository</a>
            {" "}&middot; <a href={POTHOS_CONTRIBUTION_THREAD_URL} target="_blank" rel="noopener noreferrer">Community discussion</a>
            {" "}&middot; <a href={POTHOS_ISSUES_URL} target="_blank" rel="noopener noreferrer">Bugs and contributions</a>
            {" "}&middot; <a href={POTHOS_LICENSE_NOTICE_URL} target="_blank" rel="noopener noreferrer">Licensing notice</a>
            {" "}&middot; <a href={POTHOS_DOCS_SUPPORT_URL} target="_blank" rel="noopener noreferrer">Support guide</a>
          </p>
          <p>{POTHOS_COMMUNITY_SUPPORT} <Link to="/support#contact">Contact options</Link>.</p>
          <p>
            {PURPOSE_LINK_NOTE}{" "}
            <a href={PURPOSE_LINK_URL} target="_blank" rel="noopener noreferrer">Visit Purpose Link</a>.
          </p>
        </section>
        <section id="offline">
          <h2>If a connection drops</h2>
          <p>
            Your draft stays in the composer. Reconnect or sign in again and pick up where you left off — PothOS tells
            you plainly when it can’t answer.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
