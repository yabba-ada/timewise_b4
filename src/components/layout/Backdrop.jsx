import { useEffect, useRef, useState } from "react";
import ConstellationField from "@/components/layout/ConstellationField";

const HOLD_MS = 9500;
const MORPH_AT = 600;
const LINES_BACK_AT = 4000;

const r1 = (n) => Math.round(n * 10) / 10;
const DUST = Array.from({ length: 26 }, (_, i) => ({
  left: r1((i * 37.9) % 100),
  top: r1((i * 53.7 + (i % 6) * 8) % 100),
  size: 2 + (i % 3),
  d: 6 + (i % 5),
  delay: r1((i % 8) * 0.8),
}));

// One shared choreography: every field morphs on the same beat, and the
// rotation hands each field the next one's shape, so the five fields on screen
// never show the same constellation at the same time.
export default function Backdrop() {
  const [assign, setAssign] = useState([0, 1, 2, 3, 4]);
  const [linesShown, setLinesShown] = useState(true);
  const timers = useRef([]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLinesShown(false);
      timers.current.push(window.setTimeout(() => setAssign((a) => [...a.slice(1), a[0]]), MORPH_AT));
      timers.current.push(window.setTimeout(() => setLinesShown(true), LINES_BACK_AT));
    }, HOLD_MS);
    return () => {
      window.clearInterval(id);
      timers.current.forEach(window.clearTimeout);
    };
  }, []);

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

      <ConstellationField
        index={assign[0]}
        linesShown={linesShown}
        className="right-[-2%] top-[2%] aspect-square w-[80vw] max-w-[960px] opacity-80 sm:w-[88vh] sm:opacity-100"
      />
      <ConstellationField
        index={assign[1]}
        linesShown={linesShown}
        className="left-[2%] top-[8%] hidden aspect-square w-[24vh] max-w-[240px] opacity-65 lg:block"
      />
      <ConstellationField
        index={assign[2]}
        linesShown={linesShown}
        className="left-[1%] top-[40%] hidden aspect-square w-[26vh] max-w-[270px] opacity-65 lg:block"
      />
      <ConstellationField
        index={assign[3]}
        linesShown={linesShown}
        className="bottom-[4%] right-[6%] hidden aspect-square w-[26vh] max-w-[260px] opacity-70 lg:block"
      />
      <ConstellationField
        index={assign[4]}
        linesShown={linesShown}
        className="bottom-[-6%] left-[-4%] hidden aspect-square w-[38vh] max-w-[400px] opacity-85 md:block"
      />
    </div>
  );
}