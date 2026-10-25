import { Atom, BookOpen, Calculator, Code2, FlaskConical, Landmark, Languages, Leaf, Shapes } from "lucide-react";
import { cn } from "@/lib/utils";

// Every subject mark is a thin-stroke lucide icon in a shade of rose.
const MAP = {
  math: { Icon: Calculator, tone: "text-rose-400" },
  chemistry: { Icon: FlaskConical, tone: "text-pink-400" },
  physics: { Icon: Atom, tone: "text-fuchsia-400" },
  biology: { Icon: Leaf, tone: "text-pink-300" },
  english: { Icon: BookOpen, tone: "text-rose-500" },
  history: { Icon: Landmark, tone: "text-pink-500" },
  language: { Icon: Languages, tone: "text-fuchsia-300" },
  cs: { Icon: Code2, tone: "text-rose-300" },
};

export default function SubjectIcon({ subject, className }) {
  const { Icon, tone } = MAP[subject] || { Icon: Shapes, tone: "text-rose-400" };
  return <Icon className={cn("h-8 w-8", tone, className)} strokeWidth={1.5} />;
}