# Private Knowledge Vault and Obsidian Workflow

Version: 0.1

The vault is a private working memory for the newsroom, not a second public
website. It may contain life notes, source material, timelines, and article
seeds, but only an approved excerpt or packet may cross into the repository.

## Proposed vault layout

```text
00 Inbox/
10 Source Registry/
20 People/
30 Timeline/
40 Experiences/
50 Projects/
60 Ideas and Beliefs/
70 Objects and Places/
80 Article Seeds/
85 Editorial Packets/
90 Published Work/
95 Indexes/
99 Audit and System/
```

Folders are navigation, not authorization. The front matter `privacy` and the
packet's allowlist are the enforceable controls.

## Note front matter

Every durable note should start with a small, machine-readable envelope:

```yaml
schemaVersion: 1
note_id: NTE-YYYYMMDD-NNN
type: source | person | timeline | experience | project | idea | object | seed | packet | index
title: Human-readable title
createdAt: YYYY-MM-DD
updatedAt: YYYY-MM-DD
privacy: public | editorial | restricted | sealed | third-party
consent: unknown | not-needed | requested | granted | denied | expired
source_refs: [SRC-...]
related_notes: [NTE-...]
publication_allowed: false
review_after: YYYY-MM-DD
```

The body is written for humans first. Keep one idea or event per note, link
related notes explicitly, and preserve quotations separately from paraphrases.
Do not put credentials, API keys, private contact lists, or confidential source
material in this repository.

### Source registry

`10 Source Registry` is the chain of custody for every import:

```yaml
source_id: SRC-YYYYMMDD-NNN
source_type: chatgpt_export | codex_export | local_file | drive_file | email | web
capturedAt: YYYY-MM-DDTHH:MM:SS-04:00
locator: redacted path, URI, or provider ID
content_hash: sha256-if-available
owner: Edward Song | third-party | unknown
privacy: ...
consent: ...
import_status: proposed | inventoried | extracted | reviewed | rejected
included_in: [NTE-..., PKT-...]
```

Store a locator or hash, not a copy of sensitive source content, in the public
repository. The raw source remains in its approved private location.

### Objects and future rooms

For a future classroom, law office, writing desk, or other explorable scene, use
an `object` note with `location`, `era`, `sensory_details`, `story_role`,
`visual_reference`, `publication_allowed`, and linked experiences. The
`3d-scene-curator` can turn cleared object notes into a scene manifest, but every
scene needs captions, keyboard navigation, reduced-motion behavior, and a plain
text alternative.

## Privacy tiers

| Tier | Meaning | Default access |
| --- | --- | --- |
| `public` | Already approved for the public site | Publication desk |
| `editorial` | Safe for newsroom planning, not yet published | Managing Editor and selected panel |
| `restricted` | Personal or identifying; packet-level excerpt only | Named roles with expiry |
| `sealed` | Highly sensitive, confidential, or legally risky | Edward plus Privacy Steward |
| `third-party` | Belongs to or identifies someone else | Minimum necessary, consent first |

Access grants are explicit, time-bounded, and recorded in the packet. A role
cannot infer permission from folder location or from a previous assignment.

## Ingestion pipeline

1. **Authorize a source.** Edward names the provider, folder/label/query, time
   window, and purpose. “Scan everything” is not an authorization.
2. **Dry-run inventory.** Record counts, file types, candidate exclusions, and
   estimated sensitivity without importing bodies.
3. **Exclude secrets.** Skip `.env*`, credentials, private keys, tokens, system
   folders, password exports, and unrelated third-party data.
4. **Preserve originals.** Keep the source in its private location; record a
   locator and hash where possible.
5. **Extract to Inbox.** Create notes with source IDs and `privacy: editorial`
   or a stricter tier. Never overwrite an existing note during extraction.
6. **Review.** Privacy/Consent labels people and sensitive passages; the
   Knowledge Engineer deduplicates and links; the Historian proposes chronology.
7. **Promote or reject.** Edward approves promotion to durable notes or an
   editorial packet. Rejected imports remain excluded and are logged.
8. **Audit.** Append an event with source scope, counts, exclusions, reviewer,
   and next action. Do not copy personal content into the audit log.

### Source-specific order

Start with synthetic portfolio/blog records, then user-selected ChatGPT/Codex
exports, then selected local documents and Drive folders. Gmail is a later pilot
with a narrow label/query, because messages contain many third-party identities
and expectations of confidentiality. The presence of a connector does not
authorize a scan.

## Retrieval and derived indexes

The Knowledge Engineer may create keyword indexes, backlinks, or embeddings for
approved notes. Each result must retain note/source IDs and the privacy tier.
Indexes are disposable caches: they can be deleted and rebuilt from canonical
notes. Retrieval must filter by the current packet before ranking results.

## Deletion, correction, and retraction

If Edward withdraws a note or source, mark it `retracted`, remove it from future
packets and derived indexes, and append an audit event naming the affected IDs.
Do not silently erase historical audit events. If a public article relied on the
material, route it through the article correction/withdrawal workflow.

## Security and backups

Keep the vault outside the public Git repository and back it up separately. If
Obsidian Sync is used, enable end-to-end encryption and store the encryption
password outside the vault. Local vault files are still readable to anyone with
the machine account, so device security remains part of the threat model.

Obsidian URI can open, create, append, overwrite, and search notes; use it only
for explicitly selected notes and never as a bypass around packet permissions.
