import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import DashboardSummary from "./components/admin/dashboard/DashboardSummary";
import DepartmentList from "./components/admin/departments/DepartmentList";
import EmployeeList from "./components/admin/employees/EmployeeList";
import SalaryForm from "./components/admin/salary/SalaryForm";
import EmployeeSummary from "./components/employee/EmployeeSummary";
import EmployeeDetails from "./components/admin/employees/EmployeeDetails";
import LeavesList from "./components/employee/leaves/LeavesList";
import AddLeave from "./components/employee/leaves/AddLeave";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<DashboardSummary />}></Route>
          <Route path="departments" element={<DepartmentList />}></Route>
          <Route path="employees" element={<EmployeeList />}></Route>
          <Route path="salary" element={<SalaryForm />}></Route>
          <Route path="leaves" element={<DepartmentList />}></Route>
        </Route>

        <Route
          path="employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element ={<EmployeeSummary />}></Route>
          <Route path="profile/:userId" element ={<EmployeeDetails />}></Route>
          <Route path="leaves" element ={<LeavesList />}></Route>
          <Route path="leaves/add-leave" element ={<AddLeave />}></Route>
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
