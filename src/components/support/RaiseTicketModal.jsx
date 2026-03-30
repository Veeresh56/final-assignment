import { useState } from "react";

function RaiseTicketModal({ open, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError("Please select reason.");
      return;
    }

    if (!transactionId.trim()) {
      setError("Please enter transaction ID.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter description.");
      return;
    }

    setError("");

    onSubmit({
      reason,
      transactionId,
      description,
      attachmentName,
    });

    setReason("");
    setTransactionId("");
    setDescription("");
    setAttachmentName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[520px] rounded bg-white shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
        <div className="border-b px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#2f2f2f]">Raise a Query</h2>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-[38px] w-full rounded border border-[#dddddd] px-3 text-[13px] outline-none"
            >
              <option value="">Please Select Reason</option>
              <option value="Transaction Related">Transaction Related</option>
              <option value="Settlement Issue">Settlement Issue</option>
              <option value="QR Issue">QR Issue</option>
              <option value="Language Update Issue">Language Update Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Transaction ID</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter the Transaction ID"
              className="h-[38px] w-full rounded border border-[#dddddd] px-3 text-[13px] outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any additional details..."
              className="w-full rounded border border-[#dddddd] px-3 py-3 text-[13px] outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Attachment</label>
            <label className="flex h-[46px] cursor-pointer items-center gap-3 rounded border border-dashed border-[#d8d8d8] px-3 text-[13px] text-[#888]">
              <span>📎</span>
              <span>{attachmentName || "Please Add Attachment"}</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAttachmentName(e.target.files?.[0]?.name || "")}
              />
            </label>
          </div>

          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
              {error}
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] font-medium text-[#ef4444]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded bg-[#00836C] px-4 py-2 text-[13px] font-medium text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaiseTicketModal;