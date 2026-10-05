import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../lib/sections.js';

/**
 * A link to a section of the home page.
 *
 * It is a real `<a href="/#id">`, so middle-click, ⌘/ctrl-click and "copy link address" all
 * behave the way a reader expects. On a plain click it routes instead: from another route it
 * navigates home and lets ScrollManager land on the section; when the URL already points at
 * that section it scrolls directly, so clicking the same nav entry twice still takes you there.
 */
export default function SectionLink({ id, children, onNavigate, ...rest }) {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const onClick = (e) => {
    // Leave the browser's own behaviour alone for anything but a plain primary click.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    onNavigate?.();
    if (pathname === '/' && hash === `#${id}`) scrollToSection(id);
    else navigate(`/#${id}`);
  };

  return (
    <a href={`/#${id}`} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
