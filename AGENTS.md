# AGENTS.md

Personal portfolio blog of Zixing Jia (贾梓杏), built with Hugo + PaperMod and published to GitHub Pages. The site presents academic work and personal reflection as a public-facing portfolio. The intended direction is a bilingual EN/中文 blog with custom pages; the implemented homepage is currently an English-only custom landing page and the broader multilingual rollout is not yet in source.

## Build & Deploy

| Action | Command |
|--------|---------|
| Local dev server | `hugo server -D` |
| Production build | `hugo --gc --minify` |
| Deploy | Push to `main` → GitHub Actions builds Hugo `0.162.0` and publishes to GitHub Pages |

No test suite. Verify changes visually via `hugo server -D` or by inspecting `public/`.

## Architecture

- **Theme**: PaperMod, vendored in `themes/PaperMod/`. Never edit files under `themes/`.
- **Config**: single `hugo.yaml` at repo root.
- **Homepage override**: `layouts/index.html` replaces the PaperMod home content while keeping its header/footer shell. All custom layout work lives in root `layouts/`.
- **Page-scoped head assets**: `layouts/_partials/extend_head.html` loads the shared Google Fonts (Newsreader + Inter) plus a page-specific stylesheet, gated by `{{ if or .IsHome (eq .Section "resources") }}` — homepage gets `css/homepage.css` (and the FOUC-guard inline script), the Resources section gets `css/resources.css`. `extend_footer.html` (GSAP CDN + local JS: `homepage-gsap.js`, `neuron-bg.js`, `hero-name-toggle.js`) stays homepage-only via `{{ if .IsHome }}`, so other pages are unaffected.
- **Asset pipeline**: CSS/JS in `assets/` (`css/homepage.css`, `css/resources.css`, `js/homepage-gsap.js`, `js/neuron-bg.js`, `js/hero-name-toggle.js`, `js/pub-cards.js`) processed through Hugo Pipes (`minify | fingerprint`); images via `resources.Get` (`avatar.jpg`, `avatar-homepage-hero/bg.png` + `fg.png`, `pub-nsr/` + `pub-mfn/` figures).
- **Publication cards**: homepage Publications section ("Journal & Conference") uses native `<details class="pub-card">` accordions — summary carries badge/title/authors/venue/desc, the expanded body adds an abstract paragraph, review scores (NSR), and a click-to-cycle figure gallery (`js/pub-cards.js`; figures live in `assets/pub-*/`, captions included). Cards are floating glass panels (translucent blur, 16px radius, soft shadow, slight hover lift — a deliberate exception to the no-hover-lift rule) with a 3px gradient ribbon keying the venue type: `pub-card--conf` = accent teal, `pub-card--journal` = warm gold (`--pub-journal`). The accepted NSR paper PDF is served from `static/papers/`.
- **Neuron background**: homepage-only fixed `<canvas id="neuron-bg">` (in `layouts/index.html`, styled in `homepage.css`, logic in `js/neuron-bg.js`). Neuron positions trace a galloping horse + "VV" mark in a 12x7 design space (cover-fit to viewport, DPR-aware); synapses connect by proximity; slow Ornstein-Uhlenbeck drift around anchors; ~3 activations/s in soft pastels with pulses traveling along edges. Canvas sits at `z-index: -1` with a mask gradient fading it out toward the viewport bottom; adapts to `data-theme="dark"`; respects `prefers-reduced-motion` (static frame) and pauses off-tab. Design iterations live as GIF demos in `tmp/`.
- **Hero name easter egg**: `js/hero-name-toggle.js` toggles the hero `<h1>` between "Zixing Jia" and "Wild Horse!" on click/Enter; switching to the wild side dispatches a `wildhorse` window event that `neuron-bg.js` answers with a burst of ~14 activations.
- **Resources section**: `content/resources/_index.md` (front matter only — `title` + `layout: list`) is rendered by the repo-level override `layouts/resources/list.html`, a single page that lists every resource as two-level native `<details>`/`<summary>` accordions (top groups: Reading Roadmap / Study Notes · 期末资料库 / Research Toolkit · 科研新手工具箱; sub-groups inside). No explanatory prose, no sub-pages — all links live on this one collapsible page. Group summaries carry item-count badges; exam-ready links get a ★ mark; the header has a legend for the link-type icons; each top group has a faint themed SVG watermark (route / open book / gear) via `resource-section--*` modifier classes; Study Notes opens with a `.resource-note` banner pointing to the merged `Treasure-for-Undergraduate` repo (the per-course repos linked below it are frozen). It is styled by `assets/css/resources.css`, which mirrors the homepage design tokens (serif headings, hairline rules, deep-teal accent) so the page reads as part of the same editorial system. Linked from the top navigation via `menu.main` in `hugo.yaml`. Content is bilingual EN/中文 mixed inline (no i18n language switch yet).
- **Full-bleed bands**: sections that span the viewport (e.g. the About statement band) escape the content column with `margin-inline: calc(-50vw + 50%)`. Horizontal overflow is clipped at viewport level (`html { overflow-x: clip }` in `homepage.css`) — never on a content-width wrapper, or the bleed's paint gets cropped.
- **Reserved / generated**: `i18n/`, `data/`, `static/` remain unused extension points for the multilingual rollout; `content/resources/` is the one active content section (see above); `archetypes/default.md` is the content front-matter template; `tmp/` holds reference drafts outside the build (including the old Jekyll snapshot that is the source for Resources content); `public/` is a checked-in build snapshot, not a source of truth — do not hand-edit.

