import { useState } from 'react';
import { usePokemonData } from '../context/PokemonContext';
import PageHeader from '../components/PageHeader';
import TeamRow from '../components/TeamRow';
import EmptyState from '../components/EmptyState';

function List() {
  const { teams, createTeam, deleteTeam } = usePokemonData();
  const [teamName, setTeamName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const name = teamName.trim();

    if (!name) {
      return;
    }

    createTeam(name);
    setTeamName('');
  }

  function handleDelete(team) {
    if (window.confirm(`Weet je zeker dat je "${team.name}" wilt verwijderen?`)) {
      deleteTeam(team.id);
    }
  }

  return (
    <section>
      <PageHeader title="Lijst van teams" subtitle={`${teams.length} team(s) · maximaal 6 Pokémon per team`}>
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            placeholder="Naam nieuw team"
            aria-label="Naam nieuw team"
            maxLength={30}
          />

          <button className="btn btn-primary" type="submit">
            + Aanmaken
          </button>
        </form>
      </PageHeader>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          {teams.length === 0 ? (
            <EmptyState>Nog geen teams. Maak rechtsboven je eerste team aan.</EmptyState>
          ) : (
            <div className="list-group list-group-flush">
              {teams.map((team) => (
                <TeamRow key={team.id} team={team} onDelete={() => handleDelete(team)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default List;
