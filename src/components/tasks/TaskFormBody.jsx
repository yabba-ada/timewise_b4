import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VoiceInput from "@/components/tasks/VoiceInput";

const SUBJECT_LIST = ["Math", "Chemistry", "Physics", "Biology", "English", "History", "Language", "CS", "Other"];

function Pick({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function TaskFormBody({ task, goals, onSubmit }) {
  const [f, setF] = useState({
    title: task?.title || "",
    description: task?.description || "",
    subject: task?.subject || "Other",
    priority: task?.priority || "medium",
    due_date: task?.due_date || "",
    estimated_minutes: String(task?.estimated_minutes ?? 25),
    goal_id: task?.goal_id || "none",
  });
  const [saving, setSaving] = useState(false);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: typeof v === "string" ? v : v.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    await onSubmit({
      title: f.title.trim(),
      description: f.description,
      subject: f.subject,
      priority: f.priority,
      due_date: f.due_date || undefined,
      estimated_minutes: Math.max(1, Number(f.estimated_minutes) || 25),
      goal_id: f.goal_id === "none" ? "" : f.goal_id,
    });
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="max-h-[70vh] space-y-4 overflow-y-auto px-1">
      {!task && <VoiceInput onConfirm={(t) => setF((p) => ({ ...p, title: t }))} />}
      <div className="space-y-1.5">
        <Label>Title</Label>
        <Input required value={f.title} onChange={set("title")} placeholder="Read chapter 4" className="rounded-xl" />
      </div>
      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea value={f.description} onChange={set("description")} className="rounded-xl" rows={2} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Pick label="Subject" value={f.subject} onChange={set("subject")} options={SUBJECT_LIST.map((s) => [s, s])} />
        <Pick label="Priority" value={f.priority} onChange={set("priority")} options={[["high", "High"], ["medium", "Medium"], ["low", "Low"]]} />
        <div className="space-y-1.5">
          <Label>Due date</Label>
          <Input type="date" value={f.due_date} onChange={set("due_date")} className="rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>Estimate (min)</Label>
          <Input type="number" min="1" value={f.estimated_minutes} onChange={set("estimated_minutes")} className="rounded-xl" />
        </div>
      </div>
      <Pick label="Linked goal" value={f.goal_id} onChange={set("goal_id")} options={[["none", "No goal"], ...goals.map((g) => [g.id, g.title])]} />
      <Button type="submit" disabled={saving || !f.title.trim()} className="btn-glow h-11 w-full rounded-2xl text-white">
        {saving ? "Saving..." : task ? "Save changes" : "Add task ♡"}
      </Button>
    </form>
  );
}