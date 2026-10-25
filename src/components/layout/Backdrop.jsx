// Cygnus the Swan (the Northern Cross): Deneb at the tail, Sadr at the centre,
// Gienah and Delta as the wing tips, then the head of Albireo.
const CYGNUS = [
  { id: "deneb", x: 63, y: 13, r: 2, d: 4.5, delay: 0 },
  { id: "sadr", x: 44, y: 43, r: 1.4, d: 5.5, delay: 1.2 },
  { id: "gienah", x: 19, y: 51, r: 1.2, d: 6, delay: 2.4 },
  { id: "delta", x: 72, y: 39, r: 1.2, d: 5, delay: 3.1 },
  { id: "eta", x: 36, y: 61, r: 0.9, d: 6.5, delay: 4.2 },
  { id: "albireo", x: 29, y: 75, r: 1.3, d: 5.2, delay: 0.7 },
];

const LINKS = [
  ["deneb", "sadr"],
  ["sadr", "gienah"],
  ["sadr", "delta"],
  ["sadr", "eta"],
  ["eta", "albireo"],
];

const star = (id) => CYGNUS.find((s) => s.id === id);

const r1 = (n) => Math.round(n * 10) / 10;
const DUST = Array.from({ length: 20 }, (_, i) => ({
  left: r1((i * 37.9) % 100),
  top: r1((i * 53.7 + (i % 6) * 8) % 100),
  size: 2 + (i % 3),
  d: 6 + (i % 5),
  delay: r1((i % 8) * 0.8),
}));

export default function Backdrop() {
  return (
    <div className="soft-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="float absolute -left-28 top-8 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="float absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-pink-100/50 blur-3xl" style={{ animationDelay: "2s" }} />

      {DUST.map((d, i) => (
        <span
          key={i}
          className="dust-twinkle absolute rounded-full bg-rose-300"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, "--d": `${d.d}s`, "--delay": `${d.delay}s` }}
        />
      ))}

      <div className="constellation absolute right-[2%] top-[6%] aspect-square w-[62vw] max-w-[720px] opacity-80 sm:w-[68vh] sm:opacity-100">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          {LINKS.map(([a, b], i) => (
            <line key={i} x1={star(a).x} y1={star(a).y} x2={star(b).x} y2={star(b).y} className="constellation-line" />
          ))}
          {CYGNUS.map((s) => (
            <g key={s.id}>
              <circle cx={s.x} cy={s.y} r={s.r * 2.6} fill="rgba(184,122,124,0.10)" />
              <circle cx={s.x} cy={s.y} r={s.r} className="star-shine" style={{ "--d": `${s.d}s`, "--delay": `${s.delay}s` }} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}