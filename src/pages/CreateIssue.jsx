// import React, { useState, useRef } from "react";
// import axios from "axios";

// const developers = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank"];

// const CreateIssue = () => {
//   const [issue, setIssue] = useState({
//     name: "",
//     description: "",
//     assignedTo: "",
//   });
//   const [search, setSearch] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const dropdownRef = useRef(null);

//   const handleChange = (e) => {
//     setIssue({ ...issue, [e.target.name]: e.target.value });
//   };

//   const handleSelect = (value) => {
//     setIssue({ ...issue, assignedTo: value });
//     setSearch(value);
//     setShowDropdown(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const token = localStorage.getItem("token");
//     const email = localStorage.getItem("email");

//     try {
//       console.log(email, token);

//       const userIdResponse = await axios.get("http://localhost:8080/user/id", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//           email: email,
//         },
//       });
//       console.log(userIdResponse);

//       if (userIdResponse.status !== 200) {
//         throw new Error("Failed to fetch user ID");
//       }

//       const assignedBy = userIdResponse.data;

//       const response = await axios.post(
//         "http://localhost:8080/issue",
//         { ...issue, assignedBy },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//             email: email,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setMessage("Issue Created Successfully");
//         setIssue({ name: "", description: "", assignedTo: "" });
//         setSearch("");
//       } else {
//         setMessage("Failed to create issue");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Error occurred while creating issue");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-gray-900 text-white p-10 rounded-xl mt-10">
//       <h2 className="text-3xl font-bold mb-8 text-red-500 text-center">
//         Create New Issue
//       </h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//         <input
//           type="text"
//           name="name"
//           value={issue.name}
//           onChange={handleChange}
//           placeholder="Name of Issue"
//           required
//           className="p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
//         />

//         <textarea
//           name="description"
//           value={issue.description}
//           onChange={handleChange}
//           placeholder="Issue Description"
//           required
//           rows="5"
//           className="p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
//         ></textarea>

//         <div className="relative" ref={dropdownRef}>
//           <input
//             type="text"
//             placeholder="Search Developer"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setShowDropdown(true);
//             }}
//             onFocus={() => setShowDropdown(true)}
//             onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
//             className="p-4 w-full rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
//           />
//           {showDropdown && (
//             <div className="absolute z-10 w-full max-h-40 overflow-y-auto bg-gray-800 rounded-lg border border-gray-700 mt-1">
//               {developers
//                 .filter((dev) =>
//                   dev.toLowerCase().includes(search.toLowerCase())
//                 )
//                 .map((dev) => (
//                   <div
//                     key={dev}
//                     onMouseDown={() => handleSelect(dev)}
//                     className={`p-2 cursor-pointer hover:bg-gray-700 rounded ${
//                       issue.assignedTo === dev ? "bg-gray-700" : ""
//                     }`}
//                   >
//                     {dev}
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
//         >
//           {loading ? "Creating..." : "Submit Issue"}
//         </button>

//         {message && <p className="text-sm mt-2 text-center">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreateIssue;

import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateIssue = () => {
  const [issue, setIssue] = useState({
    issueName: "",
    description: "",
    assignedTo: "",
  });
  const [assignedBy, setAssignedBy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        if (!email || !token) {
          setMessage("User is not authenticated");
          return;
        }

        const response = await axios.get("http://localhost:8080/user/id", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        });

        if (response.status === 200) {
          setAssignedBy(response.data);
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
    if (shouldSubmit && assignedBy) {
      submitIssue();
    }
  }, [shouldSubmit, assignedBy]);

  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!assignedBy) {
      setMessage("Fetching user ID... Please wait.");
      setShouldSubmit(true);
    } else {
      submitIssue();
    }
  };

  const submitIssue = async () => {
    setLoading(true);
    console.log({ ...issue });

    try {
      const response = await axios.post(
        "http://localhost:8080/issue",
        { ...issue, assignedBy },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            email: email,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Issue Created Successfully");
        setIssue({ issueName: "", description: "", assignedTo: "" });
      } else {
        setMessage("Failed to create issue");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while creating issue");
    }

    setLoading(false);
    setShouldSubmit(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white p-10 rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-red-500 text-center">
        Create New Issue
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          name="issueName"
          value={issue.issueName}
          onChange={handleChange}
          placeholder="Name of Issue"
          required
          className="p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
        />

        <textarea
          name="description"
          value={issue.description}
          onChange={handleChange}
          placeholder="Issue Description"
          required
          rows="5"
          className="p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
        ></textarea>

        <input
          type="text"
          name="assignedTo"
          value={issue.assignedTo}
          onChange={handleChange}
          placeholder="Enter Developer's Email"
          required
          className="p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-red-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Creating..." : "Submit Issue"}
        </button>

        {message && <p className="text-sm mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default CreateIssue;
