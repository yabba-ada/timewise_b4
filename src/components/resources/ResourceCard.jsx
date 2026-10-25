import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ResourceCard({ title, icon, items, delay = 0 }) {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="glass rounded-3xl p-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-pink-700"><span>{icon}</span>{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it, i) =>
          typeof it === "string" ? (
            <li key={i} className="flex gap-2"><span className="text-pink-400">✦</span>{it}</li>
          ) : (
            <li key={i}>
              <a href={it.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-pink-50 px-3 py-2 font-semibold text-pink-700 transition hover:bg-pink-100">
                {it.name}<ExternalLink className="h-4 w-4" />
              </a>
            </li>
          )
        )}
      </ul>
    </motion.section>
  );
}