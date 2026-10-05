import { Icon, Illustration } from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import SectionLink from '../components/SectionLink.jsx';
import { profile } from '../data/profile.js';

const FLOATS = ['browser-code', 'monitor-chart', 'phone-gear', 'chip-brain'];

export default function Hero() {
  return (
    <section className="fl-hero" aria-labelledby="hero-title">
      <div className="fl-floats" aria-hidden="true">
        {FLOATS.map((name, i) => (
          <span key={name} className={`fl-float fl-float--${i + 1}`}>
            <Illustration name={name} />
          </span>
        ))}
      </div>

      {/* Portrait on the left, words on the right: the pixel portrait faces right, so it looks
          into the page rather than off the edge of it. */}
      <div className="fl-container fl-hero__in fl-hero__in--flip">
        <div className="fl-hero__art">
          <Avatar />
        </div>

        <div>
          <p className="fl-eyebrow">// hello, world</p>
          <h1 className="fl-hero__title" id="hero-title">
            Hi, I&apos;m {profile.short} 👋
          </h1>
          <p className="fl-hero__tagline">
            {profile.tagline.lead}
            <strong>{profile.tagline.strong}</strong>
            {profile.tagline.rest}
          </p>

          <div className="fl-hero__actions">
            <SectionLink className="fl-btn fl-btn--primary" id="projects">
              <span>View projects</span>
              <Icon name="arrow-right" />
            </SectionLink>
            <SectionLink className="fl-btn fl-btn--secondary" id="contact">
              <Icon name="mail" />
              <span>Contact</span>
            </SectionLink>
          </div>

          <p className="fl-hero__meta">
            <span>
              <Icon name="map-pin" />
              {profile.locationShort}
            </span>
            <span>
              <Icon name="briefcase" />
              {profile.availability}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
