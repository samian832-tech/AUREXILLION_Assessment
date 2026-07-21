import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import PriorityTag from "./ProrityTag";
import type { Ticket } from "../types/ticket";

interface Props {
  tickets: Ticket[];
  onStatusChange: (id: number, status: string) => void;
}

export default function TicketTable({ tickets, onStatusChange }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left px-4 py-2.5 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              Ticket
            </th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              Priority
            </th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              Status
            </th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              Created
            </th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3 max-w-[220px]">
                <div className="font-medium text-slate-900 truncate">
                  {ticket.title}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {ticket.customerName}
                </div>
              </td>

              <td className="px-4 py-3">
                <PriorityTag priority={ticket.priority} />
              </td>

              <td className="px-4 py-3">
                <StatusBadge status={ticket.status} />
              </td>

              <td className="px-4 py-3 text-xs text-slate-500">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <select
                    value={ticket.status}
                    onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                    className="border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-700 bg-white cursor-pointer"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>

                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    View →
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}