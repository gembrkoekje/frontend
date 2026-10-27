function TypeFilter({ types, value, onChange }) {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter op type">
      <button
        type="button"
        className={`btn btn-sm rounded-pill chip ${value === '' ? 'active' : ''}`}
        onClick={() => onChange('')}
        aria-pressed={value === ''}
      >
        Alle types
      </button>

      {types.map((type) => (
        <button
          key={type}
          type="button"
          className={`btn btn-sm rounded-pill text-capitalize chip type-${type} ${value === type ? 'active' : ''}`}
          onClick={() => onChange(type)}
          aria-pressed={value === type}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter;
