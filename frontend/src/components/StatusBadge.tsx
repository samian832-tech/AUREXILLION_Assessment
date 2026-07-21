interface Props {
  status: string;
}

const styles: Record<string, string> = {
  Open: "bg-indigo-50 text-indigo-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Resolved: "bg-emerald-50 text-emerald-700",
};

const dots: Record<string, string> = {
  Open: "bg-indigo-600",
  "In Progress": "bg-amber-500",
  Resolved: "bg-emerald-600",
};

export default function StatusBadge({ status }: Props) {
  const style = styles[status] ?? "bg-slate-100 text-slate-600";
  const dot = dots[status] ?? "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}