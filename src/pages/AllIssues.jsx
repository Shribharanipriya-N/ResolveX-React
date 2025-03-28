import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IssueTable from "../components/IssueTable";

const AllIssues = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      try {
        const response = await axios.get("http://localhost:8080/issues", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        });
        console.log(response.data);
        setIssues(response.data);
      } catch (err) {
        setError("Failed to fetch issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleRowClick = (issueId) => {
    if (!issueId) {
      console.error("Invalid issueId:", issueId);
      return;
    }
    navigate(`/dashboard/issue/${issueId}`);
  };

  const toggleStar = (e, issueId) => {
    e.stopPropagation();
    setIssues((prev) =>
      prev.map((issue) =>
        issue.issueId === issueId
          ? { ...issue, starred: !issue.starred }
          : issue
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-red-500">All Issues</h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <IssueTable
            issues={issues}
            toggleStar={toggleStar}
            onRowClick={handleRowClick}
          />
          {issues.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No issues found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AllIssues;
