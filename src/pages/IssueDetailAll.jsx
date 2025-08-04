import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaBug, FaCalendarAlt, FaCommentDots, FaPlus } from "react-icons/fa";
import axios from "axios";

const IssueDetailAll = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // const [showPopup, setShowPopup] = useState(false);
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/issue/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        });
        setIssue(res.data);
      } catch (err) {
        console.error("Error fetching issue:", err);
        setError("Failed to load issue details.");
      }
    };
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/comments/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        });
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Failed to load issue comments.");
      }
    };
    fetchIssue();
    fetchComments();
  }, [id, token, email]);

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
        if (res.status === 200) {
          setUserId(res.data);
        }
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    };

    fetchUserId();
  }, [token, email]);

  const handleCommentSubmit = async (commentText) => {
    try {
      if (!userId) {
        alert("Please wait — fetching user information...");
        return;
      }

      await axios.post(
        "http://localhost:8080/comments",
        {
          user: { userId: userId },
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

      const res = await axios.get(`http://localhost:8080/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          email: email,
        },
      });
      setComments(res.data);
      setShowPopup(false);
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment.");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!issue) {
    return <div className="text-gray-400 text-center mt-10">Loading...</div>;
  }
  if (!comments) {
    return <div className="text-gray-400 text-center mt-10">Loading...</div>;
  }

  const handleCommentClick = () => {
    navigate(`/dashboard/comments/${id}`);
  };

  return (
    <div className="relative">
      <div
        className="bg-gray-900 text-white rounded-lg max-w-3xl mx-auto mt-10 p-6 flex flex-col gap-2"
        style={{ height: "75vh" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <FaBug className="text-red-500 text-3xl" />
          <h1 className="text-3xl font-bold text-red-500">{issue.issueName}</h1>
        </div>

        <p className="text-gray-300 text-lg mb-4">{issue.description}</p>

        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <FaCalendarAlt className="text-red-400" />
          <p className="text-sm">
            Created At:{" "}
            <span className="text-gray-300">
              {new Date(issue.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
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
                    key={comment.commentId}
                    className="border-b border-gray-700 pb-2"
                  >
                    <p className="text-gray-300">{comment.content}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.commentedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>

        <button
          onClick={handleCommentClick}
          className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition self-start mt-4"
        >
          <FaPlus className="text-lg" />
          Add Comment
        </button>
      </div>

      {/* {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <CommentPopup
            onSubmit={handleCommentSubmit}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )} */}
    </div>
  );
};

export default IssueDetailAll;
