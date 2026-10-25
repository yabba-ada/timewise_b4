import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import useEntityList from "@/hooks/useEntityList";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import GoalCard from "@/components/goals/GoalCard";
import GoalForm from "@/components/goals/GoalForm";

export const Route = createFileRoute("/_authed/goals")({
  ssr: false,
  head: () => ({ meta: [{ title: "Goals — Moment" }] }),
  component: GoalsPage,
});

function GoalsPage() {
  const { items: goals, loading, reload } = useEntityList("Goal");
  const { items: tasks } = useEntityList("Task");
  const [open, setOpen] = useState(false);

  async function add(data) {
    await base44.entities.Goal.create(data);
    toast.success("Goal added ★");
    setOpen(false);
    reload();
  }

  async function remove(goal) {
    await base44.entities.Goal.delete(goal.id);
    reload();
  }

  return (
    <div>
      <PageHeader title="Goals" subtitle="Every task is a step toward a star.">
        <Button onClick={() => setOpen(true)} className="btn-glow rounded-2xl text-white"><Plus className="mr-1 h-4 w-4" /> New</Button>
      </PageHeader>
      {loading ? (
        <div className="glass h-32 animate-pulse rounded-3xl" />
      ) : goals.length === 0 ? (
        <EmptyState title="Pick your first star" text="Add a short- or long-term goal, then link tasks to watch your progress glow." />
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {goals.map((g) => <GoalCard key={g.id} goal={g} tasks={tasks} onDelete={remove} />)}
          </AnimatePresence>
        </div>
      )}
      <GoalForm open={open} onOpenChange={setOpen} onSubmit={add} />
    </div>
  );
}