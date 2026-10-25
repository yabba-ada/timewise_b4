import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askBuddy } from "@/lib/server-fns";
import MessageBubble from "@/components/buddy/MessageBubble";
import SuggestionChips from "@/components/buddy/SuggestionChips";

const GREETING = {
  role: "assistant",
  content: "Hi! I'm your Time Buddy. Tell me what you're working on and I'll help you plan it out — I can see your tasks and goals, so ask me anything.",
};

export default function BuddyChat() {
  const ask = useServerFn(askBuddy);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function send(text) {
    const message = (text ?? input).trim();
    if (!message || thinking) return;
    const history = messages.slice(-6).map(({ role, content }) => ({ role, content: content.slice(0, 1200) }));
    setMessages((m) => [...m, { role: "user", content: message }]);
    setInput("");
    setThinking(true);
    try {
      const res = await ask({ data: { message, history } });
      setMessages((m) => [...m, { role: "assistant", content: res.text }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't reach my notes just now — try again in a moment." }]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="glass flex h-[calc(100vh-16rem)] min-h-[430px] flex-col overflow-hidden rounded-[30px]">
      <div ref={boxRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role}>{m.content}</MessageBubble>
        ))}
        {thinking && (
          <MessageBubble role="assistant">
            <span className="flex items-center gap-1.5 py-0.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-300" style={{ animationDelay: `${i * 0.18}s` }} />
              ))}
            </span>
          </MessageBubble>
        )}
      </div>
      <div className="border-t border-rose-100 bg-white/60 p-4">
        <SuggestionChips onPick={send} disabled={thinking} />
        <div className="mt-3 flex items-end gap-2">
          <Textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask me anything about your studying..."
            className="min-h-11 resize-none rounded-3xl border-rose-100 bg-card"
          />
          <Button onClick={() => send()} disabled={thinking || !input.trim()} className="btn-glow h-11 w-11 shrink-0 rounded-full p-0 text-white">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">Your Time Buddy runs on the app's built-in AI — no API key is stored here.</p>
      </div>
    </div>
  );
}