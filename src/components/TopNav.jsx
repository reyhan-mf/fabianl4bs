import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Wordmark from './Wordmark.jsx';
import SectionLink from './SectionLink.jsx';
import { Icon, SocialIcon } from './Icon.jsx';
import { NAV, profile } from '../data/profile.js';
import { SECTION_IDS } from '../lib/sections.js';
import useActiveSection from '../hooks/useActiveSection.js';

function ResumeButton({ className = 'fl-btn fl-btn--secondary fl-btn--sm' }) {
  if (!profile.resumeUrl) return null;
  return (
    <a className={className} href={profile.resumeUrl} target="_blank" rel="noreferrer">
      <Icon name="file-text" />
      <span>Resume</span>
    </a>
  );
}

const EXIT_MS = 200;

function NavDrawer({ open, onClose, active }) {
  const panel = useRef(null);
  const closeBtn = useRef(null);
  // The drawer animated in but vanished on close, because it unmounted the moment `open` went
  // false. It now stays mounted for the length of the exit animation.
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return undefined;
    }
    if (!mounted) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setMounted(false);
      return undefined;
    }
    setClosing(true);
    const t = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return undefined;
    closeBtn.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const focusable = panel.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fl-scrim fl-scrim--fade${closing ? ' is-closing' : ''}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        className={`fl-drawer${closing ? ' is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        ref={panel}
      >
        <div className="fl-drawer__head">
          <Wordmark size="sm" />
          <button
            type="button"
            className="fl-iconbtn fl-iconbtn--ghost"
            aria-label="Close menu"
            onClick={onClose}
            ref={closeBtn}
          >
            <Icon name="close" />
          </button>
        </div>

        <ul className="fl-drawer__links">
          {NAV.map((item) => (
            <li key={item.id}>
              <SectionLink
                className="fl-drawer__link"
                id={item.id}
                onNavigate={onClose}
                aria-current={active === item.id ? 'location' : undefined}
              >
                <small>{item.index}</small>
                {item.label.toLowerCase()}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="fl-drawer__foot">
          <ResumeButton className="fl-btn fl-btn--secondary fl-btn--block" />
          <div className="fl-drawer__social">
            {profile.social.map((s) => (
              <a key={s.id} href={s.href} className="fl-iconbtn" aria-label={s.label} target="_blank" rel="noreferrer">
                <SocialIcon id={s.id} />
              </a>
            ))}
          </div>
          <p className="fl-drawer__meta">Follow me, it&apos;s free :D</p>
        </div>
      </aside>
    </>
  );
}

export default function TopNav() {
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Every nav entry is a section of the home page, so there is nothing to highlight anywhere
  // else — a case study marks none of them rather than guessing at Projects.
  const onHome = pathname === '/';
  const active = useActiveSection(SECTION_IDS, { enabled: onHome });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer whenever navigation actually happens.
  useEffect(() => setMenuOpen(false), [pathname, hash]);

  return (
    <>
      <header className={`fl-nav${scrolled ? ' is-scrolled' : ''}`}>
        <nav className="fl-nav__in" aria-label="Main">
          <Wordmark />

          <ul className="fl-nav__links">
            {NAV.map((item) => (
              <li key={item.id}>
                <SectionLink
                  className="fl-nav__link"
                  id={item.id}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ul>

          <div className="fl-nav__actions">
            <span className="fl-nav__wide">
              <ResumeButton />
            </span>
            <button
              type="button"
              className="fl-iconbtn fl-iconbtn--ghost fl-nav__menu"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </nav>
      </header>

      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  );
}
