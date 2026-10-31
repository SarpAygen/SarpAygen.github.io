# Sarp Aygen — personal portfolio

A complete static portfolio with a homepage and two dedicated engineering case studies. Black backgrounds, orange accents, accessible navigation, a lightweight animated SVG, and real project evidence.

## Run locally in VS Code

Install Node.js 22 or newer. Extract this folder, open it in VS Code, and open Terminal → New Terminal. Run:

```sh
npm run build
npm run check
npm run preview
```

Open http://localhost:4173. Stop the preview with Ctrl+C. After editing a source file, run `npm run build` again and refresh your browser. No npm install is necessary: there are no external dependencies.

The supplied `dist/` directory is already built. You can also open `dist/index.html` directly, although serving it locally is the more reliable way to check PDFs and browser behavior.

## Files to edit

| Change | File |
| --- | --- |
| Email, LinkedIn, GitHub, introduction, availability, skills, About copy | `content/site.mjs` |
| Project summaries, features, technology choices, case-study text, source links | `content/projects.mjs` |
| Colours, spacing, typography, responsive layouts | `public/assets/styles.css` |
| Page layout, reusable header/footer, architecture diagrams, API example | `src/templates.mjs` |
| Mobile menu and reveal behavior | `public/assets/site.js` |
| Résumé | Replace `public/resume/Sarp_Aygen_Resume.pdf` with your new PDF |
| Project screenshot | Replace `public/assets/automation-dashboard.webp`, or update the image field in `content/projects.mjs` |
| GitHub deployment | `.github/workflows/pages.yml` |

Always edit the source files, not generated `dist/` HTML. Then build, check, and commit. Descriptive text is plain text in JavaScript strings; preserve the surrounding quotation marks. Avoid adding arbitrary HTML to content fields.

To add a screenshot to Spendwise, put it in `public/assets/`, then add an `image` field to that project matching the automation project's structure: `src`, `width`, `height`, `alt`, and `caption`. Use real dimensions, descriptive alternative text, and a caption that identifies what is shown. Prefer WebP for screenshots. The card and case study will pick it up on the next build. The API-example renderer is in `src/templates.mjs` if you want both a screenshot and an example.

## Published site and updates

Live portfolio: https://sarpaygen.github.io/

Source repository: https://github.com/SarpAygen/SarpAygen.github.io

The site is published through GitHub Pages with GitHub Actions. The first portfolio deployment succeeded on 30 October 2026; the live pages and résumé download were verified on 31 October 2026.

To work on the published repository in VS Code:

```sh
git clone https://github.com/SarpAygen/SarpAygen.github.io.git
cd SarpAygen.github.io
code .
```

Edit the source files listed above, then run:

```sh
npm run build
npm run check
git add .
git commit -m "Update portfolio"
git push origin main
```

Every push to `main` rebuilds and publishes `dist/`. Follow the run under **Actions → Publish portfolio to GitHub Pages**. The repository's **Settings → Pages → Source** is set to **GitHub Actions**. The same workflow can also be started manually with **Run workflow**.

`content/site.mjs` contains the confirmed `siteUrl`, used for canonical URLs, Open Graph URL fields, the sitemap, and robots.txt. Keep it set to `https://sarpaygen.github.io` unless the site's public address changes.

The original résumé PDF is included unchanged, including the phone number and graduation year printed in it. The web contact section uses the confirmed public email and social links. Replace `public/resume/Sarp_Aygen_Resume.pdf`, build, and push to update both résumé links.

A GitHub Free account supports Pages from public repositories. The provider's github.io address requires no paid domain. Current published limits include a 1 GB site size and a soft 100 GB/month bandwidth limit. This portfolio is about 207 KiB before future assets. Pages is static hosting; it does not run Java or Python application backends. This website has no server, database, contact form, analytics, or third-party font requests. GitHub itself logs visitor IPs for security.

Official documentation checked 29 October 2026:

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Why this implementation

A small Node.js script generates real HTML files from shared templates and organized content. The browser receives ordinary HTML/CSS and a small enhancement script. Important text and links are present without client-side rendering; project routes are actual directories, so direct navigation and refresh do not need a single-page-app rewrite. Relative URLs work at a domain root or repository subpath. No framework, build service, paid dependency, or runtime backend is required.

System fonts are used intentionally for fast, reliable loading. CSS handles interactions and reduced-motion preferences. The hero illustration is decorative, not a claimed running demo. The orange automation screenshot is an authentic interface preview from the project repository, kept in its original colour scheme and converted to WebP.

## Content verification

Project code was inspected at these commits:

- SpendWise: `ab7677379904d709a59fed9c8cbae9597235773d`
- Computer Vision Desktop Automation: `87b35fa867d5787621f6b0c4286e712222331309`

Spendwise's inspected source includes creation, list/get-by-ID, JPA persistence, model validation, and centralized 400/404 handling. It does not include PUT/DELETE or the CSV preview described in the planning brief. The site reflects the public source. Push those changes and update the evidence links before expanding the case study.

Automation's 12/12 suites figure comes from the repository's existing validation log. It is labelled as a recorded result with simulated Windows input. The portfolio build did not rerun the automation suites or perform live Roblox tests. No 94% headline accuracy, live timing guarantee, user count, or deployment claim was added.

No graduation date is added to the web copy. The attached résumé is preserved verbatim. No phone number is added to the site's contact links.

## Verification

See `VALIDATION.md` for checks performed and their limitations. GitHub Actions completed successfully. The live homepage, both case-study routes, and résumé download were verified.
