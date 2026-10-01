# VXL motion prototype

Editable, isolated VXL homepage. Includes both themes, supplied official logo, real VXL company photography and a silent hero film from VXL's existing website.

## Run

Node.js 20+; no dependencies or API keys.

```sh
npm run dev
```

Open http://127.0.0.1:4173.

```sh
npm run check
```

## Motion

Cinematic arched hero video, blue animated contours, scroll-linked hero movement, progressive VXL lettering and intro text, sticky Secret Garden photo zoom, founder image movement, capability hover accents and footer movement. Existing counters, reveals, theme wipe, pointer ring and motion controls remain.

Use Pause motion or the Motion preview controls to stop effects. OS reduced-motion takes precedence. Video pauses off screen and in background tabs, respects save-data settings, and has a poster fallback.

## Continue in Codex

Read CODEX-HANDOFF.md and AGENTS.md. Open this folder as the project and continue the current source. The handoff includes the user's homepage screenshot, original scope notes, reference links, asset sources and current screenshots.

## Status

One-page prototype with anchor sections. Full internal pages, CMS/editor, enquiry backend and production setup remain pending. No live-site, domain or hosting changes were made.

Browser checks passed at 1440 × 1000 and 390 × 844 for overflow, video playback/pause/resume, theme switching, mobile menu and reduced motion; no uncaught JavaScript errors. Real-device Safari/iOS and Windows QA is still pending.

## Build background editor

The hero now displays one bold sans-serif headline over a full-width abstract blue video. Use Upload background video to replace it with a supported video or GIF; Reset background restores the default. Choices stay in the current browser across refreshes. Files are not uploaded to a public server or added to the project source.

The VXL documentary/event excerpt is in a separate section further down the page.

A separate private working-preview Site is authorized so the user can review later edits at one stable URL. This does not replace the live company website. To build static output: npm run build.

## Founder page

Open founder.html through the homepage's “Discover the founder” button, or visit http://127.0.0.1:4173/founder.html directly. This is a separate document with its own URL, biography, milestone timeline and founder philosophy. Its visual direction follows the supplied Internal Pages video. Shared header navigation returns to homepage sections; theme choice persists across both pages. Run npm run build to include both pages in dist/.
