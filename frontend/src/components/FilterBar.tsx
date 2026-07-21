interface Props {
  status: string;
  priority: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export default function FilterBar({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <select
        className="border rounded-lg p-2"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>

      <select
        className="border rounded-lg p-2"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="">All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>
  );
}
