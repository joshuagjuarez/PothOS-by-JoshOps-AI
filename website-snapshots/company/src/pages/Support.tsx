import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PublicPage from "@/components/PublicPage";
import { CONTACT_EMAIL, CONTACT_TOPICS, contactHref } from "@/lib/contact";
import { PERSONAL_APP_URL, POTHOS_BUILD_WITH_US_URL, POTHOS_DISCUSSIONS_URL, POTHOS_SECURITY_URL } from "@/lib/personalApp";
import { RELEASE_ISSUES_URL } from "@/lib/releases";

export default function Support() {
  return <PublicPage title="Support and contact" kicker="Help with PothOS and JoshOps AI"
    description="Get PothOS help in the open, report security issues privately, or email JoshOps AI about private business.">
    <article className="idea" id="product-support"><div><p className="kicker">PothOS support</p><h2>Ask in the open.</h2><p>Use the public issue forms for bugs, setup questions and device access, and Discussions for ideas and questions. Report security issues privately.</p>
      <p className="jo-inline-links">
        <a className="btn-primary" href={RELEASE_ISSUES_URL}>Open an issue form <ArrowUpRight size={16} aria-hidden="true" /></a>
        <a href={POTHOS_DISCUSSIONS_URL}>Discussions <ArrowUpRight size={16} aria-hidden="true" /></a>
        <a href={POTHOS_SECURITY_URL}>Report a security issue privately <ArrowUpRight size={16} aria-hidden="true" /></a>
        <a href={POTHOS_BUILD_WITH_US_URL}>Build with us <ArrowUpRight size={16} aria-hidden="true" /></a>
      </p></div></article>
    <article className="idea"><div><p className="kicker">Start here</p><h2>Keep control of the account.</h2><p>For sign-in trouble, stop after a failed recovery attempt and use the account recovery path shown by PothOS. Never send a password, recovery code, private key, or full source corpus in a support message.</p><p><Link to="/docs">Read public documentation</Link></p></div></article>
    <article className="idea" id="contact" aria-labelledby="contact-title"><div><p className="kicker">Contact</p><h2 id="contact-title">Private business contact.</h2><p>For private business, press, PurposeLink and Bare Sole Media conversations, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Each topic below fills in the subject. PothOS product support happens in the issue forms and Discussions above.</p>
      <ul className="jo-contact-list">
        {CONTACT_TOPICS.map((topic) => (
          <li key={topic.id}>
            <a className="jo-contact-link" href={contactHref(topic)} aria-label={`Email JoshOps AI about ${topic.label}`}>
              <span className="jo-contact-label">{topic.label}<ArrowUpRight size={16} aria-hidden="true" /></span>
              <span className="jo-contact-summary">{topic.summary}</span>
              <span className="jo-contact-subject">Subject: {topic.subject}</span>
            </a>
          </li>
        ))}
      </ul>
    </div></article>
    <article className="idea" id="report"><div><p className="kicker">A useful report</p><h2>Describe what happened.</h2><p>Include your operating system, device model, AI accounts you intend to use, connectivity, accessibility needs, first task, and a time window. Add the visible error and what happened just before it.</p><p>Do not include passwords, tokens, IMEI or MAC addresses, diagnoses, or client and student records.</p></div></article>
    <article className="idea"><div><p className="kicker">Setup help</p><h2>Getting started with PothOS.</h2><p>For help setting up your ArcheAgent, devices or supported connections, <a href={RELEASE_ISSUES_URL}>open an issue form</a> with the device, the AI accounts you use and your first task. Opening an issue doesn’t create an account or a support agreement.</p><a className="btn-primary" href={PERSONAL_APP_URL}>Sign in or create an account</a></div></article>
  </PublicPage>;
}
