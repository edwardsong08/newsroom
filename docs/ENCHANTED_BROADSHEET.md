# Enchanted Broadsheet Design System

This document records the visual experiment on branch `design/enchanted-newspaper` so a future maintainer or LLM can extend it without flattening its personality or drifting into franchise imitation. The experiment now lives beside, not in place of, the original deployed design.

## Edition contract

- `Muggle` is the original deployed newspaper design. Treat `main` as its visual source of truth; do not restyle it while working on the enchanted edition.
- `Non-Muggle` is the enchanted broadsheet. It keeps its own darker paper artifact, ornamental masthead, nocturnal copy, and living plates.
- Both editions share routes, article data, navigation, and semantic HTML. The `data-edition` attribute on `<html>` selects presentation and edition-specific copy.
- The default is `muggle`. A reader's explicit choice is saved in `localStorage` under `working-draft-edition:v1` and applied before first paint.
- The edition control must remain visible, keyboard-operable, and labeled `Muggle` / `Non-Muggle` in both designs.
- Switching editions may use the newspaper page-turn transition. Unsupported browsers and readers who prefer reduced motion must receive an immediate swap.

## Intent

The site is an original, slightly uncanny late-night broadsheet: aged paper, forceful display type, editorial rules, and photographs that seem to breathe when no one is looking. The reference mood is a magical newspaper, but the implementation must remain Edward Song's own visual world.

Do not add franchise names, crests, characters, uniforms, wands, quotations, logos, or recognizable prop replicas. The design borrows only broad ideas: old newsprint, sensational display hierarchy, ornamental marginalia, and moving photography.

