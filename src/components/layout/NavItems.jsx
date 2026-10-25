import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, House, ListChecks, MessageCircle, Target } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", Icon: House },
  { to: "/tasks", label: "Tasks", Icon: ListChecks },
  { to: "/goals", label: "Goals", Icon: Target },
  { to: "/buddy", label: "Buddy", Icon: MessageCircle },
  { to: "/resources", label: "Learn", Icon: BookOpen },
];

export default function NavItems({ id, vertical }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className={vertical ? "flex flex-col gap-2" : "flex justify-around"}>
      {ITEMS.map(({ to, label, Icon }) => {
        const active = to === "/" ? path === "/" : path.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`relative flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              vertical ? "" : "flex-col gap-0.5 px-3 py-1.5 text-[11px]"
            } ${active ? "text-white" : "text-rose-950/55 hover:text-primary"}`}
          >
            {active && (
              <motion.span
                layoutId={`pill-${id}`}
                className="absolute inset-0 -z-0 rounded-2xl btn-glow"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="relative z-10 h-5 w-5" strokeWidth={1.75} />
            <span className="relative z-10">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}