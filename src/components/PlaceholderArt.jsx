/**
 * Stand-in thumbnail for a project with no screenshot yet. Drawn with the design system's own
 * placeholder classes (`ph-bg`, `ph-card`, `ph-ink`…), which it ships for exactly this — so a
 * project without a picture still reads as part of the set instead of as a broken image.
 */
export default function PlaceholderArt({ variant = 'app', id }) {
  const gid = `ph-${id}`;
  return (
    <svg className="fl-ph" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id={gid} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" className="ph-dot" />
        </pattern>
      </defs>
      <rect className="ph-bg" width="100%" height="100%" />
      <rect width="100%" height="100%" fill={`url(#${gid})`} />

      {variant === 'mobile' ? (
        <>
          <rect className="ph-card" x="126" y="24" width="68" height="152" rx="12" />
          <rect className="ph-tint" x="138" y="40" width="44" height="44" rx="8" />
          <path className="ph-soft" d="M138 98h44M138 110h30M138 122h38" />
          <rect className="ph-tint" x="138" y="138" width="44" height="18" rx="9" />
          <circle className="ph-fill" cx="160" cy="62" r="6" />
        </>
      ) : (
        <>
          <rect className="ph-card" x="40" y="30" width="240" height="140" rx="12" />
          <path className="ph-soft" d="M40 58h240" />
          <path className="ph-soft" d="M56 44h.01M68 44h.01M80 44h.01" />
          <rect className="ph-tint" x="60" y="76" width="96" height="14" rx="7" />
          <path className="ph-soft" d="M60 104h140M60 118h110M60 132h84" />
          <path className="ph-ink" d="M196 148l18-18 14 12 24-28" />
          <circle className="ph-fill" cx="196" cy="148" r="3.5" />
        </>
      )}
    </svg>
  );
}
