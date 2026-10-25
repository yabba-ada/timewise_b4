import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "@/components/common/PageHeader";
import BuddyChat from "@/components/buddy/BuddyChat";

export const Route = createFileRoute("/_authed/buddy")({
  ssr: false,
  head: () => ({ meta: [{ title: "Time Buddy — timewise" }] }),
  component: BuddyPage,
});

function BuddyPage() {
  return (
    <div>
      <PageHeader title="Time Buddy" subtitle="Your study coach — ask me anything about your plan." />
      <BuddyChat />
    </div>
  );
}