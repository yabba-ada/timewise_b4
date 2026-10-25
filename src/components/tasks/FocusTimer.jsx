import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const C = 2 * Math.PI * 90;

export default function FocusTimer({ task, onClose, onFinish }) {
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setSecs(0);
    setRunning(true);
  }, [task?.id]);

  useEffect(() => {
    if (!task || !running) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [task, running]);

  const est = (Number(task?.estimated_minutes) || 25) * 60;
  const pct = Math.min(1, secs / est);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <Dialog open={!!task} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-3xl text-center">
        <DialogHeader>
          <DialogTitle className="text-center">{task?.title}</DialogTitle>
          <DialogDescription className="text-center">Stay with this one small step ♡</DialogDescription>
        </DialogHeader>
        <div className="relative mx-auto h-56 w-56 float">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <defs>
              <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d9a2ad" />
                <stop offset="100%" stopColor="#b98ba0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="none" stroke="#fce7f3" strokeWidth="12" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#ring)" strokeWidth="12" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-5xl font-semibold text-pink-600">{mm}:{ss}</span>
            <span className="text-xs text-pink-900/50">of ~{task?.estimated_minutes || 25} min</span>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={() => setRunning((r) => !r)} className="h-11 rounded-2xl">
            {running ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {running ? "Pause" : "Resume"}
          </Button>
          <Button onClick={() => onFinish(Math.max(1, Math.round(secs / 60)))} className="btn-glow h-11 rounded-2xl text-white">
            Finish ♡
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}