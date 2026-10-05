import { useState } from 'react';
import SkillGroup from './SkillGroup.jsx';

/**
 * The stack is 23 tiles across five groups. On a wide screen all five cards fit side by side and
 * showing them at once is the clearest thing. On a phone that is a metre of scrolling, so the
 * groups become switchable: chips pick one, and each group's tiles slide sideways within it.
 *
 * Both layouts render the same markup — CSS decides which is visible, so there is no flash of
 * the wrong one and no viewport listener.
 */
export default function StackGroups({ groups, layout = "grid" }) {
  const [active, setActive] = useState(groups[0]?.id);

  return (
    <div className="fl-stackx">
      <div className="fl-stackx__tabs fl-filter" role="tablist" aria-label="Parts of the stack">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            id={`stack-tab-${g.id}`}
            aria-selected={active === g.id}
            aria-controls={`stack-panel-${g.id}`}
            className="fl-fchip"
            aria-pressed={active === g.id}
            onClick={() => setActive(g.id)}
          >
            {g.title}
            <span className="fl-fchip__n">{g.skills.length}</span>
          </button>
        ))}
      </div>

      <div className={`fl-stackx__groups${layout === 'grid' ? ' fl-grid-3' : ''}`}>
        {groups.map((g) => (
          <div
            key={g.id}
            id={`stack-panel-${g.id}`}
            role="tabpanel"
            aria-labelledby={`stack-tab-${g.id}`}
            className={`fl-stackx__panel${active === g.id ? ' is-active' : ''}`}
          >
            <SkillGroup group={g} />
          </div>
        ))}
      </div>
    </div>
  );
}
