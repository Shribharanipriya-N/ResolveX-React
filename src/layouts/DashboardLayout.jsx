import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-950 text-white flex flex-col min-h-screen">
        <Header email={email} token={token} />
        <div className=" flex-1 p-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
