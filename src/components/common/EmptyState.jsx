export default function EmptyState({ title, text, children }) {
  return (
    <div className="glass rounded-3xl p-10 text-center">
      <div className="float text-5xl text-pink-300">★</div>
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-xs text-sm text-pink-900/60">{text}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}