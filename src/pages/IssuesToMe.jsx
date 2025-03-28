import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IssueTable from "../components/IssueTable";

const IssuesToMe = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  // Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      if (!email || !token) {
        setMessage("User is not authenticated");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/user/id", {
          headers: {
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

  // Fetch issues assigned to the user
  useEffect(() => {
    if (!userId) return;

    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/issueToMe/${userId}`,
          {
            headers: {
              Authorization: token,
              email: email,
            },
          }
        );

        setIssues(response.data);
      } catch (error) {
        console.error(error);
        setMessage("Failed to fetch issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [userId]);

  // Navigate to issue details
  const handleRowClick = (id) => {
    navigate(`/issue/${id}`);
  };

  // Toggle starring an issue
  const toggleStar = async (e, id) => {
    e.stopPropagation();

    try {
      await axios.post(
        `http://localhost:8080/issues/star/${id}`,
        {},
        {
          headers: {
            Authorization: token,
            email: email,
          },
        }
      );

      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === id ? { ...issue, starred: !issue.starred } : issue
        )
      );
    } catch (error) {
      console.error("Error toggling star:", error);
    }
  };

  const handleStatusChange = async (e, issueId) => {
    e.stopPropagation();
    const newStatus = e.target.value;

    try {
      await axios.put(
        `http://localhost:8080/issue/${issueId}?id=${userId}`,
        {},
        {
          headers: {
            Authorization: token,
            email: email,
          },
        }
      );

      setIssues((prev) =>
        prev.map((issue) =>
          issue.issueId === issueId
            ? {
                ...issue,
                status: newStatus,
                resolvedAt:
                  newStatus === "Resolved" ? new Date().toISOString() : null,
              }
            : issue
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Issues To Me</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading issues...</p>
      ) : issues.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">
          No issues assigned to you.
        </p>
      ) : (
        <IssueTable
          issues={issues}
          showStatus={true}
          showResolvedAt={true}
          toggleStar={toggleStar}
          onRowClick={handleRowClick}
          showDropdown={true}
          onStatusChange={handleStatusChange}
        />
      )}

      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};

export default IssuesToMe;
