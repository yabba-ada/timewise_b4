import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const PRESETS = [15, 30, 45];

export default function TimePicker({ value, onChange }) {
  const [custom, setCustom] = useState(false);
  const pick = (m) => { setCustom(false); onChange(m); };

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {PRESETS.map((m) => {
          const active = !custom && value === m;
          return (
            <motion.button key={m} whileTap={{ scale: 0.92 }} whileHover={{ y: -2 }} onClick={() => pick(m)} className={`rounded-2xl py-3 font-heading text-lg font-semibold transition ${active ? "btn-glow text-white" : "bg-white/70 text-pink-600 hover:bg-white"}`}>
              {m}<span className="text-xs font-normal"> min</span>
            </motion.button>
          );
        })}
        <motion.button whileTap={{ scale: 0.92 }} whileHover={{ y: -2 }} onClick={() => setCustom(true)} className={`rounded-2xl py-3 font-heading text-lg font-semibold transition ${custom ? "btn-glow text-white" : "bg-white/70 text-pink-600 hover:bg-white"}`}>
          Custom
        </motion.button>
      </div>
      {custom && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 flex items-center gap-2">
          <Input type="number" min="1" max="600" autoFocus placeholder="e.g. 20" onChange={(e) => onChange(Math.max(1, Number(e.target.value) || 0))} className="h-11 rounded-2xl bg-white/80" />
          <span className="text-sm text-pink-900/60">minutes</span>
        </motion.div>
      )}
    </div>
  );
}