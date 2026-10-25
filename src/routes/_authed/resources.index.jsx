import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SUBJECTS } from "@/lib/resources";
import PageHeader from "@/components/common/PageHeader";
import SubjectIcon from "@/components/resources/SubjectIcon";

export const Route = createFileRoute("/_authed/resources/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Subject Resources — timewise" }] }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div>
      <PageHeader title="Subject Resources" subtitle="Tips, music and videos for every subject." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SUBJECTS.map((s, i) => (
          <motion.div key={s.key} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -6, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/resources/$subject" params={{ subject: s.key }} className="glass flex aspect-square flex-col items-center justify-center rounded-[30px] text-center">
              <span className="sway">
                <SubjectIcon subject={s.key} className="h-10 w-10" />
              </span>
              <span className="mt-3 font-heading text-lg font-semibold text-primary">{s.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}