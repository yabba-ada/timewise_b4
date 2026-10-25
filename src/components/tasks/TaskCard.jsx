import { motion } from "framer-motion";
import { Check, Clock, Heart, Pencil, Play, Trash2, Wand2 } from "lucide-react";
import { dueLabel } from "@/lib/recommend";

const PRIORITY_STYLE = {
  high: "bg-rose-200/80 text-rose-700",
  medium: "bg-rose-100 text-primary",
  low: "bg-amber-100/80 text-amber-700",
};

export default function TaskCard({ task, estimate, goalTitle, onStart, onComplete, onEdit, onDelete }) {
  const done = task.status === "done";
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 40 }} whileHover={{ y: -3 }} className="glass rounded-3xl p-4">
      <div className="flex items-start gap-3">
        <button onClick={() => !done && onComplete(task)} aria-label="Complete" className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${done ? "border-pink-400 bg-pink-400 text-white" : "border-pink-300 hover:bg-pink-100"}`}>
          {done && <Check className="h-4 w-4" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className={`font-semibold ${done ? "text-pink-900/40 line-through" : ""}`}>{task.title}</p>
          {task.description && <p className="mt-0.5 text-sm text-pink-900/60">{task.description}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="rounded-full bg-rose-100 px-2.5 py-1 font-semibold text-primary">{task.subject}</span>
            <span className={`rounded-full px-2.5 py-1 font-semibold ${PRIORITY_STYLE[task.priority] || PRIORITY_STYLE.medium}`}>{task.priority}</span>
            <span className="flex items-center gap-1 rounded-full bg-pink-100 px-2.5 py-1 font-semibold text-pink-700">
              <Clock className="h-3 w-3" />
              {done ? `${task.actual_minutes ?? "?"} min` : `~${estimate.minutes} min`}
              {!done && estimate.adjusted && <Wand2 className="h-3 w-3" title="Auto-adjusted from your history" />}
            </span>
            {!done && <span className="text-pink-900/50">{dueLabel(task.due_date)}</span>}
            {goalTitle && (
              <span className="flex items-center gap-1 text-rose-950/50">
                <Heart className="h-3 w-3 text-rose-300" fill="currentColor" strokeWidth={1.25} />
                {goalTitle}
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          {!done && <button onClick={() => onStart(task)} aria-label="Start timer" className="rounded-full p-2 text-pink-500 hover:bg-pink-100"><Play className="h-4 w-4" /></button>}
          <button onClick={() => onEdit(task)} aria-label="Edit" className="rounded-full p-2 text-pink-900/50 hover:bg-pink-100"><Pencil className="h-4 w-4" /></button>
          <button onClick={() => onDelete(task)} aria-label="Delete" className="rounded-full p-2 text-pink-900/50 hover:bg-rose-100 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>
    </motion.div>
  );
}