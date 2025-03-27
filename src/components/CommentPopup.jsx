import { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

const CommentPopup = ({ onSubmit, onClose }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (commentText.trim() === "") return;
    onSubmit(commentText);
    setCommentText("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
        >
          <FaTimes className="text-lg" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-red-400">
          Add a Comment
        </h2>

        <textarea
          className="w-full border border-gray-700  p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-300"
          rows="4"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>

        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 flex items-center gap-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
          >
            <FaPaperPlane />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
