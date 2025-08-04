import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaBars, FaSearch } from "react-icons/fa";

const Header = ({ email, token }) => {
  const [showUser, setShowUser] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        if (!email || !token) {
          setMessage("User is not authenticated");
          return;
        }

        const response = await axios.get("http://localhost:8080/user/id", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        });

        if (response.status === 200) {
          setUserId(response.data);
          fetchUserDetails(response.data);
        } else {
          setMessage("Failed to fetch user ID");
        }
      } catch (error) {
        console.error(error);
        setMessage("Error fetching user ID");
      }
    };

    const fetchUserDetails = async (id) => {
      try {
        const response = await axios.get("http://localhost:8080/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
            id: id,
          },
        });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserId();
  }, [email, token]);

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
          <div className="absolute right-0 mt-2 w-60 flex flex-col items-center justify-center gap-2 bg-gray-900 text-white p-4 rounded-lg shadow-xl border border-gray-700">
            <p className="font-semibold text-red-400">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
