import { adjustedEstimate } from "@/lib/estimates";

const PRIORITY = { high: 30, medium: 20, low: 10 };

export function daysUntil(due) {
  if (!due) return null;
  return Math.ceil((new Date(`${due}T23:59:59`) - new Date()) / 864e5);
}

export function dueLabel(due) {
  const d = daysUntil(due);
  if (d === null) return "no due date";
  if (d < 0) return "overdue";
  if (d === 0) return "due today";
  if (d === 1) return "due tomorrow";
  return `due in ${d} days`;
}

function dueScore(due) {
  const d = daysUntil(due);
  if (d === null) return 3;
  if (d < 0) return 40;
  if (d <= 1) return 35;
  if (d <= 3) return 25;
  if (d <= 7) return 15;
  return 5;
}

// Score open tasks by priority + urgency + how well they fill the available time.
export function rankTasks(tasks, available) {
  const completed = tasks.filter((t) => t.status === "done");
  return tasks
    .filter((t) => t.status !== "done")
    .map((task) => {
      const { minutes, adjusted } = adjustedEstimate(task, completed);
      const fits = minutes <= available;
      const fit = fits ? 30 * (minutes / available) : -40;
      const score = PRIORITY[task.priority || "medium"] + dueScore(task.due_date) + fit;
      return { task, minutes, adjusted, fits, score };
    })
    .sort((a, b) => b.score - a.score);
}

export const QUICK_ACTIVITIES = [
  "Flip through flashcards for your toughest subject",
  "Write a 3-line summary of what you learned today",
  "Skim your notes and circle 3 key ideas",
  "Plan tomorrow's first study step",
];