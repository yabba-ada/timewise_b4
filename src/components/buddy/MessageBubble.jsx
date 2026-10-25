import Mascot from "@/components/layout/Mascot";

export default function MessageBubble({ role, children }) {
  const me = role === "user";
  return (
    <div className={`flex items-end gap-2 ${me ? "justify-end" : "justify-start"}`}>
      {!me && <Mascot className="h-8 w-8" />}
      <div className={`max-w-[78%] whitespace-pre-line rounded-[22px] px-4 py-3 text-sm leading-relaxed shadow-sm ${me ? "rounded-br-lg bg-rose-100/85 text-rose-950" : "rounded-bl-lg border border-rose-100 bg-card text-rose-950/85"}`}>
        {children}
      </div>
    </div>
  );
}