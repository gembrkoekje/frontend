import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';

function NotFound() {
  return (
    <section>
      <PageHeader title="404" subtitle="Pagina niet gevonden" />

      <EmptyState>
        Deze pagina bestaat niet. <Link to="/">Terug naar home</Link>
      </EmptyState>
    </section>
  );
}

export default NotFound;
