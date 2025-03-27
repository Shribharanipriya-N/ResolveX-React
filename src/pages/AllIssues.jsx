import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IssueTable from "../components/IssueTable";

const AllIssues = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([
    {
      id: 1,
      name: "Login Page Bug",
      description: "Fix the alignment issue on login page",
      createdAt: "2024-03-25T10:30:00Z",
      starred: false,
    },
    {
      id: 2,
      name: "API Error",
      description: "Resolve 500 error in issue creation API",
      createdAt: "2024-03-26T14:15:00Z",
      starred: false,
    },
    {
      id: 3,
      name: "UI Enhancement",
      description: "Add animations to sidebar for better UX",
      createdAt: "2024-03-27T09:00:00Z",
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
      <h2 className="text-3xl font-bold mb-6 text-red-500">All Issues</h2>
      <IssueTable
        issues={issues}
        toggleStar={toggleStar}
        onRowClick={handleRowClick}
      />
      {issues.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No issues found.</p>
      )}
    </div>
  );
};

export default AllIssues;
