import { useState } from "react";
import ProfileModal from "./ProfileModal";

function Topbar() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white h-14 flex justify-between items-center px-6 border-b">

      {/* Left icon */}
      <div className="text-lg">☰</div>

      {/* Profile */}
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          {/* Random Avatar API */}
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=veeresh"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">Stebin Ben</span>
        </div>

        {open && (
          <div className="absolute right-0 mt-2 bg-white shadow rounded w-40">
            
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setShowModal(true);
                setOpen(false);
              }}
            >
              View Profile
            </div>

            <div className="p-2 text-red-500 hover:bg-gray-100 cursor-pointer">
              Logout
            </div>

          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ProfileModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Topbar;