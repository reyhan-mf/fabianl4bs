/* Everything that depends on where the site lives. One constant, because a canonical URL that
   disagrees with the sitemap, the Open Graph tags or the JSON-LD is worse than having none. */

export const SITE_URL = 'https://fabianl4bs.com';

/** Absolute URL for a path — crawlers and social scrapers need these fully qualified. */
export const abs = (path = '/') => new URL(path, SITE_URL).href;

/**
 * The name variants this site should answer to.
 *
 * "fabianl4bs" is the valuable one and the reason the domain matters: nothing else on the web
 * uses it, so an exact-match domain plus a matching entity makes the first result his. The real
 * name is the second target, and Google already associates it with UPI and the four papers
 * below — `sameAs` is what tells it those are the same person as this site.
 *
 * "fabianlabs" (no 4) is listed because people mistype the brand, not because it is winnable:
 * an unrelated lab company and another person's account already own that query.
 */
export const NAME_VARIANTS = [
  'fabianl4bs',
  'Fabian Reyhan',
  'Reyhan Fabian',
  'Reyhan M. Fabian',
  'Mochamad Fabian',
  'fabianlabs',
];

export const SEO = {
  title: 'Reyhan Mochamad Fabian (fabianl4bs) — Developer & ML Engineer',
  description:
    'Reyhan Mochamad Fabian — known as fabianl4bs. Web Developer at CrescentRating, Computer Engineering graduate of Universitas Pendidikan Indonesia, with 15 web, mobile and AI projects and four published papers. Based in Bandung, Indonesia.',
  ogImage: '/img/brand/avatar.png',
};
