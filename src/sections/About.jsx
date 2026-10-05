import SectionHeader from '../components/SectionHeader.jsx';
import SkillGroup from '../components/SkillGroup.jsx';
import StackGroups from '../components/StackGroups.jsx';
import { profile } from '../data/profile.js';
import { allSkills, languages, skillGroups } from '../data/experience.js';

export default function About() {
  return (
    <section className="fl-section fl-section--tight fl-anchor" id="about">
      <div className="fl-container">
        <SectionHeader eyebrow="// 01 — about" title="A curious builder with a lab notebook" />

        <div className="fl-about">
          <div className="fl-about__text">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <ul className="fl-stats">
              {profile.stats.map((s) => (
                <li key={s.label} className="fl-stat">
                  <span className="fl-stat__n">
                    {s.value}
                    {s.sup && <sup>{s.sup}</sup>}
                  </span>
                  <span className="fl-stat__l">{s.label}</span>
                </li>
              ))}
            </ul>

            {/* The stack panel beside this says what I build with; the languages say what I
                work in. Both used to sit on a separate page. */}
            <p className="fl-stats--inline" style={{ marginTop: 'var(--space-6)' }}>
              {languages.map((l, i) => (
                <span key={l.name}>
                  {i > 0 && <i> · </i>}
                  <b>{l.name}</b> {l.level}
                </span>
              ))}
            </p>
          </div>

          {/* Two renderings, one shown at a time by CSS. On desktop the whole stack fits in the
              sidebar as a single card and reads at a glance; on a phone that same card is 750px
              of scrolling, so the groups become chips with one panel at a time. */}
          <div className="fl-about__side">
            <div className="fl-stackswap__wide">
              <SkillGroup group={{ id: 'all', title: 'Tech stack', skills: allSkills }} />
            </div>
            <div className="fl-stackswap__narrow">
              <StackGroups groups={skillGroups} layout="column" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
