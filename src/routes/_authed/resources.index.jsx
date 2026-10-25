import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SUBJECTS } from "@/lib/resources";
import PageHeader from "@/components/common/PageHeader";

export const Route = createFileRoute("/_authed/resources/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Subject Resources — Moment" }] }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div>
      <PageHeader title="Subject Resources" subtitle="Tips, music and videos for every subject." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SUBJECTS.map((s, i) => (
          <motion.div key={s.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -6, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/resources/$subject" params={{ subject: s.key }} className="glass wobble-hover flex aspect-square flex-col items-center justify-center rounded-3xl text-center">
              <span className="wobble-target text-4xl">{s.emoji}</span>
              <span className="mt-2 font-heading text-lg font-semibold text-pink-700">{s.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}