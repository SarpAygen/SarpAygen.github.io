# Validation — 29 October 2026

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

## Limits and follow-up

- Download PDF is implemented as a same-origin anchor with the HTML `download` attribute. The browser automation download-capture operation timed out, so a completed browser download was not verified. Retest it on the final deployed address; the PDF view action did work.
- GitHub Pages has not been deployed, and the Actions workflow has not run on GitHub. The owner confirmed `https://sarpaygen.github.io` on 30 October 2026. Canonical URLs, the sitemap, and robots.txt have been generated for that address; the rebuild and link checks passed. Publication awaits GitHub access.
- LinkedIn is the exact URL supplied by the owner; profile accessibility behind LinkedIn's sign-in behavior was not independently confirmed. Email links were checked structurally; no email was sent.
- Reduced-motion preference and JavaScript-disabled behavior were checked in source, not through OS/browser emulation. No claim of comprehensive WCAG certification, screen-reader testing, or testing on physical mobile devices is made.
- Backend applications were inspected for accurate descriptions. Neither backend deployment nor live Windows/game input was tested as part of this website task.
