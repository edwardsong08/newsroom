# The Working Draft Newsroom System

Version: 0.1 (foundation)

Owner and final editorial authority: Edward Song

Status: documentation and governance only. No private-source ingestion or autonomous publication is enabled by this document.

## Why this exists

The Working Draft is both a public newspaper-like blog and a private, auditable
editorial practice. The newsroom keeps Edward's voice and lived experience at
the center while giving repeatable jobs to specialized agents. Another LLM
should be able to resume work from the repository records without depending on
chat history.

This system has two boundaries:

1. **Private knowledge office:** curated notes, source provenance, permissions,
   timelines, and working packets in an Obsidian vault.
2. **Public publication desk:** approved article copy, credits, taxonomy,
   placement, and the deployed site in this repository.

Private notes are never public by default. A note becomes publishable only after
an explicit editorial and author-approval path.

## Chain of responsibility

```text
Edward Song (Publisher / final authority)
└── Managing Editor / Chief of Staff (single front door)
    ├── Knowledge Office
    │   ├── Historian
    │   ├── Human Index Editor
    │   ├── Knowledge Engineer / Record Keeper
    │   ├── Privacy & Consent Steward
    │   └── Provenance / Fact Checker
    ├── Editorial Board
    │   ├── Developmental Editor
    │   ├── Structure Editor
    │   ├── Voice Editor
    │   ├── Counterpoint / Skeptical Reader
    │   ├── Copy Editor
    │   └── Proofreader
    ├── Writers' Room
    │   ├── Edward (human opinion and lived experience)
    │   ├── Original AI columnists (clearly disclosed)
    │   ├── Assignment writers
    │   └── Lens cards (influence without impersonation)
    └── Publication Desk
        ├── Homepage & Taxonomy Editor
        ├── Art / Experience Director
        ├── Web Producer
        ├── Accessibility Reviewer
        └── Release Examiner
```

The hierarchy is a routing model, not a claim that every role must be a separate
software process. The Managing Editor may call a small panel for a short piece
or a larger panel for a sensitive essay.

## Non-negotiable invariants

- Edward is the final authority on autobiographical truth, privacy, meaning,
  approval, and publication.
- The Managing Editor is the only normal intake and response surface. Specialists
  return findings to it; they do not silently message or publish on their own.
- Access is enforced by the orchestrator and retrieval filters, not merely by a
  sentence in an agent prompt. No role receives the whole vault by default.
- Raw sources are preserved and immutable. Derived notes, indexes, summaries,
  and embeddings always link back to source IDs.
- Every assignment and output has a status, owner, source scope, decision record,
  and next action. Material transitions are checkpointed and audited.
- No agent may invent employers, clients, students, cases, dates, quotations,
  outcomes, credentials, or lived experience. Uncertainty stays visible.
- AI-authored or AI-assisted writing is disclosed. Original fictional columnists
  may have voices, but they cannot present fabricated personal histories.
- A living writer or person the author knows may be used as a declared **lens**
  for techniques and questions, never as an impersonated author. Consent is
  required before publishing material attributed to a real collaborator.
- No article is published without the approval and live-verification gates in
  `docs/EDITORIAL_SYSTEM.md`.

## Canonical records

The public editorial records remain authoritative for article publication:

- `docs/EDITORIAL_SYSTEM.md` — taxonomy, metadata, lifecycle, placement, gates.
- `content/articles/<slug>.md` — canonical article copy.
- `content/ARTICLE_ARCHIVE.md` — article registry.
- `content/WORKING_STATE.md` — resumable active-work checkpoint.
- `content/EDITORIAL_LOG.md` — append-only audit trail.

The private knowledge records and their schemas are defined in
`docs/KNOWLEDGE_VAULT.md`. Agent contracts are in `docs/AGENT_ROSTER.md` and
the end-to-end handoffs are in `docs/EDITORIAL_WORKFLOWS.md`.

## What begins now

This foundation creates the operating model and safe seams for later tooling.
The first implementation slice should be deliberately small:

1. Use the existing portfolio and blog records as a synthetic, low-risk pilot.
2. Create one intake packet and one article seed, then exercise the audit trail.
3. Add Obsidian only after the vault location, backup plan, and privacy tiers are
   confirmed.
4. Add ChatGPT/Codex exports and selected local or Drive folders through an
   allowlist and dry-run inventory.
5. Consider Gmail last, with a narrow query/label scope and an explicit review
   queue. No Gmail connector or broad mailbox scan is assumed here.

There is no autonomous drive scan, mailbox scan, embedding upload, or public
publication in this phase.

## Change control

Changes to taxonomy, metadata, lifecycle statuses, or placement rules must bump
`docs/EDITORIAL_SYSTEM.md`, migrate or explicitly queue affected records, and
append a `SYSTEM_CHANGE` event. Changes to roles, access tiers, or ingestion
rules must update the relevant system document and append an audit event even
when no article changes.

## References

- [ChatGPT use cases](https://learn.chatgpt.com/use-cases)
- [OpenAI Skills API reference](https://developers.openai.com/api/reference/go/resources/skills)
- [Obsidian URI](https://obsidian.md/help/Extending%2BObsidian/Obsidian%2BURI)
- [Obsidian Sync security and privacy](https://obsidian.md/help/Obsidian%20Sync/Security%20and%20privacy)
- [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data)
