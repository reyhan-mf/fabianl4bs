import Wordmark from './Wordmark.jsx';
import SectionLink from './SectionLink.jsx';
import { SocialIcon } from './Icon.jsx';
import { NAV, profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="fl-footer">
      <div className="fl-container">
        <div className="fl-footer__top">
          <div>
            <Wordmark size="sm" />
            <p className="fl-footer__blurb">{profile.blurb}</p>
          </div>

          <ul className="fl-footer__nav">
            {NAV.map((item) => (
              <li key={item.id}>
                <SectionLink id={item.id}>{item.label}</SectionLink>
              </li>
            ))}
            {profile.resumeUrl && (
              <li>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  Resume
                </a>
              </li>
            )}
          </ul>

          <div className="fl-footer__social">
            <div>
              {profile.social.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  className="fl-iconbtn"
                  aria-label={s.label}
                  target={s.id === 'email' ? undefined : '_blank'}
                  rel={s.id === 'email' ? undefined : 'noreferrer'}
                >
                  <SocialIcon id={s.id} />
                </a>
              ))}
            </div>
            <p className="fl-footer__note">Follow me, it&apos;s free :D</p>
          </div>
        </div>

        <div className="fl-footer__bottom">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.brand}
          </span>
          <span>Built with React &amp; Vite · {profile.locationShort}, UTC+7</span>
        </div>
      </div>
    </footer>
  );
}
