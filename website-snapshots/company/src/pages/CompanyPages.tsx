import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PublicPage from "@/components/PublicPage";
import { TalkVisual, WorldsVisual } from "@/components/site/ProductVisuals";
import { PERSONAL_APP_URL, POTHOS_ACTIVATION, POTHOS_DEFINITION, POTHOS_TAGLINE, POTHOS_USES, POTHOS_USES_NOTE, POTHOS_RELEASE_STATUS, JOSHOPS_POSITIONING, JOSHOPS_GWS, POTHOS_BUILD_WITH_US, POTHOS_BUILD_WITH_US_URL, POTHOS_DISCUSSIONS_URL, POTHOS_SUPPORT_PROJECT_URL } from "@/lib/personalApp";

function UsesAndBuild() {
  return (
    <>
      <article className="idea">
        <div>
          <p className="kicker">One environment, four uses</p>
          <h2>Personal, Entrepreneur, Enterprise, Developer.</h2>
          <ul>{POTHOS_USES.map((u) => <li key={u.name}><b>{u.name}.</b> {u.text}</li>)}</ul>
          <p>{POTHOS_USES_NOTE} {JOSHOPS_GWS}</p>
          <p>{POTHOS_RELEASE_STATUS}</p>
          <Link className="jo-link" to="/download">Download JoshOps AI <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </article>
      <article className="idea">
        <div>
          <p className="kicker">Build with us</p>
          <h2>Help shape what comes next.</h2>
          <p>{POTHOS_BUILD_WITH_US}</p>
          <p className="jo-inline-links">
            <a className="jo-link" href={POTHOS_BUILD_WITH_US_URL}>Build with us <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="jo-link" href={POTHOS_DISCUSSIONS_URL}>Discussions <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="jo-link" href={POTHOS_SUPPORT_PROJECT_URL}>Support the project <ArrowUpRight size={16} aria-hidden="true" /></a>
          </p>
        </div>
      </article>
    </>
  );
}
import { PURPOSE_LINK_URL } from "@/lib/siteNav";
import purposeLinkIcon from "@/assets/ventures/purpose-link-icon.png.asset.json";
import bareSoleArt from "@/assets/ventures/bare-sole-media-logo.jpg.asset.json";
import portableImg from "@/assets/home/research-portable.jpg";
import roboticsImg from "@/assets/home/research-robotics.jpg";
import screensImg from "@/assets/home/research-screens.jpg";

export function Products() {
  return (
    <PublicPage
      title="Products"
      kicker="JoshOps AI products"
      description={JOSHOPS_POSITIONING}
      actions={
        <>
          <Link className="jo-btn jo-btn-primary" to="/pothos">Explore PothOS</Link>
          <a className="jo-btn jo-btn-quiet" href={PERSONAL_APP_URL}>Try PothOS</a>
          <p className="jo-fine jo-actions-note">{POTHOS_ACTIVATION}</p>
        </>
      }
      media={<TalkVisual className="jo-ratio-hero" />}
    >
      <article className="idea">
        <div>
          <p className="kicker">PothOS</p>
          <h2>{POTHOS_TAGLINE}</h2>
          <p>
            {POTHOS_DEFINITION} PothOS is free, always, for personal, nonprofit and business use.
          </p>
          <p className="jo-inline-links">
            <Link className="jo-link" to="/pothos">PothOS <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link className="jo-link" to="/pricing">Pricing <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link className="jo-link" to="/docs">Documentation <ArrowRight size={16} aria-hidden="true" /></Link>
          </p>
        </div>
      </article>
      <UsesAndBuild />
    </PublicPage>
  );
}

export function Ventures() {
  return (
    <PublicPage title="Ventures" kicker="Ideas with a human purpose" description="JoshOps AI develops ventures where technology can support community service and creative work.">
      <article className="idea jo-idea-media" id="purpose-link">
        <div>
          <p className="kicker">Purpose Link</p>
          <div className="jo-media jo-ratio-venture jo-venture-mark">
            <img src={purposeLinkIcon.url} alt="Purpose Link mark" width={512} height={512} loading="lazy" decoding="async" />
          </div>
          <h2>Finding the next useful connection.</h2>
          <p>Purpose Link is a community-resource navigation venture in Houston, helping people find relevant paths through local support.</p>
          <a className="jo-btn jo-btn-primary" href={PURPOSE_LINK_URL} target="_blank" rel="noopener noreferrer">
            Visit Purpose Link <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </article>
      <article className="idea jo-idea-media" id="bare-sole-media">
        <div>
          <p className="kicker">Bare Sole Media</p>
          <div className="jo-media jo-ratio-venture">
            <img src={bareSoleArt.url} alt="Bare Sole Media sunset artwork" width={1536} height={1024} loading="lazy" decoding="async" />
          </div>
          <h2>Creative work that stays close to the story.</h2>
          <p>Bare Sole Media explores photography, video, and storytelling rooted in people, place, and lived experience.</p>
        </div>
      </article>
    </PublicPage>
  );
}

