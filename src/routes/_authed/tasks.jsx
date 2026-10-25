import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import useEntityList from "@/hooks/useEntityList";
import useTaskSession from "@/hooks/useTaskSession";
import { adjustedEstimate } from "@/lib/estimates";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";

export const Route = createFileRoute("/_authed/tasks")({
  ssr: false,
  head: () => ({ meta: [{ title: "Tasks & Planner — timewise" }] }),
  component: TasksPage,
});

function TasksPage() {
  const { items: tasks, loading, reload } = useEntityList("Task");
  const { items: goals } = useEntityList("Goal");
  const [tab, setTab] = useState("todo");
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const { startTimer, completeTask, sessionUI } = useTaskSession(reload);

  const completed = tasks.filter((t) => t.status === "done");
  const shown = tasks.filter((t) => (tab === "done" ? t.status === "done" : t.status !== "done"));

  async function save(data) {
    if (editing) await base44.entities.Task.update(editing.id, data);
    else await base44.entities.Task.create({ ...data, status: "todo" });
    toast.success(editing ? "Task updated" : "Task added!");
    setFormOpen(false);
    reload();
  }

  async function remove(task) {
    await base44.entities.Task.delete(task.id);
    toast("Task deleted");
    reload();
  }

  return (
    <div>
      <PageHeader title="Tasks & Planner" subtitle="Knock them out, one at a time.">
        <Button onClick={() => { setEditing(null); setFormOpen(true); }} className="btn-glow rounded-2xl text-white">
          <Plus className="mr-1 h-4 w-4" /> New
        </Button>
      </PageHeader>
      <div className="glass mb-4 inline-flex rounded-2xl p-1">
        {[["todo", "Open"], ["done", "Done"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-xl px-5 py-1.5 text-sm font-semibold transition ${tab === k ? "btn-glow text-white" : "text-pink-900/60"}`}>{l}</button>
        ))}
      </div>
      {loading ? (
        <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="glass h-20 animate-pulse rounded-3xl" />)}</div>
      ) : shown.length === 0 ? (
        <EmptyState title={tab === "done" ? "No wins logged yet" : "Your list is clear!"} text={tab === "done" ? "Finish a task and it'll show up here." : "Add your first task and start checking things off today."} />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {shown.map((t) => (
              <TaskCard key={t.id} task={t} estimate={adjustedEstimate(t, completed)} goalTitle={goals.find((g) => g.id === t.goal_id)?.title} onStart={startTimer} onComplete={completeTask} onEdit={(x) => { setEditing(x); setFormOpen(true); }} onDelete={remove} />
            ))}
          </AnimatePresence>
        </div>
      )}
      <TaskForm open={formOpen} onOpenChange={setFormOpen} task={editing} goals={goals} onSubmit={save} />
      {sessionUI}
    </div>
  );
}