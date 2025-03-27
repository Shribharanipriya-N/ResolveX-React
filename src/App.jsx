import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div>
      <Signup />
      <ToastContainer />
    </div>
  );
};

export default App;
