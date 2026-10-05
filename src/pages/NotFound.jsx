import { Link } from 'react-router-dom';
import SectionLink from '../components/SectionLink.jsx';
import { Icon, Illustration } from '../components/Icon.jsx';

export default function NotFound() {
  return (
    <section className="fl-section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="fl-container fl-notfound">
        <Illustration name="browser-code" />
        <p className="fl-eyebrow">// 404</p>
        <h1 className="fl-t-h1">This page isn&apos;t in the notebook</h1>
        <p className="fl-t-lead fl-muted">
          The link may be old, or the page may have moved. The projects are all still here.
        </p>
        <div className="fl-hero__actions">
          <Link className="fl-btn fl-btn--primary" to="/">
            <span>Back home</span>
            <Icon name="arrow-right" />
          </Link>
          <SectionLink className="fl-btn fl-btn--secondary" id="projects">
            <Icon name="layers" />
            <span>View projects</span>
          </SectionLink>
        </div>
      </div>
    </section>
  );
}
