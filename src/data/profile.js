import { SECTIONS } from '../lib/sections.js';

/* Sourced from Fabian's CV (CV_Reyhan Mochamad Fabian_SD.pdf, Sep 2025) and the previous
   portfolio. The contact address is the one he asked the form to send to. Nothing is invented. */

export const profile = {
  name: 'Reyhan Mochamad Fabian',
  short: 'Fabian',
  brand: 'fabianl4bs',
  roles: ['Developer', 'Data Scientist', 'Machine Learning Engineer'],
  email: 'fabianl4bs@gmail.com',
  academicEmail: 'reyhan.3du@upi.edu',
  location: 'Bandung, West Java, Indonesia',
  locationShort: 'Bandung, Indonesia',
  availability: 'Open to freelance projects',
  avatar: '/img/brand/avatar.png',
  resumeUrl: '/resume.pdf',

  tagline: {
    lead: 'I build ',
    strong: 'web, mobile and AI things',
    rest: ' — currently a Web Developer at CrescentRating.',
  },

  about: [
    'I’m Reyhan Mochamad Fabian — Fabian to most people, fabianl4bs online. A Computer Engineering graduate from the Indonesian University of Education, with more than a year of professional web development behind me from the part-time roles I held while studying full time.',
    'I’m now a Web Developer at CrescentRating in Singapore. Before that I researched NLP at BRIN, teaching models to match university curricula to what employers actually ask for. Along the way: four published papers, a national bronze medal, and a handful of competition wins. I’m open to freelance projects.',
  ],

  blurb: 'A lab notebook of things I build — web, mobile and AI — from Bandung, Indonesia.',

  stats: [
    { value: '15', label: 'projects' },
    { value: '4', label: 'papers' },
    { value: '3.90', label: 'GPA / 4.00' },
    { value: '6', label: 'awards' },
  ],

  social: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/reyhan-mf' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/reyhan-mf/' },
    { id: 'x', label: 'X', href: 'https://x.com/fabianl4bs' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/reyhanmf50/' },
    { id: 'email', label: 'Email', href: 'mailto:fabianl4bs@gmail.com' },
  ],
};

/* The nav is the home page's own sections — see `lib/sections.js` for the order and the ids. */
export const NAV = SECTIONS;
