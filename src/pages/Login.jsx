import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchStarredIssues } from "../redux/starredSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", null, {
        headers: {
          "Content-Type": "application/json",
          email,
          password,
        },
      });

      localStorage.clear();
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      toast.success("Login successful!", { position: "top-right" });

      fetchAndSetUserId(response.data.token, response.data.email);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data, { position: "top-right" });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
        });
      }
    }
  };

  // 2. Fetch User ID and then starred issues
  const fetchAndSetUserId = async (token, email) => {
    try {
      const res = await fetch("http://localhost:8080/user/id", {
        headers: { Authorization: token, email },
      });
      const id = await res.json();
      setUserId(id);
      dispatch(fetchStarredIssues({ userId: id, token, email }));
      navigate("/dashboard/all");
    } catch (err) {
      toast.error("Failed to fetch user ID", { position: "top-right" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full h-[400px] max-w-md p-8 bg-gray-900 flex flex-col justify-around rounded-lg shadow-md shadow-red-500">
        <h2 className="text-2xl font-bold text-red-500 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              className="w-full p-2 pl-10 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:ring-red-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="password"
              className="w-full p-2 pl-10 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:ring-red-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
