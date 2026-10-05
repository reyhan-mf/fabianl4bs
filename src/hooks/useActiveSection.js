import { useEffect, useState } from 'react';
import { navOffset } from '../lib/sections.js';

const PROBE_GAP = 24;

/**
 * Which section the reader is currently in.
 *
 * Deliberately a scroll position test rather than an IntersectionObserver: the sections here
 * vary from one screen to five, and "the last heading that has passed under the nav" is what a
 * reader means by where they are — an observer instead reports whichever box happens to overlap
 * the viewport, which makes the nav flicker between two entries on a tall section.
 *
 * Returns `null` while the hero is still in view, so nothing is marked current before the
 * reader has reached the first section.
 */
export default function useActiveSection(ids, { enabled = true } = {}) {
  const [active, setActive] = useState(null);
  const key = ids.join(',');

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return undefined;
    }

    const list = key.split(',');
    let frame = 0;

    const measure = () => {
      frame = 0;
      const probe = window.scrollY + navOffset() + PROBE_GAP;

      // At the very bottom the last section can be too short to ever cross the probe line,
      // so the end of the document counts as being in it.
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atEnd) {
        setActive(list[list.length - 1]);
        return;
      }

      let current = null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= probe) current = id;
        else break;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key, enabled]);

  return active;
}
