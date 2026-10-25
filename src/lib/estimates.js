// Smart estimation: once 2+ tasks in a subject are logged, use the historical average.
export function adjustedEstimate(task, completed) {
  const base = Number(task.estimated_minutes) || 25;
  const same = completed.filter(
    (t) => t.id !== task.id && t.subject === task.subject && Number(t.actual_minutes) > 0
  );
  if (same.length < 2) return { minutes: base, adjusted: false };
  const avg = same.reduce((s, t) => s + Number(t.actual_minutes), 0) / same.length;
  const minutes = Math.max(5, Math.round(avg / 5) * 5);
  return { minutes, adjusted: minutes !== base };
}