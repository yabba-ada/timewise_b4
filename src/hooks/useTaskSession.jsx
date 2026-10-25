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
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 }, shapes: ["star"], colors: ["#f472b6", "#fbcfe8", "#e9d5ff", "#fda4af", "#fde68a"] });
    toast.success("Task complete ✦ nice work!");
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