import axios from "axios";
import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      localStorage.setItem({
        token: response.data.token,
        email: response.data.email,
      });
      toast.success("Login successful!", { position: "top-right" });
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full h-[400px] max-w-md p-8 bg-gray-900  flex flex-col justify-around rounded-lg shadow-md shadow-red-500">
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
