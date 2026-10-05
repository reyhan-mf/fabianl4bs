import { Icon } from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import OrgLogo from '../components/OrgLogo.jsx';
import { profile } from '../data/profile.js';
import { education, experience, papers } from '../data/experience.js';

function Role({ item }) {
  return (
    <li className={`fl-tl${item.current ? ' fl-tl--current' : ''}`}>
      <span className="fl-tl__dot" aria-hidden="true" />
      <article className="fl-tl__card">
        <div className="fl-tl__head fl-tl__head--nologo">
          <div>
            <h3 className="fl-tl__role">{item.role}</h3>
            <div className="fl-tl__org">
              <span>{item.org}</span>
              <span className={`fl-badge fl-badge--${item.badge}`}>{item.kind}</span>
            </div>
          </div>
          <p className="fl-tl__date">
            {item.date}
            {item.current && <span className="fl-sr"> (current role)</span>}
          </p>
        </div>

        <p className="fl-tl__loc">
          <Icon name="map-pin" />
          {item.location}
          {item.note && <span className="fl-muted"> · {item.note}</span>}
        </p>

        <ul className="fl-bullets">
          {item.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </article>
    </li>
  );
}

function EducationCard({ item }) {
  return (
    <article className="fl-edu">
      <OrgLogo src={item.logoSrc} initials={item.logo} size="lg" />
      <div>
        <h4 className="fl-edu__degree">{item.degree}</h4>
        <p className="fl-edu__school">{item.school}</p>
      </div>
      <p className="fl-edu__date">{item.date}</p>
      <div className="fl-edu__rest">
        <p className="fl-edu__line">
          <span>
            <Icon name="map-pin" />
            {item.location}
          </span>
          {item.gpa && (
            <span>
              <Icon name="graduation-cap" />
              {item.gpa}
            </span>
          )}
        </p>
        {item.subjects?.length > 0 && (
          <>
            <p className="fl-edu__thesis">Relevant coursework</p>
            <ul className="fl-tags" aria-label="Relevant coursework">
              {item.subjects.map((s) => (
                <li key={s} className="fl-tag">
                  {s}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}

/**
 * Work, study and research in one run. The three used to be separate stops; read top to bottom
 * they are one story, and the sub-headings keep it scannable without a route change.
 */
export default function Experience() {
  return (
    <section className="fl-section fl-section--tight fl-anchor" id="experience">
      <div className="fl-container">
        <div className="dt-head" style={{ marginBottom: 40 }}>
          <SectionHeader
            eyebrow="// 03 — experience"
            title="Where I've worked"
            intro="Now building the web full time at CrescentRating, after six months of NLP research at BRIN — both began as part-time work alongside full-time study."
          />
          <div className="dt-actions">
            <a
              className="fl-btn fl-btn--secondary"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="download" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        <ol className="fl-timeline">
          {experience.map((item) => (
            <Role key={item.id} item={item} />
          ))}
        </ol>

        <div className="fl-subsection">
          <SectionHeader as="h3" eyebrow="// education" title="Education" />
          {education.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>

        <div className="fl-subsection">
          <SectionHeader
            as="h3"
            eyebrow="// papers"
            title="Published research"
            intro="Four publications, first author on three."
          />
          <ol className="fl-papers">
            {papers.map((p, i) => (
              <li key={p.id}>
                <span className="fl-papers__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="fl-papers__title">
                    <a href={p.url} target="_blank" rel="noreferrer">
                      {p.title}
                      <Icon name="arrow-up-right" size="sm" />
                    </a>
                  </h4>
                  <p className="fl-papers__meta">
                    {p.venue} · {p.year}
                    {p.kind ? ` · ${p.kind}` : ''}
                  </p>
                  <p className="fl-papers__authors">{p.authors}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
