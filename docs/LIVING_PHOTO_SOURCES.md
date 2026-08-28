# Living Photo Source and License Audit

Last verified: 2026-08-28

The Non-Muggle edition uses short excerpts from Pexels videos. Pexels states that its photos and videos are free to use, attribution is not required, and modification is permitted. The project nevertheless keeps creator credits and source URLs so every asset remains traceable. Review the current [Pexels license](https://www.pexels.com/license/) before replacing or republishing a source.

## Production assets

| Local files | Subject and action | Creator | Source |
| --- | --- | --- | --- |
| `pressroom-typewriter.mp4` / `.jpg` | Woman actively typing at a vintage typewriter | MART PRODUCTION | [Pexels video 8870168](https://www.pexels.com/video/a-woman-using-vintage-typewriter-8870168/) |
| `technology-engineer.mp4` / `.jpg` | Engineer working on a circuit board with a hand tool | Mikhail Nilov | [Pexels video 9373101](https://www.pexels.com/video/a-woman-holding-a-screwdriver-9373101/) |
| `career-teacher.mp4` / `.jpg` | Teacher writing a lesson on a chalkboard | RDNE Stock project | [Pexels video 8499767](https://www.pexels.com/video/a-teacher-writing-on-the-blackboard-8499767/) |
| `life-reader.mp4` / `.jpg` | Reader turning through a book between library shelves | Tima Miroshnichenko | [Pexels video 6549536](https://www.pexels.com/video/a-man-reading-a-book-at-the-library-6549536/) |

Production files live in `public/editorial/living/`. They are intentionally self-hosted so the published page does not disclose visitor requests to a stock-media CDN and cannot break when a remote rendition URL changes.

## Transform record

Each source was downloaded from the rendition URL exposed on its Pexels detail page, then:

1. trimmed to a continuous seven-second action without a camera cut;
2. stripped of audio;
3. normalized to 20 frames per second and an appropriate panel resolution;
4. converted to monochrome with restrained contrast, crushed highlights, temporal grain, and a vignette;
5. encoded as H.264 MP4 with `faststart` for broad browser support;
6. paired with a JPEG poster extracted from the final treated loop.

The interface adds a restrained sepia tone, emulsion scratches, haze, and an inset vignette. These layers are presentation only; the baked files remain usable poster-first fallbacks.

## Replacement rules

- Prefer footage whose person and action are unmistakable in a small crop.
- Reject generic screensavers, abstract backgrounds, AI morphing artifacts, static images with Ken Burns motion, clips with logos, and clips whose license cannot be audited.
- Avoid depicting an identifiable person in a defamatory, offensive, medical, political, or implied-endorsement context.
- Store the final derivative locally and add its creator, source page, license basis, transformation summary, and verification date here before merging.
- Do not commit raw download intermediates unless they are needed to reproduce an edit and their storage cost has been accepted.
