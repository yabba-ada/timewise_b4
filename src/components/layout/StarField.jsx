const r1 = (n) => Math.round(n * 10) / 10;

const STARS = Array.from({ length: 36 }, (_, i) => ({
  left: r1((i * 37.7) % 100),
  top: r1((i * 53.3 + (i % 5) * 7) % 100),
  size: 10 + ((i * 7) % 18),
  d: 2 + (i % 5),
  delay: r1((i % 7) * 0.6),
  glyph: i % 3 === 0 ? "★" : "✦",
  tone: i % 2 === 0 ? "#f9a8d4" : "#d8b4fe",
}));

export default function StarField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden sky-bg" aria-hidden>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star-twinkle absolute select-none"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: s.size, color: s.tone, "--d": `${s.d}s`, "--delay": `${s.delay}s` }}
        >
          {s.glyph}
        </span>
      ))}
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl float" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl float" style={{ animationDelay: "1.5s" }} />
    </div>
  );
}