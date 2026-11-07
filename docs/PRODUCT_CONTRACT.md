# PothOS product contract

Updated November 7, 2026. This is the common public reference for product identity,
official entry points, operator boundaries and release ownership. The
[machine-readable companion](product-contract.json) records the same requirements.
These requirements do not certify unfinished runtime or platform work.

## One product, one official front door

**PothOS by JoshOps AI** is the product. The existing **Personal PothOS** is its
official web front door for individuals, nonprofits and businesses. Each operator
uses their own identity, data, ArcheAgents and permitted connections.

| Purpose | Official location |
| --- | --- |
| Start with Personal PothOS | https://pothos.joshops.ai |
| Open the application | https://pothos.joshops.ai/app |
| Connect a chosen assistant or provider | https://pothos.joshops.ai/connect |
| Company | https://joshops.ai |
| Product source and contributions | [PothOS-by-JoshOps-AI](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI) |
| Help and reports | [Support](../SUPPORT.md) and [issues](https://github.com/joshuagjuarez/PothOS-by-JoshOps-AI/issues) |
| Official project decisions | [Governance](../GOVERNANCE.md) |
| Reuse rights and pending terms | [License status](../LICENSE_STATUS.md) |
| Cognitive privacy | [Privacy](PRIVACY.md) |
| Verified availability and remaining work | [Release status](RELEASE_STATUS.md) and [distribution](DISTRIBUTION.md) |

## One feature set, account-specific state

PothOS must provide every operator, including the project owner, the same feature
set and account-security model. Founder status does not define a separate
feature tier. A verified sign-in must open the operator's own permitted
environment. An established account must retain its history, configured agents,
registered fleet, roles and settings; a new account must establish its own state
through the same product mechanisms.

The existing identity and Membership owners must resolve a verified sign-in to
the correct native principal, account/World memberships and permitted resources.
An email string, role name or plugin title does not grant access. Discovery,
work execution, credentials and receipt recovery must keep that derived scope.

Biography, memory, corpus, legacy-work, agent configuration and node enrollment
are reusable product capabilities. An operator's accumulated records, named
agents, device registrations and granted permissions are that account's state.
A public package excludes private records and bindings while retaining the
reusable mechanisms. Updating or adopting the common product must preserve an
existing operator's state and source lineage.

Private account connections and customer-preview packages describe current
integration and distribution states. They do not establish different products
or authorize a reduced customer feature set. The current customer runtime
connection is unfinished; written parity requirements do not establish that it
is already working.

Qualification must demonstrate two independently authenticated accounts on the
same supported build: the same feature contract with each account's own
configured resources; recovery of an existing account's history and fleet;
normal enrollment of a new account and its nodes; refusal of unauthorized cross-account data,
device and receipt requests; and correct scope after account switching,
membership revocation and restart. Preserve original work and receipt identities
without replaying completed effects.

## Product and operator commitments

- **Official PothOS software is free of charge, always.** The direction includes
  personal, nonprofit and ordinary business use. Optional third-party services,
  hardware and provider usage retain their own disclosed costs.
- **Release the existing application and reusable capabilities.** Preserve shared
  profile, identity, memory, ArcheAgent, recovery, accessibility and developer
  mechanisms where implemented. Remove operator-specific instances, private data,
  credentials and configuration from a public package.
- **Each person starts with their own information.** A common URL does not share
  accounts, private memory, agents or authority. Local data and external
  connections must remain under that operator's permissions and choices.
- **Josh maintains official PothOS releases.** The project owner,
  [joshuagjuarez](https://github.com/joshuagjuarez), retains official direction,
  acceptance, branding, publication and release decisions. Community contributors
  can improve UI, accessibility, robotics and other components through the
  existing contribution process. Contribution does not itself grant access.
- **Reuse rights come from applicable licenses.** Product governance and
  downstream license rights are distinct. No final runtime license is applied by
  this contract; earlier scoped documentation grants remain effective.

## Surfaces and release evidence

Continue the existing native application, shared runtime and provider adapters
for Apple, Android, desktop and assistant connections. Each platform package and
provider or device adapter needs its own supported configuration and verification.
A web entry or connection kit does not establish that every installer, store
listing, local model, provider or smart device is ready.

The isolated community browser/source export candidate is preparation only. It
is not the public front door or an accepted replacement for Personal PothOS or the
native application.

The public product repository currently contains documentation and community
materials. A standalone runtime source release and signed customer packages
remain unfinished. Before promoting a supported release, verify new-operator
setup, independent data and permissions, a useful task, restart/recovery, updates
and rollback. Publish the exact source, artifact, applicable terms and remaining
limits through the existing official entry and release records.
