import { NavLink } from "react-router-dom";
import logo from "../../assets/idbi-logo.png";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Transaction Reports", path: "/transactions" },
  { name: "QR Details", path: "/qr-details" },
  { name: "Language Update", path: "/language" },
  { name: "Help & Support", path: "/support" },
];

// This component renders the sidebar navigation for the dashboard, allowing users to navigate between different sections of the application.
function Sidebar({ isOpen }) {
  return (
    <aside
      className={`h-screen flex-shrink-0 border-r border-[#e2e2e2] bg-white transition-all duration-300 ${
        isOpen ? "w-[280px]" : "w-[82px]"
      }`}
    >
      <div
        className={`flex items-center px-4 transition-all duration-300 ${
          isOpen ? "h-[98px] justify-start" : "h-[72px] justify-center"
        }`}
      >
        <img
          src={logo}
          alt="IDBI Logo"
          className={`w-auto object-contain transition-all duration-300 ${
            isOpen ? "h-[72px]" : "h-[38px]"
          }`}
        />
      </div>

      <nav className="pt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={!isOpen ? item.name : ""}
            className={({ isActive }) =>
              `mb-1 flex items-center transition-all duration-200 ${
                isOpen
                  ? "h-[54px] px-5 text-[18px] font-bold"
                  : "h-[54px] justify-center px-2 text-[14px] font-bold"
              } ${
                isActive
                  ? "border-r-[4px] border-[#f28c28] bg-[#00836C] text-white"
                  : "text-[#2f2f2f] hover:bg-[#eef8f5] hover:text-[#00836C]"
              }`
            }
          >
            <span className={isOpen ? "block" : "hidden"}>{item.name}</span>
            <span className={isOpen ? "hidden" : "block text-center"}>
              {item.name.charAt(0)}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;