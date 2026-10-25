import { Sparkles } from "lucide-react";

export default function EmptyState({ title, text, children }) {
  return (
    <div className="glass rounded-[28px] p-10 text-center">
      <div className="float mx-auto w-fit text-rose-300">
        <Sparkles className="h-10 w-10" strokeWidth={1.5} />
      </div>
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-xs text-sm text-rose-950/55">{text}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}