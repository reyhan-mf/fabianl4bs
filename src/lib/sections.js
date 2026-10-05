/**
 * The home page is the whole site: every nav entry is a section of it, not a route.
 * This module is the one place that knows the section order and how to move the viewport
 * to one — the nav, the drawer, the footer and every in-page call to action share it.
 */
export const SECTIONS = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'projects', label: 'Projects', index: '02' },
  { id: 'experience', label: 'Experience', index: '03' },
  { id: 'awards', label: 'Awards', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The sticky nav's real height — it differs between the desktop and mobile bars. */
export function navOffset() {
  const bar = document.querySelector('.fl-nav');
  if (bar) return bar.offsetHeight;
  const token = getComputedStyle(document.documentElement).getPropertyValue('--nav-height');
  return parseInt(token, 10) || 72;
}

/**
 * Scrolls a section under the nav. The landing position comes from the section's own
 * `scroll-margin-top`, so the offset lives in CSS next to the nav height it depends on.
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
  return true;
}
