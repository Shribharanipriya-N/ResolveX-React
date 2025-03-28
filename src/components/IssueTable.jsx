import { useLocation } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaFileAlt,
  FaInfoCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const IssueTable = ({
  issues,
  showStatus = false,
  showResolvedAt = false,
  toggleStar,
  onRowClick,
  showDropdown = false,
  onStatusChange,
}) => {
  const location = useLocation();

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-800 text-red-400">
          <th className="p-4 w-12"></th>
          <th className="p-4">
            <div className="flex items-center gap-2">
              <FaFileAlt className="w-4 h-4 text-red-400" aria-label="Issue" />
              <span>Issue Name</span>
            </div>
          </th>
          <th className="p-4">
            <div className="flex items-center gap-2">
              <FaInfoCircle
                className="w-4 h-4 text-red-400"
                aria-label="Info"
              />
              <span>Description</span>
            </div>
          </th>
          <th className="p-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt
                className="w-4 h-4 text-red-400"
                aria-label="Date"
              />
              <span>Created At</span>
            </div>
          </th>
          {showStatus && <th className="p-4">Status</th>}
          {showResolvedAt && <th className="p-4">Resolved At</th>}
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr
            key={issue.issueId}
            onClick={() => {
              if (location.pathname === "/dashboard/all") {
                onRowClick(issue.issueId);
              }
            }}
            className="border-b border-gray-700 hover:bg-gray-700 transition cursor-pointer"
          >
            <td className="p-4 w-12 text-center">
              {issue.starred ? (
                <FaStar
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(e, issue.issueId);
                  }}
                  className="w-4 h-4 text-yellow-400 hover:text-yellow-300 transition cursor-pointer"
                  aria-label="Starred"
                />
              ) : (
                <FaRegStar
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(e, issue.issueId);
                  }}
                  className="w-4 h-4 text-gray-500 hover:text-yellow-400 transition cursor-pointer"
                  aria-label="Not Starred"
                />
              )}
            </td>

            <td className="p-4">{issue.issueName}</td>

            <td className="p-4">
              {issue.description.length > 50
                ? issue.description.slice(0, 50) + "..."
                : issue.description}
            </td>

            <td className="p-4">
              {new Date(issue.createdAt).toLocaleDateString()}
            </td>

            {showStatus && (
              <td className="p-4">
                {showDropdown ? (
                  <select
                    value={issue.status ? "Resolved" : "Unresolved"} // ✅ Ensure boolean values are converted
                    onChange={(e) => onStatusChange(e, issue.issueId)}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gray-700 text-white rounded p-1 cursor-pointer"
                  >
                    <option value="Resolved">Resolved</option>
                    <option value="Unresolved">Unresolved</option>
                  </select>
                ) : (
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      issue.status ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {issue.status ? "Resolved" : "Unresolved"}
                  </span>
                )}
              </td>
            )}

            {showResolvedAt && (
              <td className="p-4">
                {issue.status
                  ? new Date(issue.resolvedAt).toLocaleDateString()
                  : "-"}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssueTable;
