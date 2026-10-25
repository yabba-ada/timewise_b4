import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Body({ onSubmit }) {
  const [f, setF] = useState({ title: "", description: "", term: "short", target_date: "" });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    await onSubmit({ ...f, title: f.title.trim(), target_date: f.target_date || undefined });
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Goal</Label>
        <Input required value={f.title} onChange={set("title")} placeholder="Ace my chemistry final" className="rounded-xl" />
      </div>
      <div className="space-y-1.5">
        <Label>Why it matters</Label>
        <Textarea value={f.description} onChange={set("description")} rows={2} className="rounded-xl" />
      </div>
      <div className="flex gap-2">
        {[["short", "Short-term"], ["long", "Long-term"]].map(([k, l]) => (
          <button type="button" key={k} onClick={() => setF((p) => ({ ...p, term: k }))} className={`flex-1 rounded-2xl border py-2 text-sm font-semibold transition ${f.term === k ? "btn-glow border-transparent text-white" : "border-pink-200 text-pink-900/60"}`}>{l}</button>
        ))}
      </div>
      <div className="space-y-1.5">
        <Label>Target date</Label>
        <Input type="date" value={f.target_date} onChange={set("target_date")} className="rounded-xl" />
      </div>
      <Button type="submit" disabled={saving || !f.title.trim()} className="btn-glow h-11 w-full rounded-2xl text-white">{saving ? "Saving..." : "Add goal"}</Button>
    </form>
  );
}

export default function GoalForm({ open, onOpenChange, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <DialogHeader><DialogTitle>New goal</DialogTitle></DialogHeader>
        <Body onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}