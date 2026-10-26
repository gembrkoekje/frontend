function StatCard({ label, value, icon }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex align-items-center gap-3">
        <span className="stat-card-icon d-flex justify-content-center align-items-center bg-warning rounded-3 fs-5">
          {icon}
        </span>

        <div>
          <strong className="d-block fs-3 lh-1 mb-1">{value}</strong>
          <span className="text-body-secondary">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
