import TechLogo from './TechLogo.jsx';
import { logoForTag } from '../design/tech-logos.js';

/**
 * The stack a project is built with, as brand marks.
 *
 * A tag only appears if the mark set knows it, which is the whole rule: the tags used to mix
 * tools with concepts ("Flask", "RAG", "Machine Learning"), and the concepts said what the
 * project is — something its tagline and its category chip already say, twice over.
 *
 * `labels` is the difference between the two places this appears. On a card the marks run as a
 * compact row with no text, because the row is a signature you read at a glance and four words
 * of mono type would crowd out the description. In the modal and the case study, where the
 * stack is something you have stopped to read, each mark carries its name.
 */
export default function TechTags({ tags = [], max, labels = false, label = 'Built with' }) {
  const marked = tags.map((t) => ({ tag: t, logo: logoForTag(t) })).filter((t) => t.logo);
  if (!marked.length) return null;

  const shown = max ? marked.slice(0, max) : marked;
  const rest = max ? marked.slice(max) : [];

  return (
    <ul className={`fl-techtags${labels ? ' fl-techtags--labelled' : ''}`} aria-label={label}>
      {shown.map(({ tag, logo }) => (
        <li key={tag} className="fl-techtag" title={labels ? undefined : tag}>
          <TechLogo name={logo} />
          {labels ? <span>{tag}</span> : <span className="fl-sr">{tag}</span>}
        </li>
      ))}
      {rest.length > 0 && (
        <li className="fl-techtag fl-techtag--more" title={rest.map((r) => r.tag).join(', ')}>
          <span aria-hidden="true">+{rest.length}</span>
          <span className="fl-sr">{`and ${rest.map((r) => r.tag).join(', ')}`}</span>
        </li>
      )}
    </ul>
  );
}
