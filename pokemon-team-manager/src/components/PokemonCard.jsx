import { Link } from 'react-router-dom';
import TypeList from './TypeList';
import { formatNumber } from '../utils/pokemon';

function PokemonCard({ id, name, image, types, children }) {
  const mainType = types[0];

  return (
    <article className="card h-100 shadow-sm overflow-hidden poke-card">
      <Link
        className={`poke-card-top type-${mainType} position-relative d-flex justify-content-center align-items-center`}
        to={`/pokemon/${name}`}
      >
        <span className="position-absolute top-0 start-0 m-2 small fw-bold text-white">{formatNumber(id)}</span>
        {image ? <img src={image} alt={name} /> : <span className="display-5 text-white">?</span>}
      </Link>

      <div className="card-body pb-2">
        <Link
          className="d-block mb-2 fs-5 fw-bold text-capitalize text-decoration-none link-body-emphasis"
          to={`/pokemon/${name}`}
        >
          {name}
        </Link>

        <TypeList types={types} />
      </div>

      {children && (
        <div className="card-footer bg-transparent border-0 pt-2 pb-3 d-flex flex-wrap align-items-start gap-2">
          {children}
        </div>
      )}
    </article>
  );
}

export default PokemonCard;
