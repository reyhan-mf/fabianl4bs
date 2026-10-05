import TechLogo, { TECH_LOGOS } from './TechLogo.jsx';

/**
 * One group of the stack, each skill shown as its real brand mark over its name.
 * A few (Claude Code, the Gemini API) have no mark in the icon set, so they show as a plain
 * tile with the name alone rather than a stand-in glyph that would mean nothing.
 */
export default function SkillGroup({ group, as: Tag = 'h3' }) {
  return (
    <section className="fl-skill">
      <Tag className="fl-skill__head">
        <span className="fl-skill__title">{group.title}</span>
        <span className="fl-skill__count">{group.skills.length}</span>
      </Tag>
      <ul className="fl-stackgrid">
        {group.skills.map((s) => {
          const hasMark = s.logo && TECH_LOGOS[s.logo];
          return (
            <li key={s.name} className="fl-stackitem">
              {hasMark && <TechLogo name={s.logo} />}
              <span className="fl-stackitem__name">{s.name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
