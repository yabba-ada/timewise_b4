const IDEAS = [
  "What should I do with my next free hour?",
  "What's the most important thing right now?",
  "How should I prep for my next test?",
  "Make me a plan for tonight",
];

export default function SuggestionChips({ onPick, disabled }) {
  return (
    <div className="flex flex-wrap gap-2">
      {IDEAS.map((idea) => (
        <button
          key={idea}
          type="button"
          disabled={disabled}
          onClick={() => onPick(idea)}
          className="rounded-full border border-rose-100 bg-rose-50/80 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-rose-100 disabled:opacity-50"
        >
          {idea}
        </button>
      ))}
    </div>
  );
}