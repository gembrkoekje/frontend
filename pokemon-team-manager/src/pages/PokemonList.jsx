import { useEffect, useState } from 'react';
import Pokemon from '../components/Pokemon';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';

const PAGE_SIZES = [12, 24, 48, 'all'];

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);

  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((response) => response.json())
      .then((data) => {
        const names = data.results.map((item) => item.name);
        setTypes(names.filter((name) => name !== 'unknown' && name !== 'stellar'));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let ignore = false;

    async function fetchPokemonList() {
      try {
        let results;

        if (type) {
          const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

          if (!response.ok) {
            throw new Error('Pokémon konden niet worden opgehaald.');
          }

          const data = await response.json();
          results = data.pokemon.map((item) => item.pokemon);
        } else {
          const countResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');

          if (!countResponse.ok) {
            throw new Error('Pokémon konden niet worden opgehaald.');
          }

          const { count } = await countResponse.json();
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`);

          if (!response.ok) {
            throw new Error('Pokémon konden niet worden opgehaald.');
          }

          const data = await response.json();
          results = data.results;
        }

        if (!ignore) {
          setPokemonList(results);
          setError(null);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) setError('Pokémon konden niet worden opgehaald. Probeer het later opnieuw.');
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchPokemonList();

    return () => {
      ignore = true;
    };
  }, [type]);

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handleTypeChange(value) {
    setType(value);
    setPage(1);
    setLoading(true);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo(0, 0);
  }

  const query = search.trim().toLowerCase();
  const filteredPokemon = pokemonList.filter((pokemon) => pokemon.name.includes(query));

  const perPage = pageSize === 'all' ? Math.max(1, filteredPokemon.length) : pageSize;
  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / perPage));
  const start = (page - 1) * perPage;
  const visiblePokemon = filteredPokemon.slice(start, start + perPage);

  return (
    <section>
      <PageHeader
        title="Pokémon lijst"
        subtitle={loading ? 'Laden...' : `${filteredPokemon.length} Pokémon`}
      >
        <SearchBar value={search} onChange={handleSearchChange} placeholder="Zoek op naam..." />
      </PageHeader>

      <TypeFilter types={types} value={type} onChange={handleTypeChange} />

      <div className="d-flex align-items-center gap-2 mb-4">
        <label className="small text-body-secondary" htmlFor="page-size">
          Per pagina:
        </label>
        <select
          id="page-size"
          className="form-select form-select-sm w-auto"
          value={pageSize}
          onChange={(event) => {
            const value = event.target.value;
            setPageSize(value === 'all' ? 'all' : Number(value));
            setPage(1);
          }}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size === 'all' ? 'Alles' : size}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2 text-body-secondary">
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          Pokémon laden...
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          {visiblePokemon.length === 0 ? (
            <EmptyState>Geen Pokémon gevonden voor "{search}".</EmptyState>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
              {visiblePokemon.map((pokemon) => (
                <div className="col" key={pokemon.name}>
                  <Pokemon url={pokemon.url} />
                </div>
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </section>
  );
}

export default PokemonList;
