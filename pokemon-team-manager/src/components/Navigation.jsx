import { NavLink, useLocation } from 'react-router-dom';
import { usePokemonData } from '../context/PokemonContext';

function Navigation({ onNavigate }) {
  const { teams, favorites } = usePokemonData();
  const { pathname } = useLocation();

  const teamsActive = pathname === '/list' || pathname.startsWith('/detail');

  return (
    <nav className="navbar-nav ms-auto gap-1 py-2 py-md-0">
      <NavLink className="nav-link px-3 rounded-3" to="/" end onClick={onNavigate}>
        Home
      </NavLink>

      <NavLink className="nav-link px-3 rounded-3" to="/pokemon" onClick={onNavigate}>
        Pokémon
      </NavLink>

      <NavLink className={`nav-link px-3 rounded-3 ${teamsActive ? 'active' : ''}`} to="/list" onClick={onNavigate}>
        Teams
        <span className="badge rounded-pill text-bg-primary ms-2">{teams.length}</span>
      </NavLink>

      <NavLink className="nav-link px-3 rounded-3" to="/favorites" onClick={onNavigate}>
        Favorieten
        <span className="badge rounded-pill text-bg-primary ms-2">{favorites.length}</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
