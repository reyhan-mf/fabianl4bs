# fabianl4bs

Personal portfolio of **Reyhan Mochamad Fabian**, built in React on the
[fabianl4bs design system](https://claude.ai/artifact/CAKYPjGKssamhYTj8eqX6i).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # vite build + prerender -> dist/ (16 html pages, sitemap, robots)
npm run serve    # http://localhost:4173 — serves dist/ the way the host does
```

> `npm run preview` is Vite's SPA server: it answers every unknown path with the root
> `index.html`, so a case study URL serves the **home page's** markup and client-routes over it.
> That looks right to a human and is wrong for a crawler — exactly what the prerender exists to
> avoid. Use `npm run serve` to check a real build.

## How the design system gets here

The design system is the source of truth for every colour, type step, spacing value and
component. Three files under `src/design/` are **generated or vendored from it — don't hand-edit**:

| file | where it comes from |
| --- | --- |
| `tokens.css` | compiled from the system's `project/tokens.json`; the two themes become `:root[data-theme="dark"]` and `:root[data-theme="light"]` |
| `bundle.css` | vendored from `project/components/bundle.css`. The only change: its 18 `@container screen (…)` rules are rewritten as viewport `@media (…)` queries, exactly as that file's own header says to do for app use |
| `icon-paths.js` | the 39 UI icons, 7 illustrations and 3 social marks, extracted from the system's Iconography / Illustrations / NavDrawer preview cards |
| `tech-logos.js` | 27 brand marks — the stack Fabian lists plus every tool a project is tagged with — vendored from [devicon](https://github.com/devicons/devicon) (MIT), except Tableau, which devicon does not carry, from [simple-icons](https://github.com/simple-icons/simple-icons) (CC0). All stripped of their hard-coded colours so each inherits `currentColor` |

`src/design/app.css` is the only hand-written stylesheet. It holds page-level patterns the
system leaves to the app (the page frame, the project-detail header row, the one-page section
anchors) plus the few things no card covers: a lightbox, a video figure, a contributor list, the
contact detail list. Everything in it is built from the system's own tokens.

To re-sync after the design system changes, re-read the artifact and regenerate those three files.

### Components

Each file in `src/components/` implements one of the system's cards, using its `.fl-*` classes:
`TopNav` (with `NavDrawer`), `Footer`, `Wordmark`, `Avatar`, `SectionHeader`, `ProjectCard`,
`AwardCard`, `SkillGroup`, `FilterChips`, `Icon`. The system does not define `Modal`,
`ProjectModal`, `Lightbox`, `TechLogo`, `OrgLogo`, `SectionLink` or `ScrollManager`.

### Structure: one page, not six

The nav used to move between six routes — `/`, `/projects`, `/experience`, `/awards`, `/contact` —
and the home page carried teaser versions of four of them, so the same material existed twice and
every nav click cost you your place. There is one page now. `src/sections/` holds the five
sections (`Hero`, `About`, `Projects`, `Experience`, `Awards`, `Contact`) and `pages/Home.jsx`
stacks them; each is the *full* version, so nothing is duplicated and nothing is a teaser for
something else.

What moved where when the routes were folded in: the stack and languages went to **About**, the
full project set and its filter chips to **Projects**, education and the published papers to
**Experience**, the certifications to **Awards**, and the form and contact details to **Contact**.

Three pieces make it work, all small:

| file | what it does |
| --- | --- |
| `lib/sections.js` | the section order and ids, in one place — `NAV` in `profile.js` is literally this list — plus `scrollToSection` |
| `hooks/useActiveSection.js` | which section you are reading, from scroll position, so the nav keeps up as you scroll rather than only when you click |
| `components/SectionLink.jsx` | a real `<a href="/#id">` that scrolls instead of navigating; ⌘-click and "copy link address" still behave |

The landing offset lives in CSS as `scroll-margin-top` on `.fl-anchor`, next to the `--nav-height`
it depends on, so `scrollIntoView` needs no arithmetic and the mobile bar's different height is
one media query rather than a second code path.

`/projects/:slug` is the one route that survives: a case study is a detour you choose from a card,
not a stop on the way through. The old section URLs (`/projects`, `/experience`, `/awards`,
`/contact`, `/education`) redirect to their section, so existing links still land.

### Deliberate departures from the system

- **The hero is mirrored.** The system puts text in 7 columns left and the portrait in 5 right;
  here they are swapped, because the pixel portrait faces right and should look into the page.
- **Project cards open a modal**, not the detail page. `?project=<slug>` in the URL drives it, so
  a modal is shareable, Back closes it, and a reload reopens it. The detail route still exists
  and the modal links to it as "Read the full case study" when a project has more to show.

  One trap worth knowing if you reuse the system's `.fl-scrim` elsewhere: it carries a global
  `z-index: var(--z-scrim)` (50) because it is designed to sit beside the drawer in the *root*
  stacking context. Put it inside a wrapper that has its own `z-index` — as `.fl-modal` does —
  and that 50 competes with the panel instead, painting the scrim over the dialog and swallowing
  every click. `.fl-modal > .fl-scrim` resets it to 0.
- **Stack marks are silhouettes**, not brand colours. The brand book allows one accent, and
  several marks — Flask above all — are near-black and would vanish on maroon.
- **Screenshots are never cropped.** `AdaptiveImage` lets the box take its height from the image;
  the measured aspect ratio only decides how much height the image may use, since a wide banner
  reads fine small while a phone mockup needs more. Three traps it exists to avoid: the system's
  `.fl-detail__hero > *` sets no `object-fit`, so an `<img>` there defaults to `fill` and
  *stretches*; a cached image is already `complete` when React attaches `onLoad`, so that event
  never fires and the measurement silently never happens (it measures from a ref too); and a grid
  row sizes itself to its content, so `max-height: 100%` on the image resolved against the image
  itself and never constrained anything (hence flex, not grid).

- **Card rows slide, and have ends.** `CardSlider` is native horizontal scrolling with snap
  points — touch and trackpad swipe work for free.

  It used to be an endless marquee: the list rendered twice, the position wrapping at the
  midpoint so the drift had no seam. Neat, and confusing — with the cards repeating forever you
  cannot tell where the row begins or ends, or whether you have already seen everything, and on
  a one-project row the duplicate half simply read as the same card printed twice (Eirene twice,
  D-Days Reminder twice), which looks like a data bug rather than a loop.

  It now drifts to the far end, rests ~2.6s so the last card can actually be read, eases back to
  the first over ~0.9s, pauses ~1.2s and sets off again. One copy of each card, ever. A row that
  already fits never moves — there is nowhere to go. Motion still holds while you hover, drag or
  focus inside it, never starts under `prefers-reduced-motion`, and still yields to a finger:
  if the scroll position moved without it, it adopts that number and carries on forward from
  there rather than fighting you.

- **Projects are one row, not six.** The section used to stack a row per category — about
  6,000px of the page, most of it scrolled past rather than read. It is one sliding row now, and
  the chips decide what is in it; the categories did not go anywhere, they are the chips, and
  each card still wears its own. The section went from ~6,000px to ~930px, and the page from
  ~10,400px to ~6,900px.

- **A project's stack is brand marks, not words.** `TechTags` renders each tag as its mark, and
  a tag only appears if `tech-logos.js` has one — which is the whole rule. The tags used to mix
  tools with concepts ("Flask", "RAG", "Machine Learning"), and the concepts restated what the
  tagline and the category chip already said. Cards show marks alone, as a signature you read at
  a glance; the modal and the case study show mark *and* name, because there the stack is
  something you have stopped to read and the silhouettes are not all recognisable on their own.

  One trap when vendoring a mark: devicon ships some of them — TensorFlow is the one here — as a
  filled silhouette carrying `fill="none"` with a hairline outline path drawn over it in the
  brand colour. Strip the colours and you are left with a hollow outline that all but vanishes at
  card size. The fix is to keep the silhouette, drop the `fill="none"` so it takes `currentColor`,
  and delete the outline path it was wearing. Nothing else in the set has two paths.

- **The stack adapts.** Five cards side by side on desktop; on a phone the groups become chips and
  one panel shows at a time, which took that section from ~1130px to ~440px.

- **Projects with no screenshot** (Clipd, Eirene) use the system's own `ph-*` placeholder art
  rather than a broken image or an empty frame.

### Theming

**Dark (maroon) only.** `data-theme="dark"` is set on `<html>` in `index.html` and nothing
changes it, so there is no flash and no toggle in the nav or the drawer.

The light (cream) theme still exists in `tokens.css`, because that file is generated from the
design system and is not hand-edited — switching `data-theme` to `light` brings it straight
back, and a toggle would be the `useTheme` hook again. The one leftover is handled: an inline
script clears any `fl-theme` a visitor saved while the toggle existed, so an old "light" cannot
linger in their browser now that nothing can switch it off.

> **Note:** browser extensions that repaint pages (Dark Reader and similar) will override the
> theme. That is the extension, not the site.

## Search

The site is `fabianl4bs.com`, and the job of the SEO work is to own two queries: **fabianl4bs**
and **Reyhan Mochamad Fabian**. Those are entity questions, not keyword questions — the answer
is "which Reyhan Fabian is this", and Google answers it from a graph.

### Prerendering

`npm run build` runs `vite build`, then `scripts/prerender.jsx` renders every route with
`react-dom/server` and writes 16 HTML files, plus `sitemap.xml` and `robots.txt`.

It exists because the app shipped as `<div id="root"></div>` and nothing else — his name appeared
nowhere in the source. Google renders JavaScript and would have got there eventually, but Bing
and the crawlers behind AI answers (GPTBot, ClaudeBot, PerplexityBot) largely do not, and "look
someone up" increasingly happens in those.

The app needed no changes to allow it: every `window` and `document` access is inside an effect
or an event handler, and effects do not run server-side. `main.jsx` hydrates that markup when it
is there and falls back to `createRoot` for `vite dev`.

One expected post-hydration difference: `AdaptiveImage` ships as `is-measuring` and becomes
`is-wide`/`is-tall` once the browser knows the image's real dimensions. The server cannot know
them. That is a state change after hydration, not a mismatch.

### Structured data

`src/data/structured-data.js` builds the JSON-LD from the same data the page renders, so the two
cannot drift. Three fields do the work:

- **`alternateName`** — the brand handle and the ways the name gets written, so they resolve to
  one person rather than looking like several.
- **`sameAs`** — GitHub, LinkedIn, Instagram and the four journal papers. These are the
  corroboration: anyone can claim to be someone; GitHub and four journals agreeing is what makes
  the claim load-bearing. The papers already rank for his full name, so this is what joins "the
  author of these" to "the person here".
- **`@id`** — one identifier the Person, WebSite, ProfilePage and every case study point at, so
  they read as facts about a single entity.

Schema is a Group D on-page factor — it wins SERP features and entity resolution, not rankings by
itself. It is here for the entity, and for a brand search the entity is the whole game.

### What is realistic

| query | competition | target |
| --- | --- | --- |
| `fabianl4bs` | none — nothing else on the web uses it, and the domain is an exact match | #1 |
| `Reyhan Mochamad Fabian` | his own papers and journals | #1 |
| `Fabian Reyhan` | other people with the name, plus unrelated noise | first page |
| `fabianlabs` | an established lab company and another person's account | **not winnable** — different spelling, different entities |

`src/data/site.js` holds `SITE_URL`. Everything — canonical, `og:url`, sitemap, JSON-LD — derives
from it, because a canonical that disagrees with the sitemap is worse than having neither.

## Content

Two sources, both Fabian's: `../CV_Reyhan Mochamad Fabian_SD.pdf` for the facts, and the previous
portfolio at `../portfolio` for the images and the older project write-ups. Neither contributed any
design. See `src/data/`:

- `profile.js` — name, contact, stats, socials, the about copy. **No phone number and no date of
  birth**: both were on the page and both are personal data a portfolio has no use for. Email and
  city are enough to reach him, so don't put them back
- `projects.js` — 15 projects; the Eunoia entry is the full case study from the old `pages/eunoia.html`.
  Each one's `tags` are the tools it is built with, written as the mark's own label ("Next.js", "C++"),
  so `logoForTag` resolves them with no second table to drift out of step
- `awards.js` — 5 awards with their certificate scans
- `experience.js` — the two roles, UPI, the four published papers, 7 certifications, the stack and
  languages. From the CV, except where Fabian has since corrected it: CrescentRating is now his
  full-time role (Oct 2026 — Present) and leads the timeline, BRIN ended Jul 2026, and the
  Novoclup MC role has been dropped. The copy in three places depends on which role is current —
  `profile.about`, `profile.tagline.rest` and the Experience section's `intro` — so a change of
  job means changing those too, not just the timeline

Images were copied to `public/img/` with normalised filenames (`assets/project_images/<folder>/`
→ `public/img/projects/<folder>/`).

### Known gaps

- **`featured: true`** is still set on five entries in `projects.js`, and `featured` is still
  exported, but nothing reads either one: the projects section shows every project in one row.
  Keep them if a "selected work" row comes back, otherwise they are safe to delete.
- **Four AI/ML cards carry a single mark** (TensorFlow), because TensorFlow is the only tool
  their data names. If they were written in Python with Keras — as the rest of the AI/ML work
  was — adding those tags to `projects.js` is all it takes; both marks already exist.
- **The portrait** at `public/img/brand/avatar.png` is the pixel art Fabian supplied, converted
  from a 400×400 JPEG, so a little JPEG noise is baked in. Dropping the lossless original (ideally
  at its native pixel size, e.g. 64×64) over that file is a straight improvement — the hero, the
  favicon and the Eunoia contributor row all read from it.
- **The Instagram mark** is an outline stand-in on the system's 24 grid, because the system's
  Social group ships only X, GitHub and LinkedIn. See the note in `src/components/Icon.jsx`.
- **The contact form has no backend.** It composes a `mailto:` to the address in `profile.js`.
- Not carried over from the old site: the "Our Team" and "Clients" sections, and the
  `fuzzy_logic` images, which had no project entry to attach to.
