# VXL homepage — Codex handoff

## Start here

This is the current editable VXL prototype, including the official supplied logo, actual company photography and the new homepage motion pass. Keep working in this folder rather than regenerating a new website. This handoff does not automatically move the ChatGPT conversation or create a remote Codex environment.

1. Extract the project archive.
2. Open the extracted `vxl-preview` folder as the local project in Codex (or open a terminal in it and run `codex` if Codex CLI is installed).
3. Ask Codex to read `AGENTS.md`, this file and `README.md`, run the preview, and continue from the current homepage.

Run the preview with Node.js 20 or newer:

```sh
npm run dev
```

Open http://127.0.0.1:4173. No dependencies or API keys are required.

```sh
npm run check
```

## User objective

Improve the main page with lively, premium animation and video, using these references for motion direction:

- https://irisventure.com/
- https://portfolio.widehue.co/rezonbio/
- https://scrollytelling.ai/

Preserve VXL branding, clean typography, readable text, white space, dark/light theme switching and the supplied base. The attached homepage screenshot is in `references/current-home-reference.png`. It is the user's reference from before this motion pass, not a screenshot of the final implementation.

## Current implementation

- `index.html`: one-page Home prototype with anchor navigation.
- `style.css`: existing styling plus a cinematic hero and scroll effects.
- `app.js`: theme transitions, canvas contours, counters, reveals, mobile menu, preview controls and homepage motion/video lifecycle.
- `server.mjs`: local server; public files and assets only, including video byte-range responses.
- `assets/`: supplied logo, company photography, 16-second muted H.264 hero loop and static video poster.
- `dark-preview.png`, `light-preview.png`, `mobile-preview.png`: captured after this motion pass.
- `ASSET-SOURCES.md`: original asset URLs and provenance.
- `references/discovery-scope.md`: original planning context. It is not fresh authorization for deployment or expansion.

## Homepage motion added

A portrait-shaped, arched hero film; a blue contour field; staged VXL letters and scroll-highlighted intro text; a sticky Secret Garden photo section with gentle zoom and expanding corners; founder photo parallax; capability hover accents; footer wordmark movement. Native document scrolling is retained.

The film is a silent excerpt from VXL's existing website video, resized to 1280 × 720 at 24 fps. It is company footage, not video taken from the design references. It loads only when visible and motion is permitted, pauses out of view or in background tabs, and falls back to its poster if playback is blocked. Save-data mode requires a deliberate play action. The user can pause all motion; OS reduced-motion settings take priority.

## Validation completed

Desktop 1440 × 1000 and mobile 390 × 844: no horizontal overflow. Hero video played; pause/resume worked; off-screen playback paused. Theme transition, mobile menu and OS reduced-motion behavior worked. Browser console had no uncaught errors. JavaScript syntax checks passed. Local media requests and video range behavior are checked in this handoff session. The previews are screenshots, not replacements for real-device testing.

## Still pending

This remains an isolated one-page prototype with a separate private working-preview Site. Full internal routes, News/Gallery editor/CMS, form backend, final typefaces/copy approval and a production hosting setup are not implemented. Target-browser Safari/iOS and Windows testing remain useful before launch. The existing company statistics and copy were inherited from the supplied base and are not reverified by the motion changes.

Original discovery notes identify Vercel as the preferred eventual host and require isolation from the live site. Do not deploy to, change DNS for, or replace the live company site. On 1 October 2026 the user requested one continuously updated preview instead of repeated ZIP downloads; the separate private working-preview Site is now authorized. Use the project ID in .openai/hosting.json for later updates and preserve owner-only access.

## Suggested first Codex message

> Read AGENTS.md and CODEX-HANDOFF.md. Continue the existing VXL main page from these files. Run npm run dev, inspect both themes and mobile, then refine the homepage motion using the three linked references. Preserve the official logo and real VXL media. Keep the changes local and show me a preview before any hosting or domain changes.

## Latest revision — background hero and continuous preview

- Hero title is now one line, “We Excel. By partnership.”, set in bold sans-serif.
- Hero uses a full-width 10-second seamless abstract blue video, generated procedurally from nonrepresentational contour/gradient fields.
- Previous VXL event film is now a separate lower-page section with explicit playback controls.
- “Upload background video” accepts supported MP4/WebM/QuickTime videos and GIFs; “Reset background” restores the original. Uploads are validated before replacement.
- Build background uploads stay in IndexedDB in the current browser, persist through reload and future updates to this same Site origin, and are not automatically shared with other browsers or committed to the source.
- GIF is hidden when motion is paused or OS reduced-motion is active; the original static blue poster is shown.
- Static publishing uses npm run build and dist/ via .openai/hosting.json. Existing company hosting and domains remain untouched.

## Transparent logo revision

The supplied VXL Logo (2).png is the transparent icon used in header/footer. VXL Logo (1)(1).png is the full transparent logo in the second (intro) section. The latter fades in and rises with a gentle scale-up on scroll, using the existing reveal observer and respecting reduced motion. Original assets are preserved byte-for-byte; display containers trim their transparent padding.

Intro logo visibility fix: supplied VXL Logo (1)(2).png is displayed through an SVG image viewport to trim transparent padding. The logo remains visible by default; its artwork gets a dedicated once-on-scroll fade, so an observer/loading issue cannot leave an empty permanent area. CSS and JS URLs have a new version tag for this revision.

## Impact section revision

Replaced the four equal statistics with three prioritized impact cards. US$1.5 billion is the dominant full-width investment card, labelled the company's largest investment in Genting Secret Garden. Supporting cards show 40 years of philanthropic commitment and 50,000 jobs created across this investment, following the user's supplied wording. Removed the 50 km² resort footprint. Rounded surfaces, subtle concentric lines, spacious type and the existing once-on-scroll reveals/counters create restrained depth. No new factual research was used; employment wording is user-supplied. Both themes and mobile use the same hierarchy.

Impact QA: desktop 1440 × 1100 and mobile 390/320 px checked with no page overflow; both themes visually inspected. Reduced motion displays final figures; mobile menu, video pause/resume and off-screen pause passed with no uncaught browser errors. A pre-existing contact heading overflow at 320 px was also corrected by reducing its narrow-screen type size.

## Dedicated founder page

User explicitly authorized an internal founder page based on the supplied video. Homepage founder section now has a Discover the founder CTA to founder.html; header/footer Founder links also open that page. Founder page has an oversized name introduction, full-width resort photography, biography with sticky heading, 2009/2015/2022 timeline, photo-backed philosophy quote, and return links to the homepage/Secret Garden. Native scrolling, once-on-entry reveals, restrained image parallax, scroll-progress timeline and Pause motion respect OS reduced motion. Content remains visible without JavaScript. Theme preference shares the homepage's vxl-theme key. Separate founder.css/founder.js keep homepage behavior independent. Server allowlist and build now include the new files. Explicitly requested ZIP export follows this revision; source repository remains authoritative.

Founder QA: homepage CTA navigates to founder.html and its return link reaches index.html#founder. Desktop 1440 × 1000, mobile 390/320 px, dark/light themes, theme persistence, pause/resume, OS reduced motion, menu/Escape and no-JavaScript content visibility passed. All page images loaded, no failed responses or uncaught browser errors. Wide images and the timeline were visually inspected. Real-device Safari testing remains pending.
