import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IssueTable from "../components/IssueTable";

const StarredIssues = () => {
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
    {
      id: 3,
      name: "Dashboard UI Issue",
      description: "Improve dashboard card alignment on small screens",
      createdAt: "2024-03-26T12:10:00Z",
      status: "Resolved",
      resolvedAt: "2024-03-28T15:30:00Z",
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

  const starredIssues = issues.filter((issue) => issue.starred);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Starred Issues</h2>
      <IssueTable
        issues={starredIssues}
        toggleStar={toggleStar}
        onRowClick={handleRowClick}
        showStatus={true}
        showResolvedAt={true}
      />
      {starredIssues.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          No starred issues found.
        </p>
      )}
    </div>
  );
};

export default StarredIssues;
