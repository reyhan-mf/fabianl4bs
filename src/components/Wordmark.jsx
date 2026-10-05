import { Link } from 'react-router-dom';

const FLASK = (
  <svg className="fl-wordmark__flask" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9.2 7.5h5.6M10.2 7.5v4.6L5.6 19.4A1.6 1.6 0 0 0 7 21.8h10a1.6 1.6 0 0 0 1.4-2.4l-4.6-7.3V7.5" />
    <circle cx="16.4" cy="3.6" r="1.6" />
    <circle cx="12.6" cy="2.2" r=".9" />
    <circle cx="10.4" cy="18.2" r=".6" />
    <circle cx="13.6" cy="16.6" r=".9" />
  </svg>
);

/**
 * "fabian" in text + "l4bs" in accent, with the outlined flask at the top-right of the "s".
 * size: "sm" (22) | "lg" (40) | undefined (26, the default).
 */
export default function Wordmark({ size, className = '' }) {
  const cls = ['fl-wordmark', size ? `fl-wordmark--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <Link className={cls} to="/" aria-label="fabianl4bs — home">
      fabian<span className="fl-wordmark__lab">l4bs</span>
      {FLASK}
    </Link>
  );
}
