import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets, updateStatus } from "../services/ticketService";
import type { Ticket } from "../types/ticket";
import TicketTable from "../components/TicketTable";
import FilterBar from "../components/FilterBar";
import StatsOverview from "../components/StatsOverview";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [search, setSearch] = useState("");

  async function loadTickets() {
    try {
      setLoading(true);
      const data = await getTickets(statusFilter, priorityFilter);
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

  async function handleStatusUpdate(id: number, status: string) {
    try {
      await updateStatus(id, {
        status: status as "Open" | "In Progress" | "Resolved",
      });
      loadTickets();
    } catch {
      alert("Failed to update status.");
    }
  }

  const visibleTickets = useMemo(() => {
    if (!search.trim()) return tickets;
    const q = search.toLowerCase();
    return tickets.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q)
    );
  }, [tickets, search]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-7">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Tickets</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {tickets.length} total · last updated just now
          </p>
        </div>

        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + New ticket
        </Link>
      </div>

      <StatsOverview tickets={tickets} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <FilterBar
          status={statusFilter}
          priority={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tickets…"
          className="w-full md:w-56 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
        />
      </div>

      {loading && (
        <div className="text-center py-14 text-sm text-slate-400">
          Loading tickets…
        </div>
      )}

      {error && (
        <div className="bg-rose-50 text-rose-600 text-sm px-4 py-3 rounded-lg border border-rose-100">
          {error}
        </div>
      )}

      {!loading && !error && visibleTickets.length === 0 && (
        <div className="text-center py-14 text-sm text-slate-400 bg-white border border-slate-200 rounded-xl">
          No tickets found.
        </div>
      )}

      {!loading && !error && visibleTickets.length > 0 && (
        <TicketTable tickets={visibleTickets} onStatusChange={handleStatusUpdate} />
      )}
    </div>
  );
}