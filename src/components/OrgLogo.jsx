/**
 * The square beside a school or employer: the real logo when there is one, otherwise the
 * initials the system's `.fl-logo` is drawn for.
 */
export default function OrgLogo({ src, initials, alt = '', size }) {
  const cls = `fl-logo${size === 'lg' ? ' fl-logo--lg' : ''}${src ? ' fl-logo--img' : ''}`;
  return (
    <span className={cls} aria-hidden={alt ? undefined : 'true'}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : initials}
    </span>
  );
}
