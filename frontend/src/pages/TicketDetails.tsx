import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicket, updateStatus } from "../services/ticketService";
import type { Ticket } from "../types/ticket";
import StatusBadge from "../components/StatusBadge";

export default function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState<Ticket>();

  const [loading, setLoading] = useState(true);

  async function loadTicket() {
    if (!id) return;

    const data = await getTicket(Number(id));

    setTicket(data);

    setLoading(false);
  }

  useEffect(() => {
    loadTicket();
  }, []);

  async function changeStatus(status: string) {
    if (!ticket) return;

    await updateStatus(ticket.id, {
      status: status as any,
    });

    loadTicket();
  }

  if (loading)
    return <p className="text-center">Loading...</p>;

  if (!ticket)
    return <p>Ticket not found.</p>;

  return (
    <div className="bg-white rounded-lg shadow p-8">

      <h1 className="text-3xl font-bold mb-6">
        {ticket.title}
      </h1>

      <div className="space-y-4">

        <div>

          <strong>Description</strong>

          <p>{ticket.description}</p>

        </div>

        <div>

          <strong>Customer</strong>

          <p>{ticket.customerName}</p>

        </div>

        <div>

          <strong>Email</strong>

          <p>{ticket.customerEmail}</p>

        </div>

        <div>

          <strong>Priority</strong>

          <p>{ticket.priority}</p>

        </div>

        <div>

          <strong>Status</strong>

          <div className="mt-2">
            <StatusBadge status={ticket.status} />
          </div>

        </div>

        <div>

          <strong>Created</strong>

          <p>
            {new Date(ticket.createdAt).toLocaleString()}
          </p>

        </div>

        <div>

          <strong>Update Status</strong>

          <select
            className="border rounded p-2 mt-2"
            value={ticket.status}
            onChange={(e) => changeStatus(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

        </div>

      </div>

    </div>
  );
}