function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="d-flex justify-content-center align-items-center gap-3 mt-4 text-body-secondary" aria-label="Paginering">
      <button className="btn btn-outline-secondary" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        ← Vorige
      </button>

      <span>
        Pagina {page} van {totalPages}
      </span>

      <button className="btn btn-outline-secondary" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        Volgende →
      </button>
    </nav>
  );
}

export default Pagination;
