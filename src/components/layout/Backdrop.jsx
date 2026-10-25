import ConstellationField from "@/components/layout/ConstellationField";

const r1 = (n) => Math.round(n * 10) / 10;
const DUST = Array.from({ length: 26 }, (_, i) => ({
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

      <ConstellationField className="right-[2%] top-[6%] aspect-square w-[62vw] max-w-[720px] opacity-80 sm:w-[68vh] sm:opacity-100" />
      <ConstellationField start={2} className="bottom-[5%] left-[1%] hidden aspect-square w-[34vh] max-w-[360px] opacity-50 lg:block" />
    </div>
  );
}