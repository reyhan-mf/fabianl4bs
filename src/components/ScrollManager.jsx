import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../lib/sections.js';

/**
 * Router navigation does not move the viewport on its own.
 *
 * With a hash it lands on that section of the home page — which is how the nav, the footer and
 * the redirects from the old `/projects`-style URLs all get there. Without one it goes to the
 * top, so arriving at a case study starts at its beginning.
 *
 * The scroll waits a frame: on a route change the target section is mounted in the same commit
 * as this effect, but its images and sliders have not been laid out yet, so measuring too early
 * lands short of the heading.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const frame = requestAnimationFrame(() => {
        if (!scrollToSection(id)) window.scrollTo({ top: 0 });
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0 });
    return undefined;
  }, [pathname, hash]);

  return null;
}
