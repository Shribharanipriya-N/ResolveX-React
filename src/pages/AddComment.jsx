import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCommentPage = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const { id } = useParams();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/id", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        });
        setUserId(res.data);
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    };
    fetchUserId();
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!userId) {
        alert("User information loading. Please try again.");
        return;
      }

      await axios.post(
        "http://localhost:8080/comments",
        {
          user: { userId },
          issue: { issueId: id },
          content: commentText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        }
      );

      navigate(`/dashboard/issue/${id}`);
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to submit comment.");
    }
  };

  return (
    <div className="flex justify-center pt-5">
      <div className="flex items-center justify-center min-h-[calc(100vh-40vh)] w-[40vw]   bg-gray-900 text-white px-4 rounded-lg">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-lg ">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-400">
            Add a Comment
          </h2>
          {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Enter your comment..."
              className="p-3 rounded bg-gray-700 text-white"
              rows={5}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCommentPage;
