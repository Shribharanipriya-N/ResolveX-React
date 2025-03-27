import { useState } from "react";
import { FaBug, FaCalendarAlt, FaCommentDots, FaPlus } from "react-icons/fa";
import CommentPopup from "../components/CommentPopup";

const IssueDetailAll = () => {
  const [showPopup, setShowPopup] = useState(false);

  const issue = {
    id: 1,
    name: "Bug in Login Functionality",
    description:
      "Users are unable to log in with valid credentials. The issue occurs after the latest update.",
    createdAt: "2025-03-25T14:30:00Z",
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      text: "I checked the API logs, seems like a token issue.",
      createdAt: "2025-03-26T10:00:00Z",
    },
    {
      id: 2,
      text: "Might be related to session storage, will debug it.",
      createdAt: "2025-03-26T12:45:00Z",
    },
    {
      id: 3,
      text: "Session expiry might be causing this. Need to verify.",
      createdAt: "2025-03-26T14:00:00Z",
    },
    {
      id: 4,
      text: "Backend JWT token might be invalid after refresh.",
      createdAt: "2025-03-26T15:30:00Z",
    },
  ]);

  const handleCommentSubmit = (commentText) => {
    const newComment = {
      id: comments.length + 1,
      text: commentText,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setShowPopup(false);
  };

  return (
    <div className="relative">
      <div
        className="bg-gray-900 text-white rounded-lg max-w-3xl mx-auto mt-10 p-6 flex flex-col gap-2"
        style={{ height: "75vh" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <FaBug className="text-red-500 text-3xl" />
          <h1 className="text-3xl font-bold text-red-500">{issue.name}</h1>
        </div>

        <p className="text-gray-300 text-lg mb-4">{issue.description}</p>

        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <FaCalendarAlt className="text-red-400" />
          <p className="text-sm">
            Created At:{" "}
            <span className="text-gray-300">
              {new Date(issue.createdAt).toLocaleString()}
            </span>
          </p>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FaCommentDots className="text-red-400 text-xl" />
            <h2 className="text-xl font-semibold text-red-400">Comments</h2>
          </div>

          <div
            className="border border-gray-700 p-4 rounded-lg bg-gray-800 flex-1 overflow-y-auto"
            style={{ maxHeight: "250px" }}
          >
            {comments.length > 0 ? (
              <ul className="space-y-3">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="border-b border-gray-700 pb-2"
                  >
                    <p className="text-gray-300">{comment.text}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>

        {/* Add Comment Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition self-start"
        >
          <FaPlus className="text-lg" />
          Add Comment
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CommentPopup
            onSubmit={handleCommentSubmit}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </div>
  );
};

export default IssueDetailAll;
