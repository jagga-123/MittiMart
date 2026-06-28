const PageShell = ({ eyebrow, title, description, actions, children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-brand-cream ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="text-xs uppercase font-bold tracking-[0.24em] text-brand-orange mb-2">
                {eyebrow}
              </div>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-brown">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm md:text-base text-brand-muted leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageShell;

