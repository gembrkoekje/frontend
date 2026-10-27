function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white text-body-secondary" aria-hidden="true">
        ⌕
      </span>

      <input
        type="search"
        className="form-control border-start-0"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}

export default SearchBar;
