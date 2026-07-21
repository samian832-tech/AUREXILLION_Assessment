interface Props {
  priority: string;
}

const config: Record<string, string> = {
  High: "text-rose-600",
  Medium: "text-amber-600",
  Low: "text-slate-500",
};

export default function PriorityTag({ priority }: Props) {
  const color = config[priority] ?? "text-slate-500";

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}