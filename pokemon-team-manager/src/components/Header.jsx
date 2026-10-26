import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Pokeball from './Pokeball';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar navbar-expand-md navbar-dark bg-navy sticky-top border-bottom border-4 border-warning">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={() => setOpen(false)}>
          <Pokeball size={44} />

          <span className="lh-sm">
            <span className="brand-title d-block">Pokémon</span>
            <small className="text-white-50 fs-6">Team Manager</small>
          </span>
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu openen"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <Navigation onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}

export default Header;
