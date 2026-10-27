import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePokemonData } from '../context/PokemonContext';
import PageHeader from '../components/PageHeader';
import PokemonCard from '../components/PokemonCard';
import FavoriteButton from '../components/FavoriteButton';
import AddToTeam from '../components/AddToTeam';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import EmptyState from '../components/EmptyState';

function Favorites() {
  const { favorites } = usePokemonData();

  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  const types = [...new Set(favorites.flatMap((pokemon) => pokemon.types))].sort();

  const query = search.trim().toLowerCase();
  const filteredFavorites = favorites.filter(
    (pokemon) => pokemon.name.includes(query) && (type === '' || pokemon.types.includes(type))
  );

  if (favorites.length === 0) {
    return (
      <section>
        <PageHeader title="Favorieten" subtitle="Je shortlist voor nieuwe teams" />

        <EmptyState>
          Nog geen favoriete Pokémon. <Link to="/pokemon">Bekijk alle Pokémon</Link> en klik op ☆.
        </EmptyState>
      </section>
    );
  }

  return (
    <section>
      <PageHeader
        title="Favorieten"
        subtitle={`${filteredFavorites.length} van ${favorites.length} favorieten`}
      >
        <SearchBar value={search} onChange={setSearch} placeholder="Zoek in favorieten..." />
      </PageHeader>

      <TypeFilter types={types} value={type} onChange={setType} />

      {filteredFavorites.length === 0 ? (
        <EmptyState>Geen favorieten gevonden met deze filters.</EmptyState>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredFavorites.map((pokemon) => (
            <div className="col" key={pokemon.name}>
              <PokemonCard id={pokemon.id} name={pokemon.name} image={pokemon.image} types={pokemon.types}>
                <FavoriteButton pokemon={pokemon} />
                <AddToTeam pokemon={pokemon} />
              </PokemonCard>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
