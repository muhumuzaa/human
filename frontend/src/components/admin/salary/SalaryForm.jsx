import { useEffect, useState } from "react";
import { useDepartments } from "../../../context/DepartmentContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SalaryForm = ({salary}) => {

  const location = useLocation()
  const salaryData = location.state?.salary || {};
  const navigate = useNavigate()

  const defaultFormstate = {
    department: salaryData.employeeId?.department?._id ||"no there",
    employeeId: salaryData.employeeId?._id ||"",
    basicSalary: salaryData.basicSalary || "",
    allowances: salaryData.allowances || "",
    deductions: salaryData.deductions || "",
    payDate: salaryData.payDate ? salaryData.payDate.split("T")[0] : "",
  }
  const { depList } = useDepartments();

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [formData, setFormData] = useState(defaultFormstate);

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employee/list");
        if (response.data.success) {
          setEmployees(response.data.employees);
        }
      } catch (error) {
        console.error("Error fetching employees: ", error.response?.data?.error || error.message);
      }
    };
    fetchEmployees();
  }, []);



  // Filter employees based on selected department
  useEffect(() => {
    if (formData.department) {
      const filtered = employees.filter((emp) => emp.department._id === formData.department);
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  }, [formData.department, employees]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalarySave = async (e) => {
    e.preventDefault();
    try {
      console.log('sent data: ', formData);
      const response = await axios.post(
        "http://localhost:3000/api/salary/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.data.success) {
        alert(response.data.message);
       setFormData(defaultFormstate)
        navigate(-1)
      }
    } catch (error) {
      console.error(
        "Error saving salary: ",
        error.response?.data?.error || error.message
      );
    }
  };
  
 
  return (
    <div className="bg-white max-w-lg mx-auto rounded-lg shadow-lg">
      <div className="bg-indigo-300 p-6 rounded-t-lg">
        <h2 className="text-xl font-semibold text-white">{salaryData._id? `Update ${salaryData.employeeId?.name}'s salary`: "Add New Salary"}</h2>
      </div>
      <div className="p-6">
        <form className="space-y-6" onSubmit={handleSalarySave}>
          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-gray-600 text-sm font-medium mb-2">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select</option>
              {depList.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee */}
          <div>
            <label htmlFor="employeeId" className="block text-gray-600 text-sm font-medium mb-2">
              Employee
            </label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select</option>
              {filteredEmployees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.userId.name}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Salary and Allowances */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="basicSalary"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="allowances" className="block text-gray-600 text-sm font-medium mb-2">
                Allowances
              </label>
              <input
                type="number"
                name="allowances"
                value={formData.allowances}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Deductions and Pay Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="deductions" className="block text-gray-600 text-sm font-medium mb-2">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="payDate" className="block text-gray-600 text-sm font-medium mb-2">
                Pay Date
              </label>
              <input
                type="date"
                name="payDate"
                value={formData.payDate}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="block w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {salaryData._id? "Update Salary": "Add Salary"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SalaryForm;
