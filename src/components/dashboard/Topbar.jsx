import { useMemo, useState } from "react";
import ProfileModal from "./ProfileModal";
import { storage } from "../../utils/storage";
import { logoutUser } from "../../utils/logout";

function getDisplayName(profile) {
  return profile?.merchant_name || "User";
}

function getAvatarInitials(name = "User") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// This component represents the top navigation bar of the dashboard, which includes a toggle button for the sidebar and a user profile section with options to view the profile and logout.
// It manages the state for the profile modal and handles user interactions related to the profile and logout functionality.
// The profile information is retrieved from local storage, and the component uses utility functions to format the display name and avatar initials.
function Topbar({ onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const profile = storage.getSelectedProfile();
  const displayName = useMemo(() => getDisplayName(profile), [profile]);
  const initials = useMemo(() => getAvatarInitials(displayName), [displayName]);

  const handleLogout = () => {
    setOpen(false);
    setShowModal(false);
    logoutUser();
  };

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#e5e5e5] bg-white px-5">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="text-[26px] leading-none text-[#555555]"
      >
        ☰
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b8f72] text-[13px] font-semibold text-white">
            {initials}
          </div>
          <span className="text-[14px] font-medium text-[#3a3a3a]">
            {displayName}
          </span>
        </button>

        {open ? (
          <div className="absolute right-0 z-20 mt-2 w-36 rounded bg-white py-1 shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
            <button
              type="button"
              className="block w-full px-4 py-3 text-left text-[13px] text-[#333333] hover:bg-[#f5fbf9]"
              onClick={() => {
                setShowModal(true);
                setOpen(false);
              }}
            >
              View Profile
            </button>

            <button
              type="button"
              className="block w-full px-4 py-3 text-left text-[13px] text-[#ef4444] hover:bg-[#f5fbf9]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>

      {showModal ? (
        <ProfileModal profile={profile} onClose={() => setShowModal(false)} />
      ) : null}
    </header>
  );
}

export default Topbar;