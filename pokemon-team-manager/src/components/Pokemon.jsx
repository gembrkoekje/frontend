import { useEffect, useRef, useState } from 'react';
import PokemonCard from './PokemonCard';
import FavoriteButton from './FavoriteButton';
import AddToTeam from './AddToTeam';
import { toSummary } from '../utils/pokemon';

function Pokemon({ url }) {
  const placeholderRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const element = placeholderRef.current;

    if (!element || visible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    let ignore = false;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokémon kon niet worden opgehaald.');
        }
        return response.json();
      })
      .then((data) => {
        if (!ignore) setPokemon(toSummary(data));
      })
      .catch((error) => {
        console.error(error);
        if (!ignore) setError(true);
      });

    return () => {
      ignore = true;
    };
  }, [url, visible]);

  if (error) {
    return (
      <article className="card h-100 shadow-sm card-placeholder justify-content-center align-items-center text-body-secondary">
        Kon deze Pokémon niet laden.
      </article>
    );
  }

  if (!pokemon) {
    return (
      <article className="card h-100 shadow-sm card-placeholder justify-content-center align-items-center" ref={placeholderRef}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Laden...</span>
        </div>
      </article>
    );
  }

  return (
    <PokemonCard id={pokemon.id} name={pokemon.name} image={pokemon.image} types={pokemon.types}>
      <FavoriteButton pokemon={pokemon} />
      <AddToTeam pokemon={pokemon} />
    </PokemonCard>
  );
}

export default Pokemon;
