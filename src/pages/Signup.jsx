import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, name, password);
      const response = await axios.post("http://localhost:8080/signup", null, {
        headers: {
          "Content-Type": "application/json",
          email,
          username: name,
          password,
        },
      });

      toast.success("Signup successful! Please login.", {
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
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
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-md shadow-red-500">
        <h2 className="text-2xl font-bold text-red-500 text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              className="w-full p-2 pl-10 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:ring-red-500"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
