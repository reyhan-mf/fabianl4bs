import { TECH_LOGOS } from '../design/tech-logos.js';

/**
 * A real brand mark for one technology, inheriting `currentColor`.
 * The marks are silhouettes rather than their own brand colours — the brand book allows one
 * accent, and several of these (Flask most of all) are near-black and would vanish on maroon.
 */
export default function TechLogo({ name, className = '', ...rest }) {
  const logo = TECH_LOGOS[name];
  if (!logo) {
    if (import.meta.env.DEV) console.warn(`[TechLogo] unknown logo "${name}"`);
    return null;
  }
  return (
    <svg
      className={`fl-techlogo ${className}`.trim()}
      viewBox={logo.viewBox}
      fill="currentColor"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: logo.body }}
      {...rest}
    />
  );
}

export { TECH_LOGOS };
