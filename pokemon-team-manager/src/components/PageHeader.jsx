function PageHeader({ title, subtitle, children }) {
  return (
    <div className="row align-items-end g-3 mb-4">
      <div className="col-md">
        <h1 className="fw-bold mb-1 text-capitalize">{title}</h1>
        {subtitle && <p className="text-body-secondary mb-0">{subtitle}</p>}
      </div>

      {children && <div className="col-md-6 col-lg-5 col-xl-4">{children}</div>}
    </div>
  );
}

export default PageHeader;
