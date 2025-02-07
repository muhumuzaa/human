import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import DashboardSummary from "./components/dashboard/DashboardSummary";
import DepartmentList from "./components/departments/DepartmentList";
import EmployeeList from "./components/employees/EmployeeList";
import SalaryForm from "./components/salary/SalaryForm";



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
          <Route path='departments' element={<DepartmentList />}></Route>
          <Route path='employees' element={<EmployeeList />}></Route>
          <Route path='salary' element={<SalaryForm />}></Route>
          <Route path='leaves' element={<DepartmentList />}></Route>
          
        </Route>
        <Route
          path="employee-dashboard"
          element={<EmployeeDashboard />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
