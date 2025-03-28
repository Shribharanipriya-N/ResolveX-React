import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IssueTable from "../components/IssueTable";

const IssuesByMe = () => {
  const [issues, setIssues] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserId = async () => {
      if (!email || !token) {
        setMessage("User is not authenticated");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/user/id", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        });

        if (response.status === 200) {
          setUserId(response.data);
        } else {
          setMessage("Failed to fetch user ID");
        }
      } catch (error) {
        console.error(error);
        setMessage("Error fetching user ID");
      }
    };

    fetchUserId();
  }, [email, token]);

  useEffect(() => {
    if (!userId) return;

    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/issueByMe/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
              email: email,
            },
          }
        );

        console.log(response.data);
        setIssues(response.data);
      } catch (err) {
        setMessage("Failed to fetch issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [userId]);

  const handleRowClick = (id) => {
    navigate(`/issue/${id}`);
  };

  const toggleStar = (e, id) => {
    e.stopPropagation();
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, starred: !issue.starred } : issue
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Issues By Me</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading issues...</p>
      ) : issues.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">No issues found.</p>
      ) : (
        <IssueTable
          issues={issues}
          toggleStar={toggleStar}
          onRowClick={handleRowClick}
          showStatus={true}
          showResolvedAt={true}
        />
      )}

      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};

export default IssuesByMe;
