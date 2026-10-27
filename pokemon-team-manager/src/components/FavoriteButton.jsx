import { usePokemonData } from '../context/PokemonContext';

function FavoriteButton({ pokemon }) {
  const { isFavorite, toggleFavorite } = usePokemonData();
  const favorite = isFavorite(pokemon.name);

  return (
    <button
      type="button"
      className={`btn btn-sm rounded-circle favorite-button ${favorite ? 'btn-warning' : 'btn-outline-secondary'}`}
      onClick={() => toggleFavorite(pokemon)}
      aria-pressed={favorite}
      title={favorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
    >
      {favorite ? '★' : '☆'}
    </button>
  );
}

export default FavoriteButton;
