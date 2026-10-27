import { Link } from 'react-router-dom';
import { usePokemonData } from '../context/PokemonContext';
import StatCard from '../components/StatCard';
import TeamRow from '../components/TeamRow';
import EmptyState from '../components/EmptyState';
import Pokeball from '../components/Pokeball';
import Pokemon from '../components/Pokemon';

const PIKACHU_IMAGE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';

const FEATURED_IDS = [25, 1, 4, 7];

function Home() {
  const { teams, favorites } = usePokemonData();

  const pokemonInTeams = teams.reduce((total, team) => total + team.pokemon.length, 0);

  const recentTeams = teams.slice(-3).reverse();

  return (
    <section>
      <div className="hero position-relative overflow-hidden rounded-4 text-white p-4 p-md-5 mb-4 d-flex justify-content-between align-items-center gap-4">
        <div>
          <span className="badge rounded-pill bg-white bg-opacity-25 fw-normal px-3 py-2">Pokémon Team Manager</span>
          <h1 className="display-6 fw-bold mt-3 mb-2">Welkom terug, trainer!</h1>
          <p className="lead opacity-75 mb-4">
            Beheer je Pokémon-teams, houd favorieten bij en zoek nieuwe talenten tussen alle Pokémon.
          </p>

          <div className="d-flex flex-wrap gap-2">
            <Link className="btn btn-warning btn-lg fw-semibold" to="/pokemon">
              Bekijk alle Pokémon
            </Link>
            <Link className="btn btn-light btn-lg fw-semibold text-primary" to="/list">
              Team aanmaken
            </Link>
          </div>
        </div>

        <div className="hero-visual position-relative d-none d-md-flex justify-content-center align-items-center flex-shrink-0">
          <Pokeball size={230} />
          <img src={PIKACHU_IMAGE} alt="Pikachu" />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
        <div className="col">
          <StatCard icon="☰" label="Teams" value={teams.length} />
        </div>
        <div className="col">
          <StatCard icon="★" label="Favorieten" value={favorites.length} />
        </div>
        <div className="col">
          <StatCard icon="◎" label="Pokémon in teams" value={pokemonInTeams} />
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 fw-bold mb-0">Uitgelichte Pokémon</h2>
            <Link className="fw-semibold text-decoration-none" to="/pokemon">
              Alle Pokémon →
            </Link>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
            {FEATURED_IDS.map((id) => (
              <div className="col" key={id}>
                <Pokemon url={`https://pokeapi.co/api/v2/pokemon/${id}/`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="h5 fw-bold mb-0">Recente teams</h2>
            <Link className="fw-semibold text-decoration-none" to="/list">
              Alle teams →
            </Link>
          </div>

          {recentTeams.length === 0 ? (
            <EmptyState>
              Je hebt nog geen teams. <Link to="/list">Maak je eerste team aan</Link>.
            </EmptyState>
          ) : (
            <div className="list-group list-group-flush">
              {recentTeams.map((team) => (
                <TeamRow key={team.id} team={team} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
