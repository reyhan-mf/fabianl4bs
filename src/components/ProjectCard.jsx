import { Link } from 'react-router-dom';
import { Icon } from './Icon.jsx';
import TechTags from './TechTags.jsx';
import PlaceholderArt from './PlaceholderArt.jsx';

/* One mark per category, each meaning the thing it labels: a browser window for web, a handset
   for mobile, a processor for AI, a connected device for IoT, a screen for desktop. Every
   category in `CATEGORIES` must appear here — a missing one silently fell back to the generic
   code glyph, which is how Mobile ended up with the wrong mark. */
export const CATEGORY_ICON = {
  'AI/ML': 'chip',
  Web: 'browser',
  Mobile: 'phone',
  Data: 'database',
  IoT: 'iot',
  Desktop: 'monitor',
};

/* As many marks as fit on one line beside a "+N", at the card width the slider gives them.
   One more and the overflow chip wraps, which leaves that card a row taller than its neighbours. */
const MAX_TAGS = 5;

export default function ProjectCard({ project, as: Tag = 'h3' }) {
  const { slug, title, category, tagline, description, tags = [], thumb, thumbFit, placeholder } =
    project;
  return (
    <article className="fl-pcard">
      {/* Phone mockups and tall charts are contained rather than cropped — the system's
          `cover` default assumes a wide screenshot, and not every real asset is one. */}
      <div className={`fl-pcard__thumb${thumbFit === 'contain' ? ' fl-pcard__thumb--contain' : ''}`}>
        {thumb ? (
          <img src={thumb} alt="" loading="lazy" decoding="async" />
        ) : (
          <PlaceholderArt variant={placeholder} id={slug} />
        )}
      </div>

      <div className="fl-pcard__body">
        <div>
          <span className="fl-chip">
            <Icon name={CATEGORY_ICON[category] ?? 'code'} />
            {category}
          </span>
        </div>

        <Tag className="fl-pcard__title">
          {/* Search-only `to` keeps the current path, so the modal opens over whatever page
              you are on — and the URL stays shareable. */}
          <Link className="fl-pcard__link" to={`?project=${slug}`}>
            {title}
          </Link>
        </Tag>

        <p className="fl-pcard__tagline">{tagline}</p>
        <p className="fl-pcard__desc">{description}</p>

        <div className="fl-pcard__tags">
          <TechTags tags={tags} max={MAX_TAGS} label={`${title} — built with`} />
        </div>
      </div>

      {/* Just the one action. Live demo and source code belong in the modal, where there is room
          to say what each one is. */}
      <div className="fl-pcard__foot">
        <Link className="fl-link fl-link--next" to={`?project=${slug}`}>
          View details
          <Icon name="arrow-right" />
        </Link>
      </div>
    </article>
  );
}
