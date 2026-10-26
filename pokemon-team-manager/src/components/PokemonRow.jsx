import { Link } from 'react-router-dom';
import TypeList from './TypeList';

function PokemonRow({ name, image, types, children }) {
  return (
    <div className="list-group-item bg-transparent px-0 py-2 d-flex align-items-center gap-3">
      <img className="pokemon-row-image bg-body-tertiary rounded-3 object-fit-contain" src={image} alt={name} />

      <div className="flex-grow-1 d-flex flex-column gap-1">
        <Link className="fw-semibold text-capitalize text-decoration-none link-body-emphasis" to={`/pokemon/${name}`}>
          {name}
        </Link>
        <TypeList types={types} />
      </div>

      {children}
    </div>
  );
}

export default PokemonRow;
