export interface Ticket {
  id: number;
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  priority: "Low" | "Medium" | "High";
}

export interface UpdateTicketRequest {
  status: "Open" | "In Progress" | "Resolved";
}
