function Pokeball({ size = 40 }) {
  const line = Math.max(2, Math.round(size * 0.07));

  return <span className="pokeball" style={{ width: size, height: size, '--line': `${line}px` }} aria-hidden="true"></span>;
}

export default Pokeball;
