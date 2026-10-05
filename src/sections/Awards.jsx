import { useState } from 'react';
import { Icon, Illustration } from '../components/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import AwardCard from '../components/AwardCard.jsx';
import CardSlider from '../components/CardSlider.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { awards } from '../data/awards.js';
import { courses } from '../data/experience.js';

export default function Awards() {
  const [cert, setCert] = useState(null);
  const firsts = awards.filter((a) => a.title.startsWith('1st')).length;
  const runnersUp = awards.length - firsts;

  return (
    <section className="fl-section fl-anchor" id="awards">
      <div className="fl-container">
        <SectionHeader
          eyebrow="// 04 — awards"
          title="Awards & certificates"
          intro="Competitions and course prizes — each with its certificate."
        />

        <p className="fl-stats--inline" style={{ margin: '-16px 0 40px' }}>
          <b>{firsts}</b> first places <i>·</i> <b>{runnersUp}</b> runner-up placings <i>·</i>{' '}
          <b>{courses.length}</b> certifications
        </p>

        <CardSlider label="Awards" className="fl-slider--cards">
          {awards.map((a) => (
            <li key={a.id}>
              <AwardCard award={a} onViewCertificate={setCert} />
            </li>
          ))}
        </CardSlider>

        <div className="fl-subsection">
          <SectionHeader as="h3" eyebrow="// certifications" title="Courses & certifications" />
          <CardSlider label="Certifications" className="fl-slider--cards">
            {courses.map((c) => (
              <li key={c.id}>
                <article className="fl-award">
                  <div className="fl-award__top">
                    <Illustration name={c.badge} size="md" />
                    <span className="fl-award__date">{c.date}</span>
                  </div>
                  <h4 className="fl-award__title">{c.title}</h4>
                  <p className="fl-award__issuer">{c.issuer}</p>
                  {c.note && <p className="fl-award__desc">{c.note}</p>}
                  {c.certificate && (
                    <div className="fl-award__foot">
                      <button
                        type="button"
                        className="fl-link fl-link--plain"
                        onClick={() => setCert(c)}
                      >
                        View certificate
                        <Icon name="image" />
                      </button>
                    </div>
                  )}
                </article>
              </li>
            ))}
          </CardSlider>
        </div>
      </div>

      <Lightbox
        open={Boolean(cert)}
        title={cert ? `${cert.title} — ${cert.issuer}` : ''}
        src={cert?.certificate}
        onClose={() => setCert(null)}
      />
    </section>
  );
}
