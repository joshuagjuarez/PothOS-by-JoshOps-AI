// One public contact source. Every topic is a plain email link with its own
// subject prefix; there is no form, ticketing or inbox sync. Routine PothOS
// support goes to public GitHub issue forms and Discussions, not this mailbox.
export const CONTACT_EMAIL = "joshua@joshops.ai";
export const HELP_EMAIL = CONTACT_EMAIL;
export const CONTACT_PATH = "/support#contact";

export interface ContactTopic {
  id: string;
  label: string;
  subject: string;
  summary: string;
  /** Destination address; defaults to the company address. */
  email?: string;
}

export const CONTACT_TOPICS: ContactTopic[] = [
  { id: "business", label: "General business", subject: "[JoshOps AI Business]", summary: "Partnerships, services and company questions." },
  { id: "press", label: "Press and interviews", subject: "[JoshOps AI Press]", summary: "Interviews, media requests and speaking." },
  { id: "purposelink", label: "PurposeLink participation", subject: "[PurposeLink]", summary: "Tell us your role and how you would like to collaborate. Please leave out private client records." },
  { id: "bare-sole-media", label: "Bare Sole Media production", subject: "[Bare Sole Media]", summary: "Photography, video and storytelling projects." },
];

export function topicEmail(topic: Pick<ContactTopic, "email">): string {
  return topic.email ?? CONTACT_EMAIL;
}

export function contactHref(topic: Pick<ContactTopic, "subject" | "email">): string {
  return `mailto:${topicEmail(topic)}?subject=${encodeURIComponent(topic.subject)}`;
}
