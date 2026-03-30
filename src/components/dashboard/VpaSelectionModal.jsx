import { useEffect, useState } from "react";

// This component renders a modal that allows users to select a VPA (Virtual Payment Address) from a list of profiles. It is typically used when a user has multiple VPAs associated with their account and needs to choose one for a specific operation.
// The modal displays the available VPAs as radio buttons, and users can proceed with their selection or cancel the operation. The component manages the state of the selected VPA and handles user interactions for proceeding or canceling.
// It receives the list of profiles, the open state of the modal, and callback functions for canceling and proceeding as props.
// The component ensures that a VPA is selected before allowing the user to proceed, and it provides a user-friendly interface for making the selection.
function VpaSelectionModal({ open, profiles = [], onCancel, onProceed }) {
  const [selectedVpa, setSelectedVpa] = useState("");

  useEffect(() => {
    if (open && profiles.length > 0 && !selectedVpa) {
      setSelectedVpa(profiles[0]?.vpa_id || "");
    }
  }, [open, profiles, selectedVpa]);

  const selectedProfile = profiles.find((item) => item.vpa_id === selectedVpa);

  const handleProceed = () => {
    if (selectedProfile) {
      onProceed(selectedProfile);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[420px] rounded bg-white shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
        <div className="border-b px-5 py-4">
          <h2 className="text-[15px] font-medium text-[#2d2d2d]">Select VPA</h2>
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-[12px] text-[#5a5a5a]">
            Select a VPA to Proceed
          </p>

          <div className="space-y-2">
            {profiles.map((item) => (
              <label
                key={`${item.vpa_id}-${item.serial_number}`}
                className="flex cursor-pointer items-center gap-3 rounded border border-[#ebebeb] px-3 py-3 hover:bg-[#fafafa]"
              >
                <input
                  type="radio"
                  name="selected_vpa"
                  checked={selectedVpa === item.vpa_id}
                  onChange={() => setSelectedVpa(item.vpa_id)}
                  className="h-4 w-4"
                />
                <span className="text-[13px] text-[#3f3f3f]">{item.vpa_id}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 pb-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-[13px] font-medium text-[#ef4444]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleProceed}
            disabled={!selectedProfile}
            className="rounded bg-[#0b8f72] px-4 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default VpaSelectionModal;