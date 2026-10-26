function TypeList({ types }) {
  return (
    <div className="d-flex flex-wrap gap-1">
      {types.map((type) => (
        <span key={type} className={`badge rounded-pill text-capitalize type type-${type}`}>
          {type}
        </span>
      ))}
    </div>
  );
}

export default TypeList;
