import { Outlet } from "react-router-dom"
import Navbar from "../components/admin/dashboard/Navbar"
import EmployeeSidebar from "../components/employee/EmployeeSidebar"


const EmployeeDashboard = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-indigo-100 to-indigo-200">
      <div className="max-w-5xl mx-auto flex space-x-10 min-h-screen">

        <div className="w-1/4 h-full sticky top-0">
        <EmployeeSidebar />
        </div>

        <div className="w-3/4 py-6">
        <Navbar />
        <Outlet />
         
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard