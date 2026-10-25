import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LogTimeDialog({ log, onSave, onClose }) {
  const [minutes, setMinutes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (log) setMinutes(String(log.minutes));
  }, [log]);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    await onSave(Math.max(1, Number(minutes) || 1));
    setSaving(false);
  }

  return (
    <Dialog open={!!log} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>How long did it really take? ✦</DialogTitle>
          <DialogDescription>
            "{log?.task.title}" — your answer helps Moment give smarter time estimates next time.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <Input type="number" min="1" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="h-12 rounded-2xl text-center text-xl" autoFocus />
          <Button type="submit" disabled={saving} className="btn-glow h-11 w-full rounded-2xl text-white">
            {saving ? "Saving..." : "Mark complete ★"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}