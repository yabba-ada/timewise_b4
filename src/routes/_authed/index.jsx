import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/AuthContext";
import useEntityList from "@/hooks/useEntityList";
import useTaskSession from "@/hooks/useTaskSession";
import GapFinder from "@/components/home/GapFinder";

export const Route = createFileRoute("/_authed/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Home — timewise" }] }),
  component: HomePage,
});

function HomePage() {
  const { user } = useAuth();
  const { items: tasks, reload } = useEntityList("Task");
  const { startTimer, sessionUI } = useTaskSession(reload);
  const name = user?.full_name?.split(" ")[0];

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">✦ ready when you are</p>
        <h1 className="text-4xl font-semibold text-shimmer">Hi{name ? `, ${name}` : ""}!</h1>
        <p className="mt-1 text-pink-900/60">Let's turn today's spare minutes into real progress — you've got this.</p>
      </div>
      <GapFinder tasks={tasks} onStart={startTimer} />
      {sessionUI}
    </div>
  );
}