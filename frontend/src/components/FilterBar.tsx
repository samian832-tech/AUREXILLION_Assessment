interface Props {
  status: string;
  priority: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

const statuses = ["", "Open", "In Progress", "Resolved"];
const priorities = ["", "Low", "Medium", "High"];

function ChipGroup({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt || "all"}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            value === opt
              ? "bg-indigo-50 border-indigo-200 text-indigo-700"
              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          {opt || "All"}
        </button>
      ))}
    </div>
  );
}

export default function FilterBar({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
          Status
        </span>
        <ChipGroup value={status} options={statuses} onChange={onStatusChange} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
          Priority
        </span>
        <ChipGroup value={priority} options={priorities} onChange={onPriorityChange} />
      </div>
    </div>
  );
}