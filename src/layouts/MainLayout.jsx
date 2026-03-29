import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 bg-gray-100 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;