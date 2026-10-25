import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

// Speech-to-text with a preview the student confirms before it's used.
export default function VoiceInput({ onConfirm }) {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const rec = useRef(null);

  function start() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError("Voice input isn't supported in this browser — try Chrome or Safari.");
      return;
    }
    setError("");
    const r = new SR();
    r.lang = "en-US";
    r.onresult = (e) => setText(Array.from(e.results).map((x) => x[0].transcript).join(" "));
    r.onend = () => setListening(false);
    r.onerror = () => {
      setListening(false);
      setError("Couldn't hear you — check your microphone permission.");
    };
    rec.current = r;
    r.start();
    setListening(true);
  }

  return (
    <div className="rounded-2xl bg-pink-50 p-3">
      <div className="flex items-center gap-3">
        <Button type="button" onClick={listening ? () => rec.current?.stop() : start} className={`h-10 w-10 rounded-full p-0 text-white ${listening ? "animate-pulse bg-rose-500" : "btn-glow"}`}>
          {listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <p className="text-sm text-pink-900/70">{listening ? "Listening..." : "Tap the mic and say your task"}</p>
      </div>
      {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
      {text && !listening && (
        <div className="mt-3 rounded-xl bg-white p-3 text-sm">
          <p className="italic">"{text}"</p>
          <div className="mt-2 flex gap-2">
            <Button type="button" size="sm" className="btn-glow rounded-xl text-white" onClick={() => { onConfirm(text); setText(""); }}>Use this</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setText("")}>Discard</Button>
          </div>
        </div>
      )}
    </div>
  );
}