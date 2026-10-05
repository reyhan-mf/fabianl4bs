import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from '../src/App.jsx';
import { projects } from '../src/data/projects.js';
import { abs, SEO, SITE_URL } from '../src/data/site.js';
import { homeGraph, projectGraph } from '../src/data/structured-data.js';

/**
 * Turns the built SPA into real HTML, one file per route.
 *
 * The app shipped as `<div id="root"></div>` and nothing else. Google does render JavaScript, so
 * it would have got there eventually — but Bing, and the crawlers behind AI answers (GPTBot,
 * ClaudeBot, PerplexityBot), largely do not run it, and "look someone up" increasingly happens
 * in those. A name that appears nowhere in the source is a name those engines cannot find.
 *
 * This runs after `vite build`, renders each route with `react-dom/server`, and writes the markup
 * into the shell Vite produced. The app needed no changes to allow it: every `window` and
 * `document` access in the codebase is inside an effect or an event handler, and effects do not
 * run server-side.
 *
 * The client then hydrates that markup rather than throwing it away — see `main.jsx`.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '../dist');

const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* JSON-LD sits in a <script>, so the only character that can break out is "<". */
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

/** Rewrites the shell's head for one route, then drops the rendered markup into #root. */
function page({ url, title, description, jsonld, image = SEO.ogImage }) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  const canonical = abs(url);
  const ogImage = abs(image);

  let out = shell;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${esc(description)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${esc(title)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${esc(description)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:image"[\s\S]*?\/>/,
    `<meta property="og:image" content="${esc(ogImage)}" />`
  );
  out = out.replace(
    /<meta\s+property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${esc(canonical)}" />`
  );
  out = out.replace(
    /<link\s+rel="canonical"[\s\S]*?\/>/,
    `<link rel="canonical" href="${esc(canonical)}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${esc(title)}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${esc(description)}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:image"[\s\S]*?\/>/,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`
  );

  out = out.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${jsonLd(jsonld)}</script>`
  );

  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  return out;
}

function write(routePath, html) {
  const file =
    routePath === '/' ? path.join(dist, 'index.html') : path.join(dist, routePath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  return file;
}

const written = [];

// ---- home ----
written.push([
  '/',
  write('/', page({ url: '/', title: SEO.title, description: SEO.description, jsonld: homeGraph })),
]);

// ---- one page per case study ----
/* Fifteen more indexable pages, each naming him as the author. For a brand search that is the
   difference between one result and a site Google can see has substance behind it. */
for (const p of projects) {
  const route = `/projects/${p.slug}`;
  const title = `${p.title} — ${p.tagline} | Reyhan Mochamad Fabian`;
  const description = (p.overview || p.description || p.tagline).slice(0, 180);
  written.push([
    route,
    write(
      route,
      page({
        url: route,
        title: title.length > 70 ? `${p.title} — a project by Reyhan Mochamad Fabian` : title,
        description,
        jsonld: projectGraph(p),
        image: p.hero || p.thumb || SEO.ogImage,
      })
    ),
  ]);
}

// ---- 404 ----
/* Vercel serves `404.html` for anything unmatched, with a real 404 status. That is the pairing
   worth having: a branded page *and* an honest status code. The alternative — a catch-all
   rewrite answering every bogus URL with 200 and the app shell — is a soft 404, which Google
   flags in Search Console as a page claiming to exist when it does not. Rendered at `/404`
   because any unknown path produces the same NotFound markup, so it hydrates wherever it lands.
   Deliberately kept out of the sitemap below. */
fs.writeFileSync(
  path.join(dist, '404.html'),
  page({
    url: '/404',
    title: 'Page not found — fabianl4bs',
    description: 'That page is not part of this site. The projects, experience and contact details are all on the home page.',
    jsonld: homeGraph,
  })
);

// ---- sitemap ----
/* Built from the same list that was just rendered, so a sitemap entry cannot point at a page
   that does not exist. */
const today = new Date().toISOString().slice(0, 10);
const urls = written
  .map(
    ([route]) =>
      `  <url>\n    <loc>${abs(route)}</loc>\n    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>\n` +
      `    <priority>${route === '/' ? '1.0' : '0.7'}</priority>\n  </url>`
  )
  .join('\n');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

// ---- robots ----
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `# fabianl4bs — Reyhan Mochamad Fabian\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

console.log(`prerendered ${written.length} pages:`);
for (const [route] of written) console.log(`  ${route}`);
console.log(`404.html, sitemap.xml (${written.length} urls) and robots.txt written`);
