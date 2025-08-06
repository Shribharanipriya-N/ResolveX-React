import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateIssue from "./pages/CreateIssue";
import AllIssues from "./pages/AllIssues";
import IssuesByMe from "./pages/IssuesByMe";
import IssuesToMe from "./pages/IssuesToMe";
import StarredIssues from "./pages/StarredIssues";
import Reports from "./pages/Reports";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import IssueDetailAll from "./pages/IssueDetailAll";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import AddComment from "./pages/AddComment";
import { useDispatch } from "react-redux";
import { fetchStarredIssues } from "./redux/starredSlice";

function App() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const fetchUserId = async () => {
      const res = await fetch("http://localhost:8080/user/id", {
        headers: { Authorization: token, email },
      });
      const id = await res.json();
      setUserId(id);
      dispatch(fetchStarredIssues({ userId: id, token, email }));
    };

    fetchUserId();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AllIssues />} />
          <Route path="create" element={<CreateIssue />} />
          <Route path="all" element={<AllIssues />} />
          <Route path="to-me" element={<IssuesToMe />} />
          <Route path="by-me" element={<IssuesByMe />} />
          <Route path="starred" element={<StarredIssues />} />
          <Route path="reports" element={<Reports />} />
          <Route path="logout" element={<Logout />} />
          <Route path="issue/:id" element={<IssueDetailAll />} />
          <Route path="comments/:id" element={<AddComment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
