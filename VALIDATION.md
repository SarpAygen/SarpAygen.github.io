# Validation — updated 31 October 2026

## Completed

- Built three static pages: homepage, Spendwise, and Computer Vision Desktop Automation.
- `npm run check` passed: 60 local links, assets, and anchors resolved; no duplicate IDs; exactly one h1 per page; page titles and descriptions present; images have alt text and reserved dimensions; résumé starts with a valid PDF signature.
- JavaScript syntax checked with Node.
- Both public GitHub repositories cloned successfully and inspected at pinned commits. All nine case-study source links correspond to files present in those commits.
- Desktop browser rendering inspected at a 1363 × 936 viewport.
- Responsive rendering inspected using real browser iframes at 390, 320, and 768 px widths. The 320 px frame had a 305 px content viewport with scrollbars; measured document width was also 305 px, with no horizontal overflow. Both case-study diagrams were inspected at small widths.
- Homepage project links, case-study section anchors, and cross-project navigation were exercised. Real static directory routes were opened in the preview.
- Mobile menu opened with Enter and closed with Escape; `aria-expanded` returned to false. Focus styles are implemented for links and buttons, with a skip-to-content link.
- Résumé View action opened the supplied single-page PDF in the browser viewer.
- Screenshot uses the authentic repository interface preview, with explicit context and a full-size link.
- Source review confirms reduced-motion rules disable animation/transitions and smooth scrolling. Reveals never hide content. A no-JavaScript mobile navigation fallback is included.
- No application JavaScript errors observed in the inspected browser log. Browser-extension metadata errors were present and were not attributed to the website.

## Published verification — 31 October 2026

- GitHub Pages deployment succeeded: https://github.com/SarpAygen/SarpAygen.github.io/actions/runs/41098040788 (commit `ede7c94fe902deba72727525140d0ff54ef3523f`). All build, check, upload, and deployment steps passed.
- Opened https://sarpaygen.github.io/ and visually inspected the live homepage.
- Followed the Spendwise link, refreshed its direct route, followed cross-project navigation to Computer Vision Desktop Automation, refreshed that route, and returned home.
- The View résumé link opened the published PDF URL in a separate browser tab.
- The Download PDF action completed in the live browser. The downloaded file was 72,620 bytes, and its SHA-256 matched the supplied PDF exactly.

## Limits and follow-up

- The local preview download capture timed out during the initial review. The deployed download was subsequently verified successfully, as recorded above.
- The owner confirmed `https://sarpaygen.github.io` on 30 October 2026. Canonical URLs, the sitemap, and robots.txt use that address.
- LinkedIn is the exact URL supplied by the owner; profile accessibility behind LinkedIn's sign-in behavior was not independently confirmed. Email links were checked structurally; no email was sent.
- Reduced-motion preference and JavaScript-disabled behavior were checked in source, not through OS/browser emulation. No claim of comprehensive WCAG certification, screen-reader testing, or testing on physical mobile devices is made.
- Backend applications were inspected for accurate descriptions. Neither backend deployment nor live Windows/game input was tested as part of this website task.
