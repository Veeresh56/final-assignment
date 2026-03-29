import { NavLink } from "react-router-dom";
import logo from "../assets/idbi-logo.png";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Transaction Reports", path: "/transactions" },
  { name: "QR Details", path: "/qr-details" },
  { name: "Language", path: "/language" },
  { name: "Help & Support", path: "/support" },
];

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm">
      
      {/* Logo */}
      <div className="p-4 border-b flex items-center gap-2">
        <img src={logo} alt="IDBI Logo" className="h-8 w-auto" />
        {/* <span className="font-semibold text-lg">IDBI Bank</span> */}
      </div>

      {/* Menu */}
      <div className="p-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>    
              `block px-4 py-3 rounded-lg mb-2 transition 
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;