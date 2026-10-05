import { Link } from 'react-router-dom';
import { Icon } from './Icon.jsx';

/**
 * Eyebrow + title, with an optional "see the rest" link on the right.
 * `page` renders the title as the h1-sized page heading.
 */
export default function SectionHeader({ eyebrow, title, intro, link, page = false, as: Tag = 'h2' }) {
  return (
    <div className={`fl-sh${page ? ' fl-sh--page' : ''}`}>
      <div>
        {eyebrow && <p className="fl-eyebrow">{eyebrow}</p>}
        <Tag className="fl-sh__title">{title}</Tag>
        {intro && <p className="fl-sh__intro">{intro}</p>}
      </div>
      {link && (
        <Link className="fl-link fl-link--next" to={link.to}>
          {link.label}
          <Icon name="arrow-right" />
        </Link>
      )}
    </div>
  );
}
