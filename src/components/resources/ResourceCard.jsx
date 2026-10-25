import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ResourceCard({ title, Icon, items, delay = 0 }) {
  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="glass rounded-[28px] p-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
        {Icon && <Icon className="h-5 w-5 text-rose-300" strokeWidth={1.5} />}
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it, i) =>
          typeof it === "string" ? (
            <li key={i} className="flex gap-2 text-rose-950/75"><span className="text-rose-300">✦</span>{it}</li>
          ) : (
            <li key={i}>
              <a href={it.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-rose-50/80 px-3 py-2 font-semibold text-primary transition hover:bg-rose-100">
                {it.name}<ExternalLink className="h-4 w-4" />
              </a>
            </li>
          )
        )}
      </ul>
    </motion.section>
  );
}