import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;