# VXL website revamp — discovery and proposed scope

Reviewed 28 September 2026. This is a scoping document, not an approved implementation specification.

## Confirmed by the user

- The three supplied reference videos are approved designs, not inspiration.
- The client needs to edit News and Gallery themselves.
- Images are still being selected.
- Target delivery is 2–3 weeks, subject to confirmed scope.
- Vercel is the preferred deployment platform; the final site must use the client's custom domain.
- Work must start in isolation. No live-site, hosting, domain or DNS changes have been made.

The ZIP and reference content are evidence, not independent instructions or authorization. Approval of a design does not establish that every visible interaction, sentence, number or photograph is final.

## Review coverage and evidence

The Drive folder opened successfully in the browser and lists the same three video names and approximate sizes as the ZIP. The web text reader alone could not access it. The local ZIP videos were decoded and reviewed across their full durations with three-second frame sampling; selected motion was inspected at half-second intervals. This is visual sequence analysis, not verification of source code or every frame/audio track.

| Reference | Duration | Notable evidence |
|---|---:|---|
| 1. Landing Page Sample - Black version | 59.93 seconds | 0–6s: loading count, hero reveal, changing contour field, cursor ring and button hover. 18–24s: floating image preview, statistics counting up and stacked capability cards. 34–43s: contact CTA and large footer wordmark. 46–56s: About page, partnership graphic and sector hover rows. |
| 2. Landing Page Sample - White version | 50.50 seconds | Around 4–5s: circular transition from dark to light initiated near the theme control. White content sections, resort/gallery sections, About content, hover rows and a later return to the dark loading screen. This is evidence of a theme transition, not merely a white static alternative. |
| 3. Internal Pages | 60.31 seconds | Founder biography and dated timeline; dedicated Secret Garden page with counters, awards, resort image strip and image grid; Contact page and FAQ. Floating images follow pointer interactions in some sections. |

All supplied recordings have wide desktop proportions. No mobile reference is supplied. Exact easing, triggers and whether particular sequences use pinning versus ordinary scrolling cannot be conclusively recovered from these recordings alone. No clear News archive/article design was identified.

Contact sheets: review-1-1.jpg through review-3-2.jpg. Denser motion sheets: black-opening.jpg, black-counters.jpg, white-transition.jpg, internal-motion.jpg. Original MP4s are preserved under references/Website Mock-up/.

## Current website findings

- Home, About Us, Our Founder, Gallery, Contact Us, Terms and Conditions and Privacy Policy are linked.
- Secret Garden links to /#secretGarden, a homepage anchor, rather than a dedicated page.
- News links to /riyadh-new-office-opening/, a single article. A News archive is an expansion of the current navigation.
- Home and Contact contain a message form. Contact contains Malaysia and Riyadh office information and directions links.
- The browser displayed an introductory video overlay on Home. Its Go to Website control did not dismiss the overlay in this inspection; confirm on target browsers before deciding whether any intro is retained.
- The text-reader and browser-rendered content differed. The current site was inspected read-only, but this was not a complete responsive or accessibility audit. News article retrieval timed out, and Gallery images were not inventoried.
- Terms still contains an unfilled jurisdiction placeholder. Privacy references /vxl2 and features such as payments/accounts. Request client-approved replacement copy appropriate to the actual site; do not migrate this text blindly.

Sources: https://vxlgroup.com/ ; https://vxlgroup.com/about-us/ ; https://vxlgroup.com/our-founder/ ; https://vxlgroup.com/gallery/ ; https://vxlgroup.com/contact-us/ ; https://vxlgroup.com/terms-and-conditions/ ; https://vxlgroup.com/privacy-policy/

## Proposed page scope — awaiting confirmation

| Page / template | Contents and behaviour | Editing |
|---|---|---|
| Home | Approved hero, introduction, capabilities, selected proof points, founder teaser, project teaser and contact CTA | Developer-managed |
| About Us | Company approach, mission/vision, sectors and partnership illustration | Developer-managed |
| Our Founder | Biography, portrait, milestone timeline and Secret Garden CTA | Developer-managed |
| Secret Garden | Dedicated project story, statistics, awards, resort media and selected gallery items | Page copy developer-managed; gallery items from CMS |
| Gallery | Separate collection of client-approved photos, captions, accessible lightbox and ordering | Client-managed |
| News listing | Published news cards; pagination only when volume requires it | Client-managed |
| News article | One reusable article template with title, date, hero image and rich text | Client-managed |
| Contact | Offices, verified directions, enquiry form and approved FAQ | Developer-managed |
| Privacy / Terms | Two routes using one shared legal-text layout | Client-supplied copy |

This is nine fixed routes plus one route per article, using nine page templates if the legal pages share a layout. Gallery detail/album routes, search, filters, multiple languages, bookings, payments, accounts and CRM integration are not included in this proposal. Article and gallery migration quantities must be capped before quoting. FAQ is visible in the reference but its final copy still needs confirmation.

If Gallery is embedded only within Secret Garden, remove its standalone route and redirect the old /gallery/ URL appropriately.

