import { motion } from "framer-motion";
import { CONSTELLATIONS, MAX_LINKS, POOL } from "@/components/layout/constellations";

const TRAVEL = { duration: 3.4, ease: "easeInOut" };

// A single morphing star field: eight stars glide into the shape at `index`,
// while `linesShown` fades the connecting lines in and out around the flight.
export default function ConstellationField({ className = "", index = 0, linesShown = true }) {
  const shape = CONSTELLATIONS[index % CONSTELLATIONS.length];

  return (
    <div className={`constellation pointer-events-none absolute ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        {Array.from({ length: MAX_LINKS }, (_, k) => {
          const link = shape.links[k];
          return (
            <motion.line
              key={k}
              x1={link ? shape.stars[link[0]].x : 0}
              y1={link ? shape.stars[link[0]].y : 0}
              x2={link ? shape.stars[link[1]].x : 0}
              y2={link ? shape.stars[link[1]].y : 0}
              className="constellation-line"
              initial={false}
              animate={{ opacity: link && linesShown ? 1 : 0 }}
              transition={{ duration: linesShown ? 1.2 : 0.5 }}
            />
          );
        })}
        {POOL.map((star, i) => (
          <motion.g
            key={i}
            initial={false}
            animate={{ x: shape.stars[i].x, y: shape.stars[i].y, opacity: shape.visible.includes(i) ? 1 : 0 }}
            transition={TRAVEL}
          >
            <circle r={star.r * 2.6} fill="rgba(184,122,124,0.10)" />
            <circle r={star.r} className="star-shine" style={{ "--d": `${star.d}s`, "--delay": `${star.delay}s` }} />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}