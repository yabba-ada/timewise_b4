import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";

export default function GoalCard({ goal, tasks, onDelete }) {
  const linked = tasks.filter((t) => t.goal_id === goal.id);
  const done = linked.filter((t) => t.status === "done").length;
  const pct = linked.length ? Math.round((done / linked.length) * 100) : 0;

  return (
    <motion.div layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} whileHover={{ y: -3 }} className="glass rounded-3xl p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-primary">{goal.term === "long" ? "Long-term" : "Short-term"}</span>
          <h3 className="mt-2 flex items-center gap-2 text-lg font-semibold">
            <Heart className="h-4 w-4 shrink-0 text-rose-300" fill="currentColor" strokeWidth={1.25} />
            {goal.title}
          </h3>
          {goal.description && <p className="text-sm text-pink-900/60">{goal.description}</p>}
          {goal.target_date && <p className="mt-1 text-xs text-pink-900/50">Target: {goal.target_date}</p>}
        </div>
        <button onClick={() => onDelete(goal)} aria-label="Delete goal" className="rounded-full p-2 text-pink-900/50 hover:bg-rose-100 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-pink-100">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, ease: "easeOut" }} className="btn-glow h-full rounded-full" />
      </div>
      <p className="mt-1.5 text-xs text-pink-900/60">
        {linked.length ? `${done} of ${linked.length} linked tasks done · ${pct}%` : "Link tasks to this goal to track progress"}
      </p>
    </motion.div>
  );
}