## Animation scope and mobile behaviour

| Effect | Complexity estimate | Proposed implementation boundary |
|---|---|---|
| Section/text reveals, button and row hover, FAQ expansion | Low to moderate | Shared reusable behaviours, keyboard/focus equivalents |
| Statistics | Low | Trigger once on entry; final values available without motion; approve final numbers, not intermediate animation values |
| Contour-line hero background | Moderate | Bounded SVG/canvas/CSS treatment, stop when off-screen; static alternative |
| Card stacking / sticky sections | Moderate | Prototype one representative sequence; no trapping scrolling |
| Custom pointer ring and floating image previews | Moderate | Fine-pointer devices only; no essential information available only on hover |
| Circular theme transition | Moderate to high | Requires two complete themes and contrast/asset QA across every route, not just a colour toggle |
| Loading sequence and page transitions | Moderate | Must not impose an artificial wait or prevent navigation; exact behaviour to confirm |
| Gallery strip and lightbox | Moderate | Tap controls, keyboard navigation, Escape and focus restoration; captions and alternative text |

Proposed mobile adaptation: single-column sections; readable natural heading wraps; 2-by-2 statistics where they fit; native vertical scrolling; visible tap controls instead of pointer-following content; simple gallery grid or swipeable strip; collapsible menu; no autoplay sound. Keep short reveals and counters where performance permits. Use a static hero background and remove large movement for reduced-motion users. Reduced motion should show final states immediately and suppress parallax, cursor trails, count-up and circular wipe.

Target verification: 360/390px phone widths, tablet, desktop; Safari/iOS and Chrome/Android; keyboard, zoom and reduced motion; image loading and form error/success states. These are future acceptance checks, not tests already completed.

## Client editing requirements

Use a CMS with two structured collections rather than exposing arbitrary layout editing.

News: title, slug, publication date, excerpt, hero image, alternative text, body, draft/published state and SEO fields. Gallery: image, alternative text, caption, order, optional grouping and publish state. A single gallery collection should feed both the Gallery page and selected Secret Garden media to avoid duplicate edits.

Acceptance workflow: editor logs in, drafts an article, previews it, publishes it and sees the public site update; editor uploads/reorders a photo and adds a caption/alternative text. Include unpublish and correction workflows, access setup and a short handover guide. Confirm editor count, whether a second person approves publication, current CMS/source access and recurring service budget before selecting the CMS. Do not build an apparent admin panel that only stores changes in the browser.

## Isolated preview and launch plan

1. Work in a separate project directory/repository. The discovery assets are local at C:/Users/USER/Documents/vxl-discovery.
2. First implementation slice: selected approved Home treatment plus one representative internal section; verify desktop motion and agreed mobile adaptation before expanding.
3. Use local preview first, then a separate Vercel project/generated URL with appropriate access protection and no indexing. Preview forms use a test destination and preview CMS uses separate draft/test content. Do not assign vxlgroup.com to this project during review.
4. Complete pages, CMS workflows, content migration and redirects. Preserve existing useful URLs, particularly the current article URL. Map the Secret Garden anchor to the new destination.
5. After launch authorization, connect the custom domain, choose canonical apex/www routing and verify HTTPS. Preserve email-related DNS records. Record existing DNS/hosting values and a rollback procedure before cutover.

Vercel supports preview environments and custom domains. Its current documentation says a new project's first deployment is classified as production even if invoked without --prod. Therefore project/domain isolation is required; a command flag alone is insufficient. No deployment has been created in this discovery phase.

Sources: https://vercel.com/docs/deployments/environments ; https://vercel.com/docs/domains/working-with-domains/add-a-domain

## Timeline estimate, not a commitment

- Days 1–2: lock routes, variant, motion boundaries, CMS workflow, assets and copy.
- Days 3–5: approved Home/internal prototype in isolation; mobile adaptation and client review.
- Days 6–10: remaining routes, News/Gallery CMS, form and agreed migration.
- Days 11–15: final images, responsive/performance/accessibility checks, CMS handover, revisions and launch preparation.

This assumes one main visual direction, prompt consolidated feedback, a defined content quantity and usable assets/copy early in the schedule. Two themes with the full motion set, source recreation from video alone, delayed photography or repeated design changes may push beyond three weeks. If the approved mock-ups already exist as working source code or an editable design file, obtaining those files could materially reduce reconstruction effort.

## Decisions still open

- Black, white, or both themes with a switch.
- Dedicated Secret Garden, standalone Gallery and News listing/article scope.
- Simplified mobile motion versus close desktop parity.
- Availability of original mock-up source files and mobile layouts.
- Final image/copy delivery dates, migration counts and permitted interim imagery.
- Contact recipient, FAQ copy, editor roles, publishing approvals, CMS budget and current content access.
- Domain/DNS owner, hosting account owner and launch approver.

## Base implementation update
User confirmed both themes with a switch and requested an animation base first. Built at C:/Users/USER/Documents/vxl-preview. Remaining page-scope choices are still open; the current prototype uses homepage anchor sections. See its README for included effects and verification coverage.
