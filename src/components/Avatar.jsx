import { profile } from '../data/profile.js';

/**
 * The portrait in its gold frame, with the dashed offset frame behind it.
 * The system says: scale by whole multiples, `image-rendering: pixelated`, never recolour or crop.
 * size: "sm" (96) | undefined (320, the hero size).
 */
export default function Avatar({ size, className = '' }) {
  const cls = ['fl-avatar', size ? `fl-avatar--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <figure className={cls} style={{ margin: 0 }}>
      <span className="fl-avatar__img">
        <img src={profile.avatar} alt={`${profile.name} — portrait`} />
      </span>
    </figure>
  );
}
