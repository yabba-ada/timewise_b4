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
      <PageHeader title="Time Buddy" subtitle="A soft place to think out loud about your schedule." />
      <BuddyChat />
    </div>
  );
}