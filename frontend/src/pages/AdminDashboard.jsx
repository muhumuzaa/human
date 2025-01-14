// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
//import AdminSidebar from "../components/dashboard/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
//import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/dashboard/Navbar";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-b from-gray-50 via-indigo-100 to-indigo-200">
      <div className="max-w-5xl mx-auto flex space-x-10 min-h-screen">

        <div className="w-1/4 h-full sticky top-0">
        <AdminSidebar />
        </div>

        <div className="w-3/4 py-6">
        <Navbar />
        <Outlet />
         
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