export function Research() {
  return (
    <PublicPage
      title="Public R&D"
      kicker="Research at JoshOps AI"
      description="We explore practical software, portable interfaces, and robotics that can meet people where their work happens."
      actions={
        <>
          <Link className="jo-btn jo-btn-primary" to="/pothos">Explore PothOS</Link>
          <Link className="jo-btn jo-btn-quiet" to="/learn">Learn</Link>
        </>
      }
      media={
        <div className="jo-media jo-ratio-hero">
          <img src={screensImg} alt="A phone, tablet and laptop each showing the same copper presence" width={900} height={1125} decoding="async" />
        </div>
      }
    >
      <article className="idea">
        <div>
          <p className="kicker">Research direction</p>
          <h2>From screen to field.</h2>
          <p>Our current research considers how useful context and tools can continue across screens, portable interfaces, and robotics. This work is in research and development.</p>
        </div>
      </article>
      <article className="idea jo-idea-media" id="screens">
        <div>
          <p className="kicker">Continuity across screens</p>
          <h2>One presence, many screens.</h2>
          <p>How the same ArcheAgent and World can follow a person between phone, tablet and computer without making every device identical.</p>
        </div>
      </article>
      <article className="idea jo-idea-media" id="portable">
        <div>
          <p className="kicker">Portable interfaces</p>
          <div className="jo-media jo-ratio-venture">
            <img src={portableImg} alt="A small portable device prototype with a copper light" width={900} height={1125} loading="lazy" decoding="async" />
          </div>
          <h2>Context you can carry.</h2>
          <p>Exploring small, portable ways to reach your World. These are research directions, not hardware compatibility promises.</p>
        </div>
      </article>
      <article className="idea jo-idea-media" id="robotics">
        <div>
          <p className="kicker">Robotics</p>
          <div className="jo-media jo-ratio-venture">
            <img src={roboticsImg} alt="A compact robotic arm prototype on a workbench" width={900} height={1125} loading="lazy" decoding="async" />
          </div>
          <h2>Tools that keep the thread.</h2>
          <p>Studying how continuing context could guide physical tools safely, with people in charge. Nothing here is a product announcement.</p>
        </div>
      </article>
      <article className="idea">
        <div>
          <p className="kicker">Available today</p>
          <h2>Start with PothOS.</h2>
          <p>PothOS is our featured software product. Sign in or create an account to give your ArcheAgent a continuing home.</p>
          <Link className="jo-link" to="/pothos">Explore PothOS <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </article>
    </PublicPage>
  );
}

export function Business() {
  return (
    <PublicPage
      title="PothOS for business"
      kicker="Business"
      description="Entrepreneurs organize ventures, contacts and repeatable work. Enterprise teams coordinate accountable work and connect authorized Google Workspace services. Same JoshOps AI environment, free."
      actions={
        <>
          <a className="jo-btn jo-btn-primary" href={PERSONAL_APP_URL}>Try PothOS</a>
          <Link className="jo-btn jo-btn-quiet" to="/pricing">Pricing</Link>
        </>
      }
      media={<WorldsVisual className="jo-ratio-hero" />}
    >
      <article className="idea">
        <div>
          <p className="kicker">Today</p>
          <h2>A small business, in its own World.</h2>
          <p>
            Give scheduling, ordering and bookkeeping their own ArcheAgents, working together in the World you share with your team. PothOS software is free, so more ArcheAgents, devices and Worlds never add a software charge.
          </p>
          <Link className="jo-link" to="/pothos#worlds">See how Worlds work <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </article>
      <article className="idea">
        <div>
          <p className="kicker">Boundaries</p>
          <h2>Work stays work.</h2>
          <p>Personal memory isn’t shared into a business World unless you choose to share it. ArcheAgents cooperate only with the permissions you grant, for the Worlds and projects you select.</p>
        </div>
      </article>
      <UsesAndBuild />
    </PublicPage>
  );
}

export function Developers() {
  return (
    <PublicPage
      title="Developers"
      kicker="Build with PothOS"
      description="Use connected chat to invoke permitted local tools and workflows, read and edit source, run supported checks and recover work."
      actions={
        <>
          <Link className="jo-btn jo-btn-primary" to="/docs#connections">Connect your accounts</Link>
          <Link className="jo-btn jo-btn-quiet" to="/pothos#stack">How PothOS is built</Link>
        </>
      }
    >
      <article className="idea">
        <div>
          <p className="kicker">Today</p>
          <h2>Bring your own engines.</h2>
          <p>Connect your own ChatGPT or Codex account, or other supported accounts and CLIs. Connecting a provider is separate from signing in, and those subscriptions stay with the provider.</p>
          <Link className="jo-link" to="/docs#connections">Read the connection guide <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </article>
      <UsesAndBuild />
    </PublicPage>
  );
}
