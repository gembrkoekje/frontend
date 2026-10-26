import { PokemonContext } from './PokemonContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { MAX_TEAM_SIZE, capitalize } from '../utils/pokemon';

function PokemonProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [teams, setTeams] = useLocalStorage('teams', []);

  function isFavorite(name) {
    return favorites.some((pokemon) => pokemon.name === name);
  }

  function toggleFavorite(pokemon) {
    if (isFavorite(pokemon.name)) {
      setFavorites(favorites.filter((item) => item.name !== pokemon.name));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  }

  function createTeam(name) {
    const newTeam = {
      id: Date.now().toString(),
      name,
      pokemon: [],
    };

    setTeams([...teams, newTeam]);
  }

  function deleteTeam(teamId) {
    setTeams(teams.filter((team) => team.id !== teamId));
  }

  function addToTeam(teamId, pokemon) {
    const team = teams.find((item) => item.id === teamId);

    if (!team) {
      return 'Team niet gevonden.';
    }

    if (team.pokemon.some((item) => item.name === pokemon.name)) {
      return `${capitalize(pokemon.name)} zit al in ${team.name}.`;
    }

    if (team.pokemon.length >= MAX_TEAM_SIZE) {
      return `${team.name} is vol (max ${MAX_TEAM_SIZE}).`;
    }

    setTeams(
      teams.map((item) => (item.id === teamId ? { ...item, pokemon: [...item.pokemon, pokemon] } : item))
    );

    return `Toegevoegd aan ${team.name}!`;
  }

  function removeFromTeam(teamId, pokemonName) {
    setTeams(
      teams.map((team) =>
        team.id === teamId
          ? { ...team, pokemon: team.pokemon.filter((pokemon) => pokemon.name !== pokemonName) }
          : team
      )
    );
  }

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
    teams,
    createTeam,
    deleteTeam,
    addToTeam,
    removeFromTeam,
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
}

export default PokemonProvider;
