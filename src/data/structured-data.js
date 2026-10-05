import { profile } from './profile.js';
import { education, experience, papers, allSkills } from './experience.js';
import { projects } from './projects.js';
import { abs, NAME_VARIANTS, SEO, SITE_URL } from './site.js';

/**
 * JSON-LD for the home page.
 *
 * This is the part of the site that exists purely so a search engine can tell *which* Reyhan
 * Fabian this is. A name query is an entity question, and Google answers it from a graph, not
 * from keyword density — so the job here is to state the entity once, unambiguously, and wire
 * it to every profile that already corroborates it.
 *
 * Three things do the work:
 *   `alternateName` — the brand handle and the ways the name gets written, so all of them
 *                     resolve to one person instead of looking like several.
 *   `sameAs`        — the profiles and papers that already rank for the name. These are the
 *                     corroboration: anyone can claim to be someone, but GitHub, LinkedIn and
 *                     four journals agreeing is what makes the claim load-bearing.
 *   `@id`           — one stable identifier every node points at, so the Person, the WebSite
 *                     and the ProfilePage are understood as facts about a single entity.
 *
 * Schema is a Group D on-page factor — it wins SERP features and entity resolution, not
 * rankings on its own. It is here for the entity, and the entity is the whole brand-search game.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

const current = experience.find((e) => e.current);
const upi = education[0];

/* The papers already rank for his full name, so they are the strongest corroboration the site
   has. Listing them as `sameAs` is what joins "the author of these" to "the person here". */
const paperUrls = papers.map((p) => p.url).filter(Boolean);

export const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profile.name,
  alternateName: NAME_VARIANTS,
  givenName: 'Reyhan',
  familyName: 'Fabian',
  url: SITE_URL,
  image: abs(profile.avatar),
  email: `mailto:${profile.email}`,
  description: profile.blurb,
  jobTitle: current ? current.role : profile.roles[0],
  ...(current && {
    worksFor: {
      '@type': 'Organization',
      name: current.org,
    },
  }),
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: upi.school,
    sameAs: 'https://upi.edu/',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bandung',
    addressRegion: 'West Java',
    addressCountry: 'ID',
  },
  nationality: { '@type': 'Country', name: 'Indonesia' },
  knowsLanguage: ['id', 'en'],
  knowsAbout: allSkills.map((s) => s.name),
  sameAs: [...profile.social.filter((s) => s.id !== 'email').map((s) => s.href), ...paperUrls],
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: 'fabianl4bs',
  alternateName: [profile.name, 'fabianl4bs portfolio'],
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

/* ProfilePage rather than WebPage: this *is* the person's page, which is the type Google uses
   when it decides a result is somebody's own account of themselves. */
const profilePage = {
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: SEO.title,
  description: SEO.description,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: { '@id': PERSON_ID },
  inLanguage: 'en',
};

/** The projects, as one list — the body of work the person node claims. */
const portfolio = {
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#projects`,
  name: 'Projects by Reyhan Mochamad Fabian',
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      '@id': abs(`/projects/${p.slug}`),
      name: p.title,
      description: p.tagline,
      url: abs(`/projects/${p.slug}`),
      author: { '@id': PERSON_ID },
      ...(p.tags?.length && { keywords: p.tags.join(', ') }),
    },
  })),
};

const publications = papers.map((p) => ({
  '@type': 'ScholarlyArticle',
  name: p.title,
  author: { '@id': PERSON_ID },
  datePublished: p.year,
  url: p.url,
  ...(p.venue && { publication: p.venue }),
}));

export const homeGraph = {
  '@context': 'https://schema.org',
  '@graph': [person, website, profilePage, portfolio, ...publications],
};

/** A case study page: the work, credited to the same person node as everything else. */
export function projectGraph(project) {
  const url = abs(`/projects/${project.slug}`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': url,
        name: project.title,
        headline: project.title,
        description: project.overview || project.description,
        url,
        author: { '@id': PERSON_ID },
        creator: { '@id': PERSON_ID },
        ...(project.tags?.length && { keywords: project.tags.join(', ') }),
        ...(project.hero || project.thumb ? { image: abs(project.hero || project.thumb) } : {}),
        isPartOf: { '@id': SITE_ID },
      },
      person,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
