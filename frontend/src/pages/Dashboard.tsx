import { useEffect, useState } from "react";
import {
  getTickets,
  updateStatus,
} from "../services/ticketService";
import type { Ticket } from "../types/ticket";
import TicketTable from "../components/TicketTable";
import FilterBar from "../components/FilterBar";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("");

  async function loadTickets() {
    try {
      setLoading(true);

      const data = await getTickets(
        statusFilter,
        priorityFilter
      );

      setTickets(data);

      setError("");
    } catch {
      setError("Unable to load tickets.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, [statusFilter, priorityFilter]);

  async function handleStatusUpdate(
    id: number,
    status: string
  ) {
    try {
      await updateStatus(id, {
        status: status as
          | "Open"
          | "In Progress"
          | "Resolved",
      });

      loadTickets();

      alert("Status updated successfully.");
    } catch {
      alert("Failed to update status.");
    }
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Support Tickets
        </h2>

      </div>

      <FilterBar
        status={statusFilter}
        priority={priorityFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />

      {loading && (
        <div className="text-center py-10">
          Loading tickets...
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {!loading && !error && tickets.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No tickets found.
        </div>
      )}

      {!loading && !error && tickets.length > 0 && (
        <TicketTable
          tickets={tickets}
          onStatusChange={handleStatusUpdate}
        />
      )}
    </div>
  );
}