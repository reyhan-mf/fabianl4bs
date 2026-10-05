import { UI_ICONS, ILLUSTRATIONS, BRAND_MARKS } from '../design/icon-paths.js';

/* The design system's Social group ships X, GitHub and LinkedIn as official filled glyphs.
   Fabian's real links include Instagram, which the system has no mark for, so this is an
   outline stand-in drawn on the same 24 grid — the system's own substitution convention.
   Swap in the official filled glyph when it is added to the Social group. */
const EXTRA_OUTLINE = {
  instagram: {
    viewBox: '0 0 24 24',
    body: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  },
  /* The Icons group has no mark for a desktop machine or a connected device, and the project
     categories need both. Drawn to the same rules as the rest: 24 grid, 2px stroke, round caps,
     no fills. Swap them out if they are ever added to the group. */
  monitor: {
    viewBox: '0 0 24 24',
    body: '<rect x="2.5" y="4" width="19" height="13" rx="2.5"/><path d="M12 17v4M8.5 21h7"/>',
  },
  iot: {
    viewBox: '0 0 24 24',
    body: '<rect x="7" y="12.5" width="10" height="9" rx="2.5"/><path d="M12 12.5V9.5"/><path d="M8.6 7a4.8 4.8 0 0 1 6.8 0M6 4.2a8.7 8.7 0 0 1 12 0"/>',
  },
};

/**
 * A 24-grid outline UI icon. `stroke-width` and sizing come from `.fl-i` in the bundle.
 * size: "sm" (16) | "md" (20) | undefined (24, the default).
 */
export function Icon({ name, size, className = '', ...rest }) {
  const icon = UI_ICONS[name] ?? EXTRA_OUTLINE[name];
  if (!icon) {
    if (import.meta.env.DEV) console.warn(`[Icon] unknown icon "${name}"`);
    return null;
  }
  const cls = ['fl-i', size ? `fl-i--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <svg
      className={cls}
      viewBox={icon.viewBox}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.body }}
      {...rest}
    />
  );
}

/** A filled social glyph (X, GitHub, LinkedIn), or the outline stand-in for Instagram. */
export function BrandMark({ name, className = '', ...rest }) {
  const mark = BRAND_MARKS[name];
  if (!mark) return <Icon name={name} className={className} {...rest} />;
  return (
    <svg
      className={`fl-i fl-i--brand ${className}`.trim()}
      viewBox={mark.viewBox}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: mark.body }}
      {...rest}
    />
  );
}

/**
 * A 64-grid gold illustration. Never render below 48px (`md`), per the system.
 * size: "md" (48) | undefined (64).
 */
export function Illustration({ name, size, className = '', ...rest }) {
  const illo = ILLUSTRATIONS[name];
  if (!illo) {
    if (import.meta.env.DEV) console.warn(`[Illustration] unknown illustration "${name}"`);
    return null;
  }
  const cls = ['fl-illo', size ? `fl-illo--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <svg
      className={cls}
      viewBox={illo.viewBox}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: illo.body }}
      {...rest}
    />
  );
}

/** Social icon for a given profile entry id. */
export function SocialIcon({ id, ...rest }) {
  if (id === 'email') return <Icon name="mail" {...rest} />;
  return <BrandMark name={id} {...rest} />;
}
