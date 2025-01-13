// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-b from-white to-indigo-100">
      <div className="max-w-6xl mx-auto flex min-h-screen items-center justify-center space-x-6 pt-6">
        <div className="w-1/4 ">
          <AdminSidebar />
        </div>
        <div className="w-3/4">
          <div className="w-700px bg-red-500 h-[500px]"></div>
          <div className="w-700px bg-blue-500 h-[500px]"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
