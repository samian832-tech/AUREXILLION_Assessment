import { useState } from "react";
import type { CreateTicketRequest } from "../types/ticket";

interface Props {
  onSubmit: (ticket: CreateTicketRequest) => Promise<void>;
}

export default function TicketForm({ onSubmit }: Props) {
  const [form, setForm] = useState<CreateTicketRequest>({
    title: "",
    description: "",
    customerName: "",
    customerEmail: "",
    priority: "Medium",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};

    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.customerName.trim())
      e.customerName = "Customer name is required";

    if (!form.customerEmail.trim())
      e.customerEmail = "Customer email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.customerEmail)
    )
      e.customerEmail = "Invalid email";

    setErrors(e);

    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit(form);

      setForm({
        title: "",
        description: "",
        customerName: "",
        customerEmail: "",
        priority: "Medium",
      });

      alert("Ticket created successfully.");
    } catch {
      alert("Unable to create ticket.");
    } finally {
      setSubmitting(false);
    }
  }

  function update(field: keyof CreateTicketRequest, value: string) {
    setForm((prev: CreateTicketRequest) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div>
        <label className="font-medium">Title</label>

        <input
          className="w-full border rounded p-2"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />

        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title}</p>
        )}
      </div>

      <div>
        <label>Description</label>

        <textarea
          rows={5}
          className="w-full border rounded p-2"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />

        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description}</p>
        )}
      </div>

      <div>
        <label>Customer Name</label>

        <input
          className="w-full border rounded p-2"
          value={form.customerName}
          onChange={(e) => update("customerName", e.target.value)}
        />

        {errors.customerName && (
          <p className="text-red-600 text-sm">
            {errors.customerName}
          </p>
        )}
      </div>

      <div>
        <label>Customer Email</label>

        <input
          className="w-full border rounded p-2"
          value={form.customerEmail}
          onChange={(e) => update("customerEmail", e.target.value)}
        />

        {errors.customerEmail && (
          <p className="text-red-600 text-sm">
            {errors.customerEmail}
          </p>
        )}
      </div>

      <div>
        <label>Priority</label>

        <select
          className="w-full border rounded p-2"
          value={form.priority}
          onChange={(e) => update("priority", e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <button
        disabled={submitting}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {submitting ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
}