## Design Language

The homepage is an **editorial / scholarly** layout, not a product page. Keep these anchors:

- **Type pairing**: serif display (Newsreader) for the name, section titles, interest indices, and the About statement; sans (Inter) for body and UI. The serif/sans contrast carries the academic feel.
- **Palette**: warm paper white (`--bg-secondary #f8f7f4`), ink text (`--text-primary #1a1a2e`), muted secondary text, and a single deep-teal accent (`--accent #2c5f7c`). Dark mode mirrors the same hue family.
- **Structure over containers**: divide sections with typography and 1px hairline rules (`--rule`), not boxed cards. The About block is the one exception — a full-viewport-width tinted statement band (see Architecture) whose inner text realigns to the global grid via `.about-inner`.
- **Hero**: centered, oversized serif name, uppercase tracked subtitle, inline contact links.
- **Motion**: GSAP ScrollTrigger reveals, restrained (fade + small offset, no hover lift/scale). In the current build phase only the hero avatar animation is wired up; the remaining section reveals are intentionally removed and will be re-added per section once the static layout is final. The neuron canvas background is a separate hand-rolled rAF loop (see Architecture), independent of GSAP.
- Readability first; motion supports continuity, never overwhelms content.

## Tech Stack

- Hugo `0.162.0` (pinned in CI)
- PaperMod (vendored)
- Repo-level Hugo layout overrides
- GitHub Actions + GitHub Pages
- GSAP + ScrollTrigger via cdnjs CDN, local glue in `js/homepage-gsap.js`
- Barba.js (planned, for SPA-like page transitions)

## Publishing & Change Control

`.github/workflows/hugo-pages.yml` triggers on pushes to `main`, installs Hugo `0.162.0`, builds in production mode, uploads `public/` as the Pages artifact, and deploys via the official Pages flow. Any change to architecture, directory responsibilities, theme integration, the multilingual approach, content organization, or the publishing flow must be reflected here — keep `AGENTS.md` synchronized with the real repository state at all times.

## Conventions

- Custom layout work goes in root `layouts/`; theme files stay untouched.
- Page-specific assets stay scoped to their page/section (`.IsHome` for the homepage, `eq .Section "resources"` for Resources) — no global CSS/JS leakage.
- Before changing source: inspect the actual codebase, translate the intent into concrete verifiable checkpoints, implement, then re-read the rendered result and confirm this file still matches the repository.
- Keep this file minimal and accurate: record only what an agent cannot easily discover from the source, and update or remove anything that drifts from reality.

## Pitfalls

- Hugo is pinned to `0.162.0` in CI; local version mismatches can change output.
- GSAP / ScrollTrigger load from cdnjs; offline dev loses homepage animation.
- The `home-anim-pending` class (inline script in `extend_head.html`) prevents FOUC; the local JS must remove it or hero text stays invisible. If a `resources.Get` asset is ever emptied/deleted, its `{{ with }}` block emits no tag and the class is never removed — touch `hugo.yaml` to force a full rebuild after restoring the file.
- Full-bleed bands: `overflow-x: clip` belongs on viewport-level `html`, never on the content-width `.home-portfolio` (PaperMod's `.main` caps it), or the band paints only across the middle column while measuring full width.
