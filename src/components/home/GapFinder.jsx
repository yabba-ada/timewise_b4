import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { explainPick } from "@/lib/server-fns";
import { dueLabel, rankTasks } from "@/lib/recommend";
import TimePicker from "@/components/home/TimePicker";
import RecommendationCard from "@/components/home/RecommendationCard";
import QuickActivityCard from "@/components/home/QuickActivityCard";

export default function GapFinder({ tasks, onStart }) {
  const [available, setAvailable] = useState(30);
  const [searched, setSearched] = useState(false);
  const [index, setIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [loadingExplain, setLoadingExplain] = useState(false);

  const ranked = useMemo(() => rankTasks(tasks, available), [tasks, available]);
  const fitting = ranked.filter((r) => r.fits);
  const pick = fitting[index % Math.max(1, fitting.length)];

  useEffect(() => {
    setSearched(false);
    setIndex(0);
  }, [available]);

  useEffect(() => {
    if (!searched || !pick) return;
    let live = true;
    setLoadingExplain(true);
    const fallback = `It fits your ${available} minutes and is ${dueLabel(pick.task.due_date)} with ${pick.task.priority} priority.`;
    explainPick({
      data: { title: pick.task.title, subject: pick.task.subject || "Other", priority: pick.task.priority || "medium", dueText: dueLabel(pick.task.due_date), estimate: pick.minutes, available },
    })
      .then((r) => live && setExplanation(r.text))
      .catch(() => live && setExplanation(fallback))
      .finally(() => live && setLoadingExplain(false));
    return () => { live = false; };
  }, [searched, pick?.task.id, available]);

  return (
    <div className="space-y-5">
      <div className="glass rounded-3xl p-5">
        <h2 className="mb-3 text-lg font-semibold">How much time do you have right now?</h2>
        <TimePicker value={available} onChange={setAvailable} />
        <Button onClick={() => setSearched(true)} className="btn-glow mt-4 h-12 w-full rounded-2xl text-base text-white">
          <Wand2 className="mr-2 h-4 w-4" /> Find my next step
        </Button>
      </div>
      {searched && pick && (
        <RecommendationCard pick={pick} explanation={explanation} loadingExplain={loadingExplain} available={available} onStart={onStart} canSkip={fitting.length > 1} onSkip={() => setIndex((i) => i + 1)} />
      )}
      {searched && !pick && <QuickActivityCard available={available} hasTasks={ranked.length > 0} />}
      {searched && ranked.length === 0 && (
        <p className="text-center text-sm"><Link to="/tasks" className="font-semibold text-pink-600 underline">Add a task</Link> to get personal picks.</p>
      )}
    </div>
  );
}