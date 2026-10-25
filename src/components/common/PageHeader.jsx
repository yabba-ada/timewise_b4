export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-3">
      <div>
        <h1 className="text-3xl font-semibold text-shimmer">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-pink-900/60">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}