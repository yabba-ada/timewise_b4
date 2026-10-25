import { motion } from "framer-motion";
import { Play, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dueLabel } from "@/lib/recommend";

export default function RecommendationCard({ pick, explanation, loadingExplain, available, onStart, onSkip, canSkip }) {
  const { task, minutes, adjusted } = pick;
  return (
    <motion.div key={task.id} initial={{ opacity: 0, scale: 0.9, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="glass relative overflow-hidden rounded-3xl p-6">
      <span className="star-twinkle absolute right-5 top-4 text-2xl text-pink-300">★</span>
      <p className="text-xs font-semibold uppercase tracking-widest text-pink-500">Your next step</p>
      <h2 className="mt-1 text-2xl font-semibold">{task.title}</h2>
      <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">
        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-purple-700">{task.subject}</span>
        <span className="flex items-center gap-1 rounded-full bg-pink-100 px-2.5 py-1 text-pink-700">~{minutes} of {available} min {adjusted && <Wand2 className="h-3 w-3" />}</span>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">{dueLabel(task.due_date)}</span>
      </div>
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-4 text-sm">
        <p className="mb-1 flex items-center gap-1 font-semibold text-pink-600"><Sparkles className="h-4 w-4" /> Why this one?</p>
        {loadingExplain ? (
          <div className="space-y-2"><div className="h-3 w-full animate-pulse rounded bg-pink-200/70" /><div className="h-3 w-2/3 animate-pulse rounded bg-pink-200/70" /></div>
        ) : (
          <p className="text-pink-900/80">{explanation}</p>
        )}
      </div>
      <div className="mt-5 flex gap-3">
        <Button onClick={() => onStart(task)} className="btn-glow h-12 flex-1 rounded-2xl text-base text-white"><Play className="mr-2 h-4 w-4" /> Start now</Button>
        {canSkip && <Button variant="outline" onClick={onSkip} className="h-12 rounded-2xl"><RefreshCw className="mr-2 h-4 w-4" /> Another</Button>}
      </div>
    </motion.div>
  );
}