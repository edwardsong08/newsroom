# Working Draft as a Personal Brain Client

**Version:** 0.1  
**Date:** 2026-09-04  
**Status:** Proposed integration; documentation only

The Working Draft is the first application over Edward's personal knowledge
platform. It is a newspaper agency and editorial surface, not the owner of the
life vault.

## Authority boundary

```text
Personal Systems Director / Me Brain
├── source registry, raw evidence, canonical knowledge, privacy, provenance
├── review, correction, deletion, synchronization, and audit
└── approved editorial packet
    └── Working Draft newsroom
        ├── writers and editorial panel
        ├── taxonomy and placement desk
        ├── publication and accessibility review
        └── public article repository and deployed site
```

The brain remains server-hosted and usable by any LLM. Codex is the preferred
interactive client. The blog receives only an approved, purpose-bound packet;
the packet may include article seeds, relevant experiences, source references,
allowed quotations, privacy limits, genre, and editorial constraints.

The newsroom may propose interpretations and prose, but it must not promote a
personal detail, third-party claim, or model inference to fact without the
brain's provenance and review rules. Edward remains final authority for lived
experience, privacy, meaning, and publication.

## Shared contract

Every editorial packet should record:

```yaml
packet_id: PKT-YYYYMMDD-NNN
brain_revision: REV-...
purpose: article_draft | article_revision | homepage_review | taxonomy_review
source_scope: [SRC-...]
note_scope: [NTE-...]
privacy_ceiling: public | editorial | restricted
allowed_operations: [read_context, propose_copy, propose_metadata]
excluded_scope: [...]
provenance_required: true
author_approval_required: true
expiresAt: YYYY-MM-DD
```

The blog's article archive, working state, and append-only editorial log remain
the canonical records for publication. They do not replace the brain's source
registry, evidence, consent, or cross-application audit records.

## Obsidian relationship

Obsidian is an optional human-facing projection of approved brain records. It
can be useful for browsing backlinks, timelines, and article seeds, but it is
not required for newsroom operation. A future two-way edit path must import
through a governed, diffable, audited transaction; direct file edits must not
bypass privacy or packet permissions.

## Intake and publishing sequence

1. The Personal Systems Director receives Edward's request and defines purpose,
   source scope, privacy ceiling, and required roles.
2. The brain assembles an explainable context manifest and editorial packet.
3. The Managing Editor assigns writers/editors and records the working state.
4. The panel drafts, challenges, fact-checks, copyedits, and proposes metadata.
5. Privacy/provenance review resolves unsupported or sensitive material.
6. Edward approves, rejects, or requests revision.
7. The publication desk synchronizes the approved Markdown article and runtime
   adapter, validates placement/accessibility, and verifies the live deployment.
8. The brain receives a durable delta only when it is a reviewed life/work fact,
   decision, preference, or editorial record—not merely because prose was drafted.

## What must not happen

- no broad Drive, Gmail, or local-disk scan from a blog request;
- no private vault content in the public Git repository;
- no autonomous publication or unreviewed autobiographical invention;
- no competing “blog memory” that silently diverges from the brain;
- no assumption that a connector or LLM has complete historical coverage.
