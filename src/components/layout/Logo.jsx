import Mascot from "@/components/layout/Mascot";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <Mascot className="h-10 w-10" />
      <span className="font-heading text-2xl font-semibold tracking-tight text-shimmer">timewise</span>
    </div>
  );
}