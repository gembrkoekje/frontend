import { Link, useParams } from 'react-router-dom';
import { usePokemonData } from '../context/PokemonContext';
import PageHeader from '../components/PageHeader';
import PokemonCard from '../components/PokemonCard';
import PokemonRow from '../components/PokemonRow';
import EmptyState from '../components/EmptyState';
import { MAX_TEAM_SIZE } from '../utils/pokemon';

function Detail() {
  const { id } = useParams();
  const { teams, favorites, addToTeam, removeFromTeam } = usePokemonData();

  const team = teams.find((item) => item.id === id);

  if (!team) {
    return (
      <section>
        <PageHeader title="Detail" subtitle="Detailpagina van één team" />

        <EmptyState>
          Teamdetail komt hier. Kies eerst een team in de <Link to="/list">lijst</Link>.
        </EmptyState>
      </section>
    );
  }

  const isFull = team.pokemon.length >= MAX_TEAM_SIZE;
  const emptySlots = MAX_TEAM_SIZE - team.pokemon.length;

  const availableFavorites = favorites.filter(
    (favorite) => !team.pokemon.some((pokemon) => pokemon.name === favorite.name)
  );

  return (
    <section>
      <Link className="d-inline-block mb-3 fw-semibold text-decoration-none" to="/list">
        ← Terug naar teams
      </Link>

      <PageHeader title={team.name} subtitle={`${team.pokemon.length} van ${MAX_TEAM_SIZE} plekken gevuld`} />

      <div className="row g-4 align-items-start">
        <div className="col-lg-8">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
            {team.pokemon.map((pokemon) => (
              <div className="col" key={pokemon.name}>
                <PokemonCard id={pokemon.id} name={pokemon.name} image={pokemon.image} types={pokemon.types}>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromTeam(team.id, pokemon.name)}
                  >
                    Uit team halen
                  </button>
                </PokemonCard>
              </div>
            ))}

            {Array.from({ length: emptySlots }, (_, index) => (
              <div className="col" key={`empty-${index}`}>
                <Link
                  className="empty-slot h-100 d-flex flex-column justify-content-center align-items-center gap-2 border border-2 border-dashed rounded-4 text-body-secondary text-decoration-none"
                  to="/pokemon"
                >
                  <span className="fs-2">+</span>
                  Zoek Pokémon
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <aside className="card shadow-sm sticky-lg-top side-panel">
            <div className="card-body p-4">
              <h2 className="h5 fw-bold">Uit favorieten</h2>
              <p className="text-body-secondary">Voeg snel een favoriete Pokémon toe aan dit team.</p>

              {favorites.length === 0 && (
                <EmptyState>
                  Nog geen favorieten. <Link to="/pokemon">Bekijk alle Pokémon</Link> en klik op ☆.
                </EmptyState>
              )}

              {favorites.length > 0 && availableFavorites.length === 0 && (
                <EmptyState>Al je favorieten zitten al in dit team.</EmptyState>
              )}

              <div className="list-group list-group-flush">
                {availableFavorites.map((pokemon) => (
                  <PokemonRow key={pokemon.name} name={pokemon.name} image={pokemon.image} types={pokemon.types}>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => addToTeam(team.id, pokemon)}
                      disabled={isFull}
                      title={isFull ? 'Team is vol' : 'Toevoegen aan team'}
                    >
                      +
                    </button>
                  </PokemonRow>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Detail;