Inspiration was checked against the [official Daily Prophet fact file](https://www.harrypotter.com/fact-file/objects/the-daily-prophet), the [official MinaLima retrospective](https://www.harrypotter.com/features/minalima-celebrate-20th-anniversary-with-the-wizarding-world), and the Library of Congress history of [broadsides and printed ephemera](https://www.loc.gov/static/collections/broadsides-and-other-printed-ephemera/articles-and-essays/introduction-to-printed-ephemera-collection/the-popularity-of-broadsides.html).

## Composition rules

1. Treat every page as one physical paper artifact on a dark desk, not a stack of modern web cards.
2. Give each viewport one dominant headline and one dominant image. Quirk should live in the margins, captions, folios, and tiny notices.
3. Use the oxblood accent sparingly for editorial labels, stamps, and focus states. Body copy remains charcoal on bone paper.
4. Use double rules for major editorial boundaries and hairlines for metadata. Avoid rounded UI containers.
5. Front page order is fixed: publication header, lead package, three desks, editor's note, footer.
6. Category pages pair one oversized desk name with the matching photographic plate. Article pages pair one oversized title with the lead pressroom plate.
7. Preserve reading comfort inside articles: a narrow rail, a readable main measure, generous line height, and a single drop cap.

## Motion rules

- Motion is atmospheric, never required to understand or operate the site.
- A “living plate” must contain legible subject motion—a person typing, teaching, building, reading, or performing another clear action. A stationary image with only pan and zoom does not qualify.
- Living plates use locally hosted, muted, looping video with a complete poster fallback. Haze, scratches, dust, and marginal ornaments may remain secondary layers.
- No rapid flashes, jump cuts, auto-scrolling text, or constant large-amplitude movement.
- Video playback starts only in the Non-Muggle edition, pauses in a hidden tab, and stops at the poster under `prefers-reduced-motion: reduce`.
- Do not animate or load external media in the Muggle edition merely because the Non-Muggle edition is present in the same DOM.
- Test motion at desktop and phone widths; cropping must retain the focal object throughout the animation.
- Keep loops short, silent, compressed, and free of camera cuts. The current seven-second H.264 plates are each under 160 KB.

## Original generated assets

Both images were created with OpenAI's built-in image generation tool on August 28, 2026. They contain no sourced third-party artwork.

These source plates remain part of the design archive even though the current living-photo implementation uses real action footage. Do not delete them when changing the video treatment.

### `public/editorial/enchanted-pressroom.png`

1536 × 1024 lead plate. Final generation prompt:

> Use case: stylized-concept. Asset type: wide lead photograph for an original enchanted broadsheet-style personal blog. Primary request: an original candlelit late-Victorian pressroom and scholar's workbench where technology, law, teaching, and writing coexist: a small brass analytical machine with gears and wires, balanced legal scales, a chalkboard with abstract geometry, stacked worn books, an open notebook, and a fountain pen apparently writing by itself. Scene/backdrop: shadowy old print room with tall shelves, drifting paper, dust in lamplight, no people. Style/medium: sepia early-photography plate crossed with fine newspaper engraving and subtle halftone; tactile, cinematic, mysterious, sophisticated. Composition/framing: wide landscape 3:2 crop, strong central arrangement, foreground workbench, crop-safe edges, readable as a large website hero and as a mobile crop. Lighting/mood: low candle and oil-lamp glow, deep charcoal shadows, a faint spectral haze; restrained wonder rather than horror. Color palette: bone paper, charcoal black, tobacco sepia, small dark oxblood accents. Motion cues for later CSS animation: one loose page caught mid-flight, a soft trail behind the self-writing pen, lamp smoke and dust suggesting gentle movement. Constraints: no text, letters, headlines, logos, crests, watermarks, characters, recognizable franchise props, wands, school uniforms, or trademarks; entirely original visual world. Avoid: glossy fantasy concept art, bright colors, modern objects, clip art, direct imitation of any copyrighted film prop or newspaper.

### `public/editorial/enchanted-desks.png`

1821 × 864 panoramic source cropped into three desk plates. Final generation prompt:

> Use case: stylized-concept. Asset type: panoramic source image cropped into three animated desk portraits on an original enchanted newspaper website. Primary request: one continuous wide triptych of three clearly separated but visually unified scenes: left, a brass calculating engine and strange electrical instruments for Technology; center, legal books and scales flowing into a chalkboard and a writer's manuscript for Career; right, a lantern-lit observatory window, winding library stair, open journal, and night sky for Life & Ideas. Scene/backdrop: three tall arched photographic panels mounted in a shadowy nineteenth-century print archive, no people. Style/medium: antique sepia wet-plate photography mixed with fine newspaper engraving, chemical stains, subtle halftone and scratched emulsion; original and sophisticated. Composition/framing: extra-wide horizontal panorama with three equal vertical zones, strong distinct focal subject in each zone, safe for each third to be cropped independently into portrait cards. Lighting/mood: left with cold electrical glints, center with warm reading light, right with moonlit haze; all unified in monochrome sepia. Color palette: bone, charcoal, smoked umber, tarnished brass, faint oxblood. Motion cues for later CSS animation: delicate gear blur on left, a turning page in center, drifting lantern smoke and star trails on right. Constraints: no text, letters, numbers, headlines, people, logos, crests, watermarks, recognizable franchise symbols, wands, school uniforms, or trademarks; entirely original. Avoid: direct imitation of copyrighted movie props, glossy fantasy art, bright magic effects, collage cut-and-paste seams, clip art.

## Implementation map

- `src/components/edition-toggle.tsx` owns persistent edition state and invokes the page-turn transition.
- `src/components/living-video.tsx` owns edition-aware and reduced-motion-aware video playback.
- `src/components/living-picture.tsx` owns the lead plate frame, poster/video choice, caption, haze, scratches, and corner vignette.
- `src/components/desk-portrait.tsx` maps each desk to its action footage and poster.
- `src/app/globals.css` owns the Non-Muggle paper artifact, living-plate treatment, edition control, and page turn.
- `src/app/muggle.css` restores the original deployed presentation only when `data-edition="muggle"`.
- `src/app/layout.tsx` owns the shared masthead, notices, edition-specific copy, navigation, metadata, and footer.
- `docs/LIVING_PHOTO_SOURCES.md` is the required provenance and license audit for third-party motion assets.
- Home, category, article, About, and not-found pages share the same visual vocabulary.

## Release checklist

- Run `npm run lint` and `npm run build`.
- Check `/`, every `/category/*` route, `/posts/a-place-to-think-in-public`, and `/about`.
- Verify no horizontal overflow around 390 px, 768 px, and desktop widths.
- Confirm both editions retain their own design at every route and viewport; do not approve a release from the Non-Muggle edition alone.
- Confirm static editorial images load through `next/image`; local video posters and clips load without third-party requests.
- Confirm captions remain legible and the video crop keeps both the person and action visible throughout the loop.
- Confirm keyboard focus is visible, the edition choice survives reload and navigation, and reduced-motion stops videos and page movement.
- Keep article content and editorial workflow rules in their existing content/audit files; this document governs presentation only.
