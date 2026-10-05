import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SectionLink from '../components/SectionLink.jsx';
import TechTags from '../components/TechTags.jsx';
import { Icon } from '../components/Icon.jsx';
import { CATEGORY_ICON } from '../components/ProjectCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Lightbox from '../components/Lightbox.jsx';
import AdaptiveImage from '../components/AdaptiveImage.jsx';
import PlaceholderArt from '../components/PlaceholderArt.jsx';
import { bySlug, projects } from '../data/projects.js';

function Gallery({ items, shot, onOpen, label }) {
  if (!items?.length) return null;
  return (
    <div className={`fl-gallery${shot === 'phone' ? ' fl-gallery--phone' : ''}`}>
      {items.map((item) => (
        <figure key={item.src}>
          <button
            type="button"
            className="fl-gallery__img fl-gallery__btn"
            onClick={() => onOpen({ src: item.src, title: item.caption })}
            aria-label={`${item.caption || label} — view full size`}
          >
            <img src={item.src} alt="" loading="lazy" decoding="async" />
          </button>
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function Prose({ title, children, last = false }) {
  return (
    <section className="fl-prose" style={last ? { borderBottom: 0 } : undefined}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = bySlug(slug);
  const [shot, setShot] = useState(null);

  if (!project) return <Navigate to="/#projects" replace />;

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  const {
    title,
    category,
    tagline,
    overview,
    hero,
    thumb,
    tags = [],
    role,
    timeline,
    context,
    award,
    repoUrl,
    demoUrl,
    features,
    challenges,
    results,
    resultStats,
    architecture,
    charts,
    gallery,
    video,
    contributors,
  } = project;

  return (
    <>
      <article className="fl-section" style={{ paddingTop: 56, paddingBottom: 64 }}>
        <div className="fl-container">
          <SectionLink className="fl-link fl-crumb" id="projects">
            <Icon name="arrow-left" />
            All projects
          </SectionLink>

          <div className="dt-head">
            <div>
              <span className="fl-chip">
                <Icon name={CATEGORY_ICON[category] ?? 'code'} />
                {category}
              </span>
              <h1 className="fl-t-h1" style={{ margin: '16px 0 0' }}>
                {title}
              </h1>
              <p className="fl-t-lead fl-muted" style={{ margin: '12px 0 0', maxWidth: '40em' }}>
                {tagline}
              </p>
            </div>

            {(repoUrl || demoUrl) && (
              <div className="dt-actions">
                {demoUrl && (
                  <a className="fl-btn fl-btn--primary" href={demoUrl} target="_blank" rel="noreferrer">
                    <span>Live demo</span>
                    <Icon name="arrow-up-right" />
                  </a>
                )}
                {repoUrl && (
                  <a className="fl-btn fl-btn--secondary" href={repoUrl} target="_blank" rel="noreferrer">
                    <span>GitHub</span>
                    <Icon name="arrow-up-right" />
                  </a>
                )}
              </div>
            )}
          </div>

          {hero || thumb ? (
            <AdaptiveImage src={hero || thumb} size="page" />
          ) : (
            <div className="fl-shot fl-shot--page is-wide">
              <PlaceholderArt variant={project.placeholder} id={`d-${slug}`} />
            </div>
          )}

          <dl className="fl-meta">
            {role && (
              <div>
                <dt>role</dt>
                <dd>{role}</dd>
              </div>
            )}
            {timeline && (
              <div>
                <dt>timeline</dt>
                <dd>{timeline}</dd>
              </div>
            )}
            <div>
              <dt>stack</dt>
              <dd>
                <TechTags tags={tags} labels />
              </dd>
            </div>
            {context && (
              <div>
                <dt>context</dt>
                <dd>{context}</dd>
              </div>
            )}
            {award && (
              <div>
                <dt>award</dt>
                <dd>{award}</dd>
              </div>
            )}
          </dl>

          {overview && (
            <Prose title="Overview">
              <p>{overview}</p>
            </Prose>
          )}

          {features?.length > 0 && (
            <Prose title="Key features">
              <ul className="fl-bullets fl-bullets--flush">
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Prose>
          )}

          {challenges?.length > 0 && (
            <Prose title="Technical challenges">
              <ul className="fl-bullets fl-bullets--flush">
                {challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Prose>
          )}

          {(results?.length > 0 || resultStats?.length > 0) && (
            <Prose title="Results & impact" last={!contributors?.length}>
              {results?.length > 0 && (
                <ul className="fl-bullets fl-bullets--flush">
                  {results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
              {resultStats?.length > 0 && (
                <ul className="fl-stats">
                  {resultStats.map((s) => (
                    <li key={s.label} className="fl-stat">
                      <span className="fl-stat__n">
                        {s.value}
                        {s.sup && <sup>{s.sup}</sup>}
                      </span>
                      <span className="fl-stat__l">{s.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Prose>
          )}

          {contributors?.length > 0 && (
            <Prose title="Contributors" last>
              <ul className="fl-people">
                {contributors.map((c) => (
                  <li key={c.name}>
                    <img src={c.photo} alt="" loading="lazy" />
                    <div>
                      <p className="fl-people__name">{c.name}</p>
                      <p className="fl-people__role">{c.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Prose>
          )}
        </div>
      </article>

      {architecture && (
        <section className="fl-section fl-section--tight">
          <div className="fl-container">
            <SectionHeader eyebrow="// architecture" title="How it fits together" />
            <button
              type="button"
              className="fl-figure fl-figure--wide"
              onClick={() => setShot({ src: architecture.src, title: architecture.caption })}
              aria-label={`${architecture.caption} — view full size`}
            >
              <img src={architecture.src} alt="" loading="lazy" />
            </button>
          </div>
        </section>
      )}

      {charts?.length > 0 && (
        <section className="fl-section fl-section--tight">
          <div className="fl-container">
            <SectionHeader eyebrow="// results" title="Model & system results" />
            <Gallery items={charts} onOpen={setShot} label="Result" />
          </div>
        </section>
      )}

      {gallery?.length > 0 && (
        <section className="fl-section fl-section--tight">
          <div className="fl-container">
            <SectionHeader eyebrow="// screenshots" title="Inside the project" />
            <Gallery items={gallery} shot={project.shot} onOpen={setShot} label="Screenshot" />
          </div>
        </section>
      )}

      {video && (
        <section className="fl-section fl-section--tight">
          <div className="fl-container">
            <SectionHeader eyebrow="// demo" title="It running" />
            <figure className="fl-video">
              <video controls preload="metadata" playsInline>
                <source src={video.src} type="video/mp4" />
                Your browser cannot play this video.
              </video>
              {video.caption && <figcaption>{video.caption}</figcaption>}
            </figure>
          </div>
        </section>
      )}

      <section className="fl-section">
        <div className="fl-container">
          <nav className="fl-pager" aria-label="More projects">
            {prev ? (
              <Link className="fl-pager__item fl-pager__item--prev" to={`/projects/${prev.slug}`}>
                <span className="fl-pager__dir">
                  <Icon name="arrow-left" />
                  Previous project
                </span>
                <span className="fl-pager__title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link className="fl-pager__item fl-pager__item--next" to={`/projects/${next.slug}`}>
                <span className="fl-pager__dir">
                  Next project
                  <Icon name="arrow-right" />
                </span>
                <span className="fl-pager__title">{next.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </section>

      <Lightbox
        open={Boolean(shot)}
        title={shot?.title}
        src={shot?.src}
        onClose={() => setShot(null)}
      />
    </>
  );
}
