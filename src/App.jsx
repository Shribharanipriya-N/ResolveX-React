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
import AddComment from "./pages/AddComment";

function App() {
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
