import React, { useState, useRef } from "react";
import axios from "axios";

const developers = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank"];

const CreateIssue = () => {
  const [issue, setIssue] = useState({
    name: "",
    description: "",
    assignedTo: "",
  });
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    setIssue({ ...issue, assignedTo: value });
    setSearch(value);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:8080/createIssue",
        issue
      );
      if (response.status === 201 || response.status === 200) {
        setMessage("Issue Created Successfully");
        setIssue({ name: "", description: "", assignedTo: "" });
        setSearch("");
      } else {
        setMessage("Failed to create issue");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while creating issue");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white p-10 rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-red-500 text-center">
        Create New Issue
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          name="name"
          value={issue.name}
          onChange={handleChange}
          placeholder="Name of Issue"
          required
          className="p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
        />

        <textarea
          name="description"
          value={issue.description}
          onChange={handleChange}
          placeholder="Issue Description"
          required
          rows="5"
          className="p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
        ></textarea>

        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search Developer"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            className="p-4 w-full rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
          />
          {showDropdown && (
            <div className="absolute z-10 w-full max-h-40 overflow-y-auto bg-gray-800 rounded-lg border border-gray-700 mt-1">
              {developers
                .filter((dev) =>
                  dev.toLowerCase().includes(search.toLowerCase())
                )
                .map((dev) => (
                  <div
                    key={dev}
                    onMouseDown={() => handleSelect(dev)}
                    className={`p-2 cursor-pointer hover:bg-gray-700 rounded ${
                      issue.assignedTo === dev ? "bg-gray-700" : ""
                    }`}
                  >
                    {dev}
                  </div>
                ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Creating..." : "Submit Issue"}
        </button>

        {message && <p className="text-sm mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default CreateIssue;
