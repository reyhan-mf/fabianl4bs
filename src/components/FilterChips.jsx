export default function FilterChips({ options, counts, value, onChange, label = 'Filter projects' }) {
  return (
    <div className="fl-filter" role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className="fl-fchip"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
        >
          {opt}
          <span className="fl-fchip__n">{counts[opt] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
