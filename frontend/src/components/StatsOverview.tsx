import type { Ticket } from "../types/ticket";

interface Props {
  tickets: Ticket[];
}

export default function StatsOverview({ tickets }: Props) {
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const highPriority = tickets.filter((t) => t.priority === "High").length;

  const stats = [
    { label: "Open", value: open, sub: "awaiting action", valueClass: "text-indigo-600" },
    { label: "In progress", value: inProgress, sub: "being worked on", valueClass: "text-amber-600" },
    { label: "Resolved", value: resolved, sub: "closed out", valueClass: "text-emerald-600" },
    { label: "High priority", value: highPriority, sub: "need attention", valueClass: "text-slate-900" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-slate-200 rounded-xl px-4 py-3.5"
        >
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide mb-1.5">
            {s.label}
          </div>
          <div className={`text-2xl font-semibold ${s.valueClass}`}>{s.value}</div>
          <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}