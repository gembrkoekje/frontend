import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TypeList from '../components/TypeList';
import FavoriteButton from '../components/FavoriteButton';
import AddToTeam from '../components/AddToTeam';
import { formatNumber, toSummary } from '../utils/pokemon';

const STAT_NAMES = {
  hp: 'HP',
  attack: 'Aanval',
  defense: 'Verdediging',
  'special-attack': 'Sp. Aanval',
  'special-defense': 'Sp. Verdediging',
  speed: 'Snelheid',
};

const MAX_STAT = 255;

function PokemonDetail() {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

        if (!response.ok) {
          throw new Error('Pokémon niet gevonden');
        }

        const data = await response.json();

        if (!ignore) {
          setPokemon(data);
          setError(null);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) setError(`Pokémon "${name}" kon niet worden gevonden.`);
      }
    }

    fetchPokemon();

    return () => {
      ignore = true;
    };
  }, [name]);

  if (error) {
    return (
      <section>
        <Link className="d-inline-block mb-3 fw-semibold text-decoration-none" to="/pokemon">
          ← Terug naar Pokémon lijst
        </Link>
        <div className="alert alert-danger">{error}</div>
      </section>
    );
  }

  if (!pokemon || pokemon.name !== name.toLowerCase()) {
    return (
      <div className="d-flex align-items-center gap-2 text-body-secondary">
        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
        Pokémon laden...
      </div>
    );
  }

  const summary = toSummary(pokemon);
  const total = pokemon.stats.reduce((sum, item) => sum + item.base_stat, 0);

  return (
    <section>
      <Link className="d-inline-block mb-3 fw-semibold text-decoration-none" to="/pokemon">
        ← Terug naar Pokémon lijst
      </Link>

      <div
        className={`detail-banner type-${summary.types[0]} rounded-4 text-white p-4 p-md-5 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-4`}
      >
        <div>
          <span className="fw-bold opacity-75">{formatNumber(pokemon.id)}</span>
          <h1 className="display-4 fw-bold text-capitalize mt-1 mb-3">{pokemon.name}</h1>
          <TypeList types={summary.types} />

          <div className="detail-actions bg-white text-body rounded-3 p-2 mt-4 d-flex align-items-start gap-2">
            <FavoriteButton pokemon={summary} />
            <AddToTeam pokemon={summary} />
          </div>
        </div>

        {summary.image && <img className="detail-image img-fluid" src={summary.image} alt={pokemon.name} />}
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h5 fw-bold mb-3">Gegevens</h2>

              <dl className="row mb-0">
                <dt className="col-6 fw-normal text-body-secondary border-bottom py-2">Hoogte</dt>
                <dd className="col-6 fw-semibold text-end border-bottom py-2 mb-0">{pokemon.height / 10} m</dd>

                <dt className="col-6 fw-normal text-body-secondary border-bottom py-2">Gewicht</dt>
                <dd className="col-6 fw-semibold text-end border-bottom py-2 mb-0">{pokemon.weight / 10} kg</dd>

                <dt className="col-6 fw-normal text-body-secondary border-bottom py-2">Abilities</dt>
                <dd className="col-6 fw-semibold text-end text-capitalize border-bottom py-2 mb-0">
                  {pokemon.abilities.map((item) => item.ability.name).join(', ')}
                </dd>

                <dt className="col-6 fw-normal text-body-secondary py-2">Base experience</dt>
                <dd className="col-6 fw-semibold text-end py-2 mb-0">{pokemon.base_experience ?? '-'}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h5 fw-bold mb-3">Base stats</h2>

              {pokemon.stats.map((item) => (
                <div className="row align-items-center g-2 mb-2" key={item.stat.name}>
                  <span className="col-5 col-sm-4 text-body-secondary">{STAT_NAMES[item.stat.name] ?? item.stat.name}</span>
                  <span className="col-2 col-sm-1 fw-bold">{item.base_stat}</span>
                  <div className="col">
                    <div
                      className="progress stat-progress"
                      role="progressbar"
                      aria-label={STAT_NAMES[item.stat.name] ?? item.stat.name}
                      aria-valuenow={item.base_stat}
                      aria-valuemin={0}
                      aria-valuemax={MAX_STAT}
                    >
                      <div className="progress-bar stat-bar" style={{ width: `${(item.base_stat / MAX_STAT) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="row g-2 border-top pt-3 mt-3">
                <span className="col-5 col-sm-4 text-body-secondary">Totaal</span>
                <span className="col-2 col-sm-1 fw-bold">{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PokemonDetail;
