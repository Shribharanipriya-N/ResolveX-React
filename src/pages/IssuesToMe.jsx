import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IssueTable from "../components/IssueTable";

const IssuesToMe = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([
    {
      id: 1,
      name: "Login Bug",
      description: "Fix login page animation flickering issue",
      createdAt: "2024-03-24T14:20:00Z",
      status: "Unresolved",
      resolvedAt: null,
      starred: false,
    },
    {
      id: 2,
      name: "Backend API Error",
      description: "Resolve internal server error when fetching issue list",
      createdAt: "2024-03-25T16:45:00Z",
      status: "Resolved",
      resolvedAt: "2024-03-27T10:00:00Z",
      starred: true,
    },
  ]);

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

  const handleStatusChange = (e, id) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              status: newStatus,
              resolvedAt:
                newStatus === "Resolved" ? new Date().toISOString() : null,
            }
          : issue
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Issues To Me</h2>

      <IssueTable
        issues={issues}
        showStatus={true}
        showResolvedAt={true}
        toggleStar={toggleStar}
        onRowClick={handleRowClick}
        showDropdown={true}
        onStatusChange={handleStatusChange}
      />

      {issues.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          No issues assigned to you.
        </p>
      )}
    </div>
  );
};

export default IssuesToMe;
