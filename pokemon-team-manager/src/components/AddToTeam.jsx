import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePokemonData } from '../context/PokemonContext';
import { MAX_TEAM_SIZE } from '../utils/pokemon';

function AddToTeam({ pokemon }) {
  const { teams, addToTeam } = usePokemonData();
  const [teamId, setTeamId] = useState('');
  const [message, setMessage] = useState('');

  if (teams.length === 0) {
    return (
      <Link className="small fw-semibold text-decoration-none" to="/list">
        + Maak eerst een team
      </Link>
    );
  }

  const selectedTeamId = teams.some((team) => team.id === teamId) ? teamId : teams[0].id;

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(addToTeam(selectedTeamId, pokemon));
  }

  function handleChange(event) {
    setTeamId(event.target.value);
    setMessage('');
  }

  return (
    <form className="flex-grow-1" onSubmit={handleSubmit}>
      <div className="input-group input-group-sm">
        <select className="form-select" value={selectedTeamId} onChange={handleChange} aria-label="Kies een team">
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name} ({team.pokemon.length}/{MAX_TEAM_SIZE})
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary" title="Toevoegen aan team" aria-label="Toevoegen aan team">
          + Team
        </button>
      </div>

      {message && <div className="form-text">{message}</div>}
    </form>
  );
}

export default AddToTeam;
