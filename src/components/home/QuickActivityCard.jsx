import { motion } from "framer-motion";
import { QUICK_ACTIVITIES } from "@/lib/recommend";

export default function QuickActivityCard({ available, hasTasks }) {
  const idea = QUICK_ACTIVITIES[available % QUICK_ACTIVITIES.length];
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 text-center">
      <div className="float text-4xl text-rose-300">✦</div>
      <h2 className="mt-2 text-xl font-semibold">Quick win time!</h2>
      <p className="mt-1 text-sm text-pink-900/60">
        {hasTasks ? `Nothing fits ${available} minutes right now —` : "You're all caught up!"} try this instead:
      </p>
      <p className="mt-3 rounded-2xl bg-rose-50 p-3 font-semibold text-primary">✦ {idea}</p>
    </motion.div>
  );
}