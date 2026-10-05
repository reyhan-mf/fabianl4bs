import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/* Modals can stack — the project modal opens the image lightbox over itself. Both listen on
   `document`, so without this every open modal would answer the same Escape. Only the one on
   top of the stack reacts. */
const stack = [];

/**
 * Scrim + panel, with the behaviour every dialog here needs: Escape closes, the scrim closes,
 * focus is trapped inside and handed back to whatever opened it, and the page behind stops
 * scrolling. Built from the system's scrim, elevated surface and shadow tokens.
 */
export default function Modal({ open, onClose, label, className = '', children }) {
  const panel = useRef(null);
  const opener = useRef(null);

  // Held in a ref so the effect below depends only on `open`. A parent re-render hands us a new
  // `onClose` identity; re-running the setup on that would reshuffle the stack and unlock the page.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    opener.current = document.activeElement;
    // Focus the panel itself, so a screen reader reads the dialog from its start.
    panel.current?.focus();

    const token = {};
    stack.push(token);
    const isTop = () => stack[stack.length - 1] === token;

    const onKey = (e) => {
      if (!isTop()) return;
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [...panel.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Lock the page without the layout jumping as the scrollbar disappears. `html` is the
    // scrolling element here, and overflow on `body` alone does not reliably propagate to the
    // viewport, so lock both.
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: document.body.style.overflow,
      bodyPad: document.body.style.paddingRight,
    };
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    document.addEventListener('keydown', onKey, true);

    return () => {
      const at = stack.indexOf(token);
      if (at !== -1) stack.splice(at, 1);
      document.removeEventListener('keydown', onKey, true);
      html.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
      document.body.style.paddingRight = prev.bodyPad;
      if (opener.current instanceof HTMLElement) opener.current.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={`fl-modal ${className}`.trim()}>
      <div className="fl-scrim" aria-hidden="true" onClick={() => closeRef.current()} />
      <div
        className="fl-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        ref={panel}
      >
        {children}
      </div>
    </div>
  );
}
