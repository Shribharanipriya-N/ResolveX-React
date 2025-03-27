import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaPlus,
  FaList,
  FaUser,
  FaStar,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const links = [
    { name: "All Issues", path: "/dashboard/all", icon: <FaList /> },
    { name: "Create Issue", path: "/dashboard/create", icon: <FaPlus /> },
    { name: "Issues To Me", path: "/dashboard/to-me", icon: <FaUser /> },
    { name: "Starred Issues", path: "/dashboard/starred", icon: <FaStar /> },
    { name: "Issues By Me", path: "/dashboard/by-me", icon: <FaUser /> },
    { name: "Reports", path: "/dashboard/reports", icon: <FaChartBar /> },
    { name: "Logout", path: "/dashboard/logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="bg-gray-900 text-white h-screen w-64 flex flex-col shadow-lg shadow-red-500">
      <h2 className="text-2xl font-bold text-red-500 text-center py-6">
        ResolveX
      </h2>
      <nav className="flex flex-col gap-4 p-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition ${
                isActive ? "bg-gray-800 text-red-500" : "text-gray-300"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
