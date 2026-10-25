import { useState } from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import FocusTimer from "@/components/tasks/FocusTimer";
import LogTimeDialog from "@/components/tasks/LogTimeDialog";

// Shared timer + "log actual time" flow used on Home and Tasks.
export default function useTaskSession(onChange) {
  const [timerTask, setTimerTask] = useState(null);
  const [log, setLog] = useState(null);

  async function save(minutes) {
    await base44.entities.Task.update(log.task.id, {
      status: "done",
      actual_minutes: minutes,
      completed_at: new Date().toISOString(),
    });
    confetti({ particleCount: 110, spread: 80, origin: { y: 0.7 }, shapes: ["circle"], colors: ["#e8bcc4", "#f0d1d6", "#dcc0b4", "#e7a9b4", "#f7e3e6"] });
    toast.success("Task complete — you're on a roll!");
    setLog(null);
    onChange();
  }

  const sessionUI = (
    <>
      <FocusTimer
        task={timerTask}
        onClose={() => setTimerTask(null)}
        onFinish={(m) => {
          setLog({ task: timerTask, minutes: m });
          setTimerTask(null);
        }}
      />
      <LogTimeDialog log={log} onSave={save} onClose={() => setLog(null)} />
    </>
  );

  return {
    startTimer: setTimerTask,
    completeTask: (task) => setLog({ task, minutes: Number(task.estimated_minutes) || 15 }),
    sessionUI,
  };
}