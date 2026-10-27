import { Link } from 'react-router-dom';
import { MAX_TEAM_SIZE } from '../utils/pokemon';

function TeamRow({ team, onDelete }) {
  const slots = Array.from({ length: MAX_TEAM_SIZE }, (_, index) => team.pokemon[index]);
  const percentage = (team.pokemon.length / MAX_TEAM_SIZE) * 100;

  return (
    <div className="list-group-item bg-transparent px-0 py-3">
      <div className="row align-items-center g-3">
        <div className="col-lg-3">
          <Link className="fs-5 fw-bold text-decoration-none link-body-emphasis" to={`/detail/${team.id}`}>
            {team.name}
          </Link>

          <div
            className="progress my-2 team-progress"
            role="progressbar"
            aria-valuenow={team.pokemon.length}
            aria-valuemin={0}
            aria-valuemax={MAX_TEAM_SIZE}
            title={`${team.pokemon.length} van ${MAX_TEAM_SIZE}`}
          >
            <div className="progress-bar bg-primary" style={{ width: `${percentage}%` }}></div>
          </div>

          <span className="small text-body-secondary">
            {team.pokemon.length}/{MAX_TEAM_SIZE} Pokémon
          </span>
        </div>

        <div className="col-lg d-flex flex-wrap gap-2">
          {slots.map((pokemon, index) =>
            pokemon ? (
              <img
                key={pokemon.name}
                className="team-slot bg-body-tertiary rounded-3 object-fit-contain"
                src={pokemon.image}
                alt={pokemon.name}
                title={pokemon.name}
              />
            ) : (
              <span key={`empty-${index}`} className="team-slot border border-2 border-dashed rounded-3"></span>
            )
          )}
        </div>

        <div className="col-lg-auto d-flex gap-2">
          <Link className="btn btn-primary btn-sm" to={`/detail/${team.id}`}>
            Beheren
          </Link>

          {onDelete && (
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={onDelete}>
              Verwijderen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamRow;
