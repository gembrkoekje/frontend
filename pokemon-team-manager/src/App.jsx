import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="d-flex flex-column flex-grow-1">
        <main className="container py-4 py-md-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/list" element={<List />} />

            <Route path="/detail/:id" element={<Detail />} />

            <Route path="/pokemon" element={<PokemonList />} />

            <Route path="/pokemon/:name" element={<PokemonDetail />} />

            <Route path="/favorites" element={<Favorites />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
