import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IssueTable from "../components/IssueTable";
import { useSelector } from "react-redux";

const IssuesToMe = () => {
  const starredIds = useSelector((state) => state.starred.issueIds);
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

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
          `http://localhost:8080/issueToMe/${userId}`,
          {
            headers: {
              Authorization: token,
              email: email,
            },
          }
        );

        const issuesWithStars = response.data.map((issue) => ({
          ...issue,
          starred: starredIds.includes(issue.issueId),
        }));
        setIssues(issuesWithStars);
      } catch (error) {
        console.error(error);
        setMessage("Failed to fetch issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [userId, starredIds]);

  const handleRowClick = (issueId) => {
    if (!issueId) {
      console.error("Invalid issueId:", issueId);
      return;
    }
    navigate(`/dashboard/issue/${issueId}`);
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
          onRowClick={handleRowClick}
          showDropdown={true}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default IssuesToMe;
