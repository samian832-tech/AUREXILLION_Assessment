import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import { createTicket } from "../services/ticketService";
import type { CreateTicketRequest } from "../types/ticket";

export default function CreateTicket() {
  const navigate = useNavigate();

  async function handleCreate(ticket: CreateTicketRequest) {
    await createTicket(ticket);

    navigate("/");
  }

  return (
    <div className="max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold mb-6">
        Create Ticket
      </h2>

      <TicketForm onSubmit={handleCreate} />

    </div>
  );
}