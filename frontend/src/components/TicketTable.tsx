import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import type { Ticket } from "../types/ticket";

interface Props {
  tickets: Ticket[];
  onStatusChange: (id: number, status: string) => void;
}

export default function TicketTable({
  tickets,
  onStatusChange,
}: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Customer</th>
            <th className="text-left p-3">Priority</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Created</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-3">{ticket.title}</td>

              <td className="p-3">{ticket.customerName}</td>

              <td className="p-3">{ticket.priority}</td>

              <td className="p-3">
                <StatusBadge status={ticket.status} />
              </td>

              <td className="p-3">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3 flex gap-3">

                <select
                  value={ticket.status}
                  className="border rounded p-1"
                  onChange={(e) =>
                    onStatusChange(ticket.id, e.target.value)
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

                <Link
                  to={`/tickets/${ticket.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}