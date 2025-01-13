// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
//import AdminSidebar from "../components/dashboard/AdminSidebar";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-b from-white to-indigo-200">
      <div className="max-w-5xl mx-auto flex space-x-10 min-h-screen">

        <div className="w-1/4 h-full sticky top-0">
        <AdminSidebar />
        </div>

        <div className="w-3/4">
          <div className="bg-red-500 h-[500px] mb-6 w-[400px]">one</div>
          <div className="bg-blue-500 h-[500px] mb-6"></div>
          <div className="bg-green-500 h-[500px]"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
