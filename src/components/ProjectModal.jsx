import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from './Modal.jsx';
import Lightbox from './Lightbox.jsx';
import AdaptiveImage from './AdaptiveImage.jsx';
import PlaceholderArt from './PlaceholderArt.jsx';
import { Icon } from './Icon.jsx';
import TechTags from './TechTags.jsx';
import { CATEGORY_ICON } from './ProjectCard.jsx';
import { bySlug, projects } from '../data/projects.js';

/** A case study is worth a page of its own only when there is more than the modal shows. */
const hasCaseStudy = (p) =>
  Boolean(p.features?.length || p.challenges?.length || p.charts?.length || p.architecture || p.video);

function Meta({ project }) {
  const rows = [
    ['role', project.role],
    ['timeline', project.timeline],
    ['context', project.context],
    ['award', project.award],
  ].filter(([, v]) => v);
  if (!rows.length) return null;
  return (
    <dl className="fl-pm__meta">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Body({ project, onShot }) {
  const shots = [...(project.gallery ?? []), ...(project.charts ?? [])].slice(0, 8);

  return (
    <div className="fl-pm__body">
      {project.hero || project.thumb ? (
        <AdaptiveImage
          src={project.hero || project.thumb}
          size="modal"
          onZoom={() => onShot({ src: project.hero || project.thumb, caption: project.title })}
        />
      ) : (
        <div className="fl-shot fl-shot--modal is-wide">
          <PlaceholderArt variant={project.placeholder} id={`m-${project.slug}`} />
        </div>
      )}

      <div className="fl-pm__main">
        {/* wrapped: a bare `.fl-chip` as a grid child would stretch to the column width */}
        <div>
          <span className="fl-chip">
            <Icon name={CATEGORY_ICON[project.category] ?? 'code'} />
            {project.category}
          </span>
        </div>

        <h2 className="fl-pm__title">{project.title}</h2>
        <p className="fl-pm__tagline">{project.tagline}</p>
        <p className="fl-pm__desc">{project.overview || project.description}</p>

        <Meta project={project} />

        <div>
          <p className="fl-pm__label">Built with</p>
          <TechTags tags={project.tags} labels />
        </div>

        {project.features?.length > 0 && (
          <div>
            <p className="fl-pm__label">Key features</p>
            <ul className="fl-bullets fl-bullets--flush">
              {project.features.slice(0, 4).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {shots.length > 0 && (
          <div>
            <p className="fl-pm__label">A look inside</p>
            <ul className={`fl-pm__shots${project.shot === 'phone' ? ' fl-pm__shots--phone' : ''}`}>
              {shots.map((s) => (
                <li key={s.src}>
                  <button
                    type="button"
                    onClick={() => onShot(s)}
                    aria-label={`${s.caption || project.title} — view full size`}
                  >
                    <img src={s.src} alt="" loading="lazy" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Actions({ project, onClose }) {
  const { repoUrl, demoUrl } = project;
  const nothing = !repoUrl && !demoUrl;

  return (
    <div className="fl-pm__actions">
      <div className="fl-pm__actionrow">
        {demoUrl && (
          <a className="fl-btn fl-btn--primary" href={demoUrl} target="_blank" rel="noreferrer">
            <Icon name="browser" />
            <span>See it live</span>
            <Icon name="arrow-up-right" size="sm" />
          </a>
        )}
        {repoUrl && (
          <a
            className={`fl-btn ${demoUrl ? 'fl-btn--secondary' : 'fl-btn--primary'}`}
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="code" />
            <span>Source code</span>
            <Icon name="arrow-up-right" size="sm" />
          </a>
        )}
        {nothing && (
          <p className="fl-hint fl-pm__nolinks">
            <Icon name="alert-circle" size="sm" />
            No public demo or repository for this one — the write-up is all there is.
          </p>
        )}
      </div>

      {hasCaseStudy(project) && (
        <Link className="fl-link fl-link--next" to={`/projects/${project.slug}`} onClick={onClose}>
          Read the full case study
          <Icon name="arrow-right" />
        </Link>
      )}
    </div>
  );
}

/**
 * Mounted once, in App. The open project lives in the URL as `?project=<slug>`, so the modal is
 * shareable, the browser's Back button closes it, and a reload reopens it.
 */
export default function ProjectModal() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [shot, setShot] = useState(null);

  const slug = params.get('project');
  const project = slug ? bySlug(slug) : null;

  // A stale or mistyped `?project=` would otherwise sit in the URL doing nothing.
  useEffect(() => {
    if (!slug || project) return;
    const next = new URLSearchParams(params);
    next.delete('project');
    setParams(next, { replace: true });
  }, [slug, project, params, setParams]);

  // Opening pushes an entry, so Back closes the modal. Closing replaces it instead of pushing,
  // so Back after a close does not walk straight back into the modal you just dismissed.
  const close = () => {
    setShot(null);
    const next = new URLSearchParams(params);
    next.delete('project');
    setParams(next, { replace: true });
  };

  const go = (delta) => {
    const i = projects.findIndex((p) => p.slug === slug);
    const nextProject = projects[(i + delta + projects.length) % projects.length];
    setShot(null);
    navigate(`${location.pathname}?project=${nextProject.slug}`, { replace: true });
  };

  if (!project) return null;

  return (
    <>
      <Modal open onClose={close} label={`${project.title} — project details`} className="fl-modal--project">
        <div className="fl-pm__bar">
          <p className="fl-modal__eyebrow">// project</p>
          <div className="fl-pm__nav">
            <button
              type="button"
              className="fl-iconbtn fl-iconbtn--ghost fl-iconbtn--sm"
              aria-label="Previous project"
              onClick={() => go(-1)}
            >
              <Icon name="chevron-left" size="md" />
            </button>
            <button
              type="button"
              className="fl-iconbtn fl-iconbtn--ghost fl-iconbtn--sm"
              aria-label="Next project"
              onClick={() => go(1)}
            >
              <Icon name="chevron-right" size="md" />
            </button>
            <button type="button" className="fl-iconbtn fl-iconbtn--ghost" aria-label="Close" onClick={close}>
              <Icon name="close" />
            </button>
          </div>
        </div>

        {/* Keyed on the slug: stepping to another project remounts the body, so it starts back at
            the top instead of keeping the previous project's scroll, and the hero re-measures. */}
        <Body key={project.slug} project={project} onShot={setShot} />
        <Actions project={project} onClose={close} />
      </Modal>

      <Lightbox
        open={Boolean(shot)}
        title={shot?.caption}
        src={shot?.src}
        onClose={() => setShot(null)}
      />
    </>
  );
}
