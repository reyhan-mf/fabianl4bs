import { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import FilterChips from '../components/FilterChips.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import CardSlider from '../components/CardSlider.jsx';
import { CATEGORIES, countByCategory, projects } from '../data/projects.js';

const OPTIONS = ['All', ...CATEGORIES];

/**
 * Every project in one sliding row, with the chips deciding what is in it.
 *
 * This was six rows, one per category, stacked — about 6,000px of the page, most of it scrolled
 * past rather than read. The categories have not gone anywhere: they are the chips, and each
 * card still wears its own category, so the grouping is still legible without costing a screen
 * of height per category.
 */
export default function Projects() {
  const [filter, setFilter] = useState('All');
  const counts = useMemo(countByCategory, []);

  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section className="fl-section fl-anchor" id="projects">
      <div className="fl-container">
        <SectionHeader
          eyebrow="// 02 — projects"
          title="Things I've built"
          intro="Web apps, AI models, analytics dashboards and hardware trainers — most of them coursework, research or competition builds. Slide the row, or filter to one kind."
        />

        <div style={{ margin: '-8px 0 32px' }}>
          <FilterChips options={OPTIONS} counts={counts} value={filter} onChange={setFilter} />
        </div>

        <p className="fl-sr" role="status">
          {`${shown.length} ${shown.length === 1 ? 'project' : 'projects'}${
            filter === 'All' ? '' : ` in ${filter}`
          }`}
        </p>

        {/* Keyed on the filter so switching builds a fresh row rather than re-using the old
            one's scroll position, which otherwise left a short row parked mid-way along. */}
        <CardSlider key={filter} label={`${filter} projects`} className="fl-slider--cards">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </CardSlider>
      </div>
    </section>
  );
}
