import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Headphones, NotebookPen, Target, Youtube } from "lucide-react";
import { RESOURCES, SUBJECTS } from "@/lib/resources";
import ResourceCard from "@/components/resources/ResourceCard";
import SubjectIcon from "@/components/resources/SubjectIcon";

export const Route = createFileRoute("/_authed/resources/$subject")({
  ssr: false,
  loader: ({ params }) => {
    if (!RESOURCES[params.subject]) throw notFound();
    return null;
  },
  head: () => ({ meta: [{ title: "Subject — timewise" }] }),
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useParams();
  const info = SUBJECTS.find((s) => s.key === subject);
  const r = RESOURCES[subject];

  return (
    <div>
      <Link to="/resources" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" /> All subjects</Link>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-semibold text-shimmer">
        <SubjectIcon subject={subject} className="h-8 w-8" />
        {info.name}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResourceCard title="Study Tips" Icon={NotebookPen} items={r.tips} />
        <ResourceCard title="Test & Exam Prep" Icon={Target} items={r.testing} delay={0.08} />
        <ResourceCard title="Focus Music" Icon={Headphones} items={r.music} delay={0.16} />
        <ResourceCard title="YouTube Picks" Icon={Youtube} items={r.videos} delay={0.24} />
      </div>
    </div>
  );
}