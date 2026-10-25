import { Heart } from "lucide-react";

export default function MessageBubble({ role, children }) {
  const me = role === "user";
  return (
    <div className={`flex items-end gap-2 ${me ? "justify-end" : "justify-start"}`}>
      {!me && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-400">
          <Heart className="h-4 w-4" fill="currentColor" strokeWidth={1.25} />
        </span>
      )}
      <div className={`max-w-[78%] whitespace-pre-line rounded-[22px] px-4 py-3 text-sm leading-relaxed shadow-sm ${me ? "rounded-br-lg bg-rose-100/85 text-rose-950" : "rounded-bl-lg border border-rose-100 bg-card text-rose-950/85"}`}>
        {children}
      </div>
    </div>
  );
}