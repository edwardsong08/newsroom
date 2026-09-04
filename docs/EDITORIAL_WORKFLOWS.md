# Editorial Workflows and Handoff Contracts

Version: 0.1

This document explains how the roster works together. The article lifecycle and
placement vocabulary remain owned by `docs/EDITORIAL_SYSTEM.md`.

## Assignment intake

The Managing Editor creates one assignment for every material request:

```yaml
assignment_id: ASG-YYYYMMDD-NNN
request: Edward's original request, preserved verbatim or linked
objective: one-sentence outcome
desk: technology | career | life-ideas | null
genre: permitted genre | null
source_scope: [SRC-... or NTE-...]
excluded_scope: [explicitly excluded IDs or providers]
privacy_ceiling: public | editorial | restricted | sealed
publication_intent: private | draft | candidate | publish
panel: [agent_id@role_version]
status: intake
next_action: ...
blockers: []
```

The request's meaning is not rewritten during intake. Ambiguities that affect
truth, privacy, audience, or publication are questions; optional presentation
choices are labeled proposals.

## The editorial packet

Before drafting, the Managing Editor assembles `PKT-YYYYMMDD-NNN` with:

- assignment ID and current status;
- allowed and excluded source/note IDs;
- a short fact table with provenance;
- known privacy/consent labels and redactions;
- the working premise, audience, and desired form;
- open questions and unresolved disagreements;
- selected panel, role versions, and access expiry;
- expected outputs and acceptance gates.

The packet is the only context most writers and editors receive. It prevents a
helpful-looking retrieval from expanding access to the whole vault.

## Standard handoff sequence

1. **Intake (`managing-editor`)** — capture request, assign ID, set scope.
2. **Context (`knowledge-engineer`, `historian`)** — normalize approved notes,
   chronology, and source links; return questions rather than guesses.
3. **Premise (`developmental-editor`)** — define the central idea, audience,
   stakes, and what the article is not trying to do.
4. **Shape (`structure-editor`)** — produce an outline or scene/section map.
5. **Draft (`Edward` or selected writer)** — write only from the packet; mark
   missing facts as `TODO` or questions.
6. **Challenge (`counterpoint-editor`, optional research librarian)** — test
   reasoning and external claims; preserve dissent.
7. **Voice (`voice-editor`)** — protect Edward's voice or the declared columnist
   brief; do not imitate an undisclosed person.
8. **Safety (`privacy-consent-steward`, `provenance-fact-checker`)** — classify
   people/details, verify claims, clear or block media and quotations.
9. **Line edit (`copy-editor`, `proofreader`)** — polish clarity and mechanics
   after substantive decisions settle.
10. **Author decision (`Edward`)** — answer questions and explicitly approve or
    request revision. Material changes return to `awaiting-author`.
11. **Publication (`homepage-taxonomy-editor`, `web-producer`,
    `accessibility-reviewer`, `release-examiner`)** — synchronize canonical
    Markdown, validate metadata/media, deploy, and verify live evidence.
12. **Archive (`managing-editor`)** — reconcile article, archive row, working
    state, and audit log.

Short dispatches may combine steps, but the packet still records which gates
were actually run.

## Panel selection by need

| Assignment | Minimum panel | Add when needed |
| --- | --- | --- |
| Technology guide | Developmental, Structure, Copy, Proof | Research, Accessibility |
| Career/life retrospective | Developmental, Voice, Privacy, Provenance | Historian, Sensitivity, Counterpoint |
| Opinion/commentary | Developmental, Counterpoint, Voice, Proof | Research, Legal-risk |
| Interview | Structure, Copy, Privacy, Provenance | Sensitivity, Accessibility |
| Interactive/3D room | Developmental, Art/Experience, Accessibility | 3D curator, Web producer |
| AI columnist piece | Developmental, Voice, Provenance, AI disclosure check | Counterpoint, Research |

Edward can request a different panel; the Managing Editor records why it is
appropriate and what risks remain uncovered.

## Audit and checkpoint rules

After every meaningful stage, update `content/WORKING_STATE.md` with current
stage, completed steps, next action, blockers, relevant files, and timestamp.
Append a concise event to `content/EDITORIAL_LOG.md` for intake, outline, draft,
review, approval, preparation, deployment, revision, correction, or system
change. An event names the assignment/article and evidence path, never hidden
reasoning or private source bodies.

When two agents disagree:

1. retain both findings in the packet;
2. identify whether the disagreement is factual, interpretive, stylistic, or
   permission-related;
3. ask Edward when the choice changes truth, privacy, or meaning;
4. record the decision and rationale as an explicit handoff.

## Publication acceptance contract

The release examiner may report **ready** only when:

- canonical Markdown and runtime data agree;
- metadata, desk/series/genre, placement uniqueness, image alt text, and credits
  pass the editorial system;
- unresolved TODOs and privacy/consent holds are zero;
- lint, typecheck, build, and relevant browser checks pass;
- the intended commit is deployed and the canonical URL is verified.

“Looks good locally” is not evidence of a live deployment.
