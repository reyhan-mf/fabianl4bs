import { Children, useCallback, useEffect, useRef, useState } from 'react';

const DRAG_THRESHOLD = 6; // px before a press counts as a drag rather than a click
const SPEED = 30; // px per second the row drifts left on its own

const END_HOLD = 2600; // ms resting on the last card, so it can actually be read
const REWIND_MS = 900; // the glide back to the first card
const START_HOLD = 1200; // ms resting at the start before setting off again

const easeInOutCubic = (k) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);

/**
 * A row of cards that walks itself to the end, rests there, then glides back to the start.
 *
 * It used to be an endless marquee: the list rendered twice, the position wrapping at the
 * midpoint so the loop had no seam. That is a neat trick and a confusing one — with the cards
 * repeating forever you cannot tell where the row begins or ends, or whether you have already
 * seen everything, and on a short row the duplicate half simply read as the same card printed
 * twice. A row with a visible beginning and end answers "have I seen them all?" by itself.
 *
 * So: drift to the far end, hold long enough to read the last card, ease back to the first,
 * pause, repeat. One copy of each card, ever. Motion holds while you hover, drag or focus
 * inside it, never starts under `prefers-reduced-motion`, and does nothing at all when the row
 * already fits — there is nowhere to go.
 *
 * The drift and every kind of dragging all move the same `scrollLeft`, which is why they
 * compose. Crucially the drift yields: if the number moved without it, a finger or a fling is
 * driving, and it adopts that value and carries on forward from there rather than writing its
 * own back.
 */
export default function CardSlider({ children, label, className = '' }) {
  const track = useRef(null);
  const [scrollable, setScrollable] = useState(false);
  const pos = useRef(0); // kept as a float; scrollLeft alone rounds and judders
  // two independent reasons to hold still, so one ending does not cancel the other
  const hovering = useRef(false);
  const gesturing = useRef(false);

  const items = Children.toArray(children);

  /* Only for the label: the loop below reads the live distance every frame, since a lazily
     loaded thumbnail can change it after this has run. */
  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const measure = () => setScrollable(el.scrollWidth - el.clientWidth > 8);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf;
    let last = null;
    let phase = 'run'; // run -> hold -> rewind -> rest -> run
    let elapsed = 0; // ms spent in the current phase, paused time excluded
    let from = 0; // where the rewind started

    const step = (t) => {
      if (last === null) last = t;
      const dt = Math.min(t - last, 64); // a backgrounded tab must not lurch on return
      last = t;

      const max = el.scrollWidth - el.clientWidth;
      const paused = hovering.current || gesturing.current || document.hidden;

      if (max > 1) {
        const current = el.scrollLeft;

        /* If the position moved without us, someone else is scrolling — a finger, momentum,
           a trackpad, the keyboard. Adopt their number rather than writing over it; pushing our
           own value back every frame is what made a touch drag stutter, as though the row were
           pulling against you. Carry on forward from wherever they left it. */
        if (Math.abs(current - pos.current) > 1) {
          pos.current = current;
          phase = 'run';
          elapsed = 0;
        } else if (!paused) {
          elapsed += dt;

          if (phase === 'run') {
            pos.current += (SPEED * dt) / 1000;
            if (pos.current >= max) {
              pos.current = max;
              phase = 'hold';
              elapsed = 0;
            }
          } else if (phase === 'hold') {
            if (elapsed >= END_HOLD) {
              from = pos.current;
              phase = 'rewind';
              elapsed = 0;
            }
          } else if (phase === 'rewind') {
            const k = Math.min(elapsed / REWIND_MS, 1);
            pos.current = from * (1 - easeInOutCubic(k));
            if (k >= 1) {
              pos.current = 0;
              phase = 'rest';
              elapsed = 0;
            }
          } else if (elapsed >= START_HOLD) {
            phase = 'run';
            elapsed = 0;
          }
        }

        // only ever write when we actually changed something
        if (Math.abs(pos.current - current) > 0.5) el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [children]);

  /* Touch and trackpad flings keep moving after the gesture ends, so the drift stays parked for
     a moment afterwards rather than cutting straight back in. */
  const resumeTimer = useRef(null);
  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const holdForGesture = useCallback(() => {
    clearTimeout(resumeTimer.current);
    gesturing.current = true;
  }, []);

  const releaseAfterGesture = useCallback(() => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      gesturing.current = false;
    }, 1200);
  }, []);

  const hold = useCallback(() => {
    hovering.current = true;
  }, []);
  const release = useCallback(() => {
    hovering.current = false;
  }, []);

  /* Drag anywhere on the row, cards included. The old guard bailed out when the press landed on
     a link — and the card's title link is stretched across the whole card — so dragging only
     worked in the gaps between cards. */
  const onPointerDown = (e) => {
    const el = track.current;
    if (!el || e.button !== 0 || e.pointerType !== 'mouse') return;

    const start = { x: e.clientX, left: el.scrollLeft, moved: false };

    const onMove = (ev) => {
      const dx = ev.clientX - start.x;
      if (!start.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
      start.moved = true;
      ev.preventDefault();
      // the row has real ends now, so a drag stops at them rather than wrapping round
      const max = el.scrollWidth - el.clientWidth;
      const next = Math.max(0, Math.min(start.left - dx, max));
      el.scrollLeft = next;
      pos.current = next;
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      releaseAfterGesture();
      if (!start.moved) return;
      // swallow the click this drag would otherwise fire on the card underneath
      const swallow = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      el.addEventListener('click', swallow, { capture: true, once: true });
      setTimeout(() => el.removeEventListener('click', swallow, { capture: true }), 0);
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
  };

  return (
    <div className={`fl-slider ${className}`.trim()}>
      <ul
        className="fl-slider__track"
        ref={track}
        tabIndex={0}
        role="group"
        aria-label={scrollable ? `${label} — drag sideways to browse` : label}
        onPointerDown={(e) => {
          holdForGesture();
          onPointerDown(e);
        }}
        onPointerUp={releaseAfterGesture}
        onPointerCancel={releaseAfterGesture}
        onTouchStart={holdForGesture}
        onTouchEnd={releaseAfterGesture}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') hold();
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') release();
        }}
        onFocusCapture={hold}
        onBlurCapture={release}
        // stop the browser's own link/image dragging from hijacking the gesture
        onDragStart={(e) => e.preventDefault()}
      >
        {items}
      </ul>
    </div>
  );
}
