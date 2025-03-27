import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IssueTable from "../components/IssueTable";

const IssuesByMe = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([
    {
      id: 1,
      name: "Dashboard UI Fix",
      description: "Fix sidebar toggle issue on mobile devices",
      createdAt: "2024-03-25",
      status: "Resolved",
      resolvedAt: "2024-03-26",
      starred: true,
    },
    {
      id: 2,
      name: "API Timeout Error",
      description: "Increase timeout limit in issue fetch API",
      createdAt: "2024-03-26T09:45:00Z",
      status: "Unresolved",
      resolvedAt: null,
      starred: false,
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

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Issues By Me</h2>
      <IssueTable
        issues={issues}
        toggleStar={toggleStar}
        onRowClick={handleRowClick}
        showStatus={true}
        showResolvedAt={true}
      />
      {issues.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No issues found.</p>
      )}
    </div>
  );
};

export default IssuesByMe;
