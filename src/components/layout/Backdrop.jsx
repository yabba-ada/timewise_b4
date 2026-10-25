const r1 = (n) => Math.round(n * 10) / 10;
const TONES = ["#e8bcc4", "#f0d1d6", "#dcc0b4", "#e7a9b4"];

const DECOR = Array.from({ length: 16 }, (_, i) => ({
  left: r1((i * 43.7) % 100),
  top: r1((i * 61.3 + (i % 5) * 9) % 100),
  size: 12 + ((i * 5) % 22),
  delay: r1((i % 7) * 1.1),
  tone: TONES[i % TONES.length],
  kind: i % 4 === 0 ? "heart" : "petal",
}));

const HEART = "M12 20.6S4.4 15.7 2.6 11.5A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.4 5.5C19.6 15.7 12 20.6 12 20.6Z";
const PETAL = "M12 1.8c3.9 4.2 5.9 7.6 5.9 11.1a5.9 5.9 0 1 1-11.8 0C6.1 9.4 8.1 6 12 1.8Z";

export default function Backdrop() {
  return (
    <div className="soft-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="lace absolute inset-0 opacity-60" />
      {DECOR.map((d, i) => (
        <span
          key={i}
          className="sway absolute block"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, "--delay": `${d.delay}s` }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full">
            <path d={d.kind === "heart" ? HEART : PETAL} fill={d.tone} opacity="0.5" />
          </svg>
        </span>
      ))}
      <div className="float absolute -left-28 top-10 h-72 w-72 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="float absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-100/45 blur-3xl" style={{ animationDelay: "2s" }} />
    </div>
  );
}