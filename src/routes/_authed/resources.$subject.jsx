import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { RESOURCES, SUBJECTS } from "@/lib/resources";
import ResourceCard from "@/components/resources/ResourceCard";

export const Route = createFileRoute("/_authed/resources/$subject")({
  ssr: false,
  loader: ({ params }) => {
    if (!RESOURCES[params.subject]) throw notFound();
    return null;
  },
  head: () => ({ meta: [{ title: "Subject — Moment" }] }),
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useParams();
  const info = SUBJECTS.find((s) => s.key === subject);
  const r = RESOURCES[subject];

  return (
    <div>
      <Link to="/resources" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-pink-600"><ArrowLeft className="h-4 w-4" /> All subjects</Link>
      <h1 className="mb-6 text-3xl font-semibold text-shimmer">{info.emoji} {info.name}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResourceCard title="Study Tips" icon="📝" items={r.tips} />
        <ResourceCard title="Test & Exam Prep" icon="🎯" items={r.testing} delay={0.08} />
        <ResourceCard title="Focus Music" icon="🎧" items={r.music} delay={0.16} />
        <ResourceCard title="YouTube Picks" icon="▶️" items={r.videos} delay={0.24} />
      </div>
    </div>
  );
}