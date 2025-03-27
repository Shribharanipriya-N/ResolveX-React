import React, { useState } from "react";
import { FaUserCircle, FaBars, FaSearch } from "react-icons/fa";

const Header = () => {
  const [showUser, setShowUser] = useState(false);

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  return (
    <header className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 relative">
      <button className="text-xl text-red-500 md:hidden">
        <FaBars />
      </button>

      <div className="flex flex-col items-center flex-1 relative">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search issues..."
            className="p-2 pl-10 w-full rounded-full bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:ring-red-500 text-sm outline-none"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowUser(!showUser)}
          className="text-3xl text-red-500 hover:text-red-400 transition"
        >
          <FaUserCircle />
        </button>

        {showUser && (
          <div className="absolute right-0 mt-2 w-60 h-30 flex flex-col items-center justify-center gap-2  bg-gray-900 text-white p-4 rounded-lg shadow-xl border border-gray-700">
            <p className="font-semibold text-red-400 pd-2">{user.name}</p>
            <p className="text-sm text-gray-400 pd-2">{user.email}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
