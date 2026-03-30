import { useState } from "react";
import RaiseTicketModal from "../components/support/RaiseTicketModal";
import SupportTable from "../components/support/SupportTable";

function Support() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);

  const handleSubmitTicket = (formData) => {
    const newTicket = {
      id: Date.now().toString(),
      ...formData,
    };

    setTickets((prev) => [newTicket, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-[28px] font-semibold text-[#1f1f1f]">
          Help &amp; Support
        </h1>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-[#00836C] px-4 py-2 text-[13px] font-medium text-white"
        >
          Raise a ticket
        </button>
      </div>

      <SupportTable rows={tickets} />

      <RaiseTicketModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTicket}
      />
    </div>
  );
}

export default Support;