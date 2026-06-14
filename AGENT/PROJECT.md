Runtime reminder for agents: Before any repository change, first inspect the actual codebase and the current user request, translate the intended work into measurable and verifiable requirements in AGENT/TODOLIST.md, and only then make implementation edits; after each completed batch, sync the relevant entries in AGENT/TODOLIST.md first and AGENT/PROJECT.md second against the actual repository state, and verify that both AGENT documents still match the current repository state.

# Project Overview

## Project Positioning

This repository is the Hugo source for HorseRunningWild (https://horserunningwild.github.io/), the personal portfolio blog of Zixing Jia (贾梓杏). The site is intended to present both academic material and personal reflections, so the blog works as a public-facing portfolio rather than a generic note archive. The intended product direction is still a bilingual English/Chinese blog with custom pages, but the currently implemented homepage source is an English-only custom portfolio landing page and the broader multilingual rollout has not yet been committed into Hugo source code.

## Current Code Architecture

The current codebase is a minimal Hugo root in which `hugo.yaml` is the entry configuration and `themes/PaperMod/` remains the vendored upstream theme for the shared shell, navigation, footer, and baseline styling. The homepage is now overridden at the repository level through `layouts/index.html`, while `layouts/_partials/extend_head.html` and `layouts/_partials/extend_footer.html` inject homepage-only assets without modifying any file under `themes/PaperMod/`. `assets/` now contains `avatar.jpg` plus homepage-specific CSS and GSAP animation JavaScript, `.github/workflows/hugo-pages.yml` builds and deploys the site through GitHub Pages on pushes to `master`, `content/`, `i18n/`, `data/`, and `static/` remain unused local extension points, `archetypes/default.md` provides the default content front matter template, `AGENT/PROJECT.md` and `AGENT/TODOLIST.md` are the tracked agent reference files, `tmp/` stores reference drafts that are not part of the Hugo build pipeline, and `public/` is a checked-in generated output snapshot rather than the source of truth for site behavior or content.

## Tech Stack

- Hugo
- PaperMod
- Repo-level Hugo layout overrides
- GitHub Actions
- GitHub Pages
- GSAP ScrollTrigger on the homepage via CDN plus local animation glue code
- Barba.js (Planning)

## Design Language

The design direction should stay open and should not lock the project into a single rigid visual style, but every implementation should hit the same core anchors: modern elements, modern typography, modern layout rhythm, smooth page-to-page transitions with an SPA-like feel, and fresh animation. The currently implemented homepage uses a clean editorial portfolio layout with card-based sections, a circular hero avatar, and GSAP-driven reveal motion while still sitting inside the PaperMod site shell. Future UI work should preserve readability first, keep motion clean and intentional, and use animation to improve continuity and polish rather than to overwhelm the content.

## Publishing And Change Control

The publishing model for this project is online build and deployment through GitHub Pages. The repository now contains `.github/workflows/hugo-pages.yml`, which triggers on pushes to `master`, installs Hugo `0.162.0`, builds the site in production mode, uploads the generated `public/` directory as the Pages artifact, and deploys it through the official GitHub Pages Actions flow. Any change to the architecture, directory responsibilities, theme integration strategy, multilingual approach, content organization, or publishing flow must be written into `AGENT/PROJECT.md`, and the agent must keep this file fully synchronized with the actual codebase at all times.

## TODOLIST.md Usage

`AGENT/TODOLIST.md` records planned requirements and checkpoints for work in this repository and can cover either the immediate execution batch or longer-term planned work, but it is not an implementation log. Before editing source files, theme overrides, content, or AGENT documents, the agent must inspect the actual codebase and the current user request, turn the relevant work into measurable and verifiable requirements, write or update those requirements in `AGENT/TODOLIST.md`, and only then proceed with implementation. Its top-level list items represent major requirements or planning themes, and each second-level item must use Markdown todo checkbox syntax in a single sentence that states the goal, the key constraint, and the verification condition. Those second-level checkbox items are requirement entries in the TODOLIST rather than runtime implementation tasks. Concrete implementation tasks belong inside the active agent runtime, such as Copilot or Claude Code, and every runtime task batch must end with `Check and sync TODOLIST.md and PROJECT.md`. After every completed batch, the agent must first sync the relevant entries in `AGENT/TODOLIST.md` against the work actually completed and then sync `AGENT/PROJECT.md` against the real repository state.