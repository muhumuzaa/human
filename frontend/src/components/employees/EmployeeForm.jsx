import axios from "axios";
import { useState } from "react";
import { useDepartments } from "../../context/DepartmentContext";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    emp_name: "",
    email: "",
    tel: "",
    department: "",
    salary: "",
  });
  const { depList } = useDepartments();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };
  
  const handleEditorCreateEmployee = async (e) => {
    e.preventDefault();
    try {
        
      const response = await axios.post(
        "http://localhost:3000/api/employee/add",
        employee,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        console.log("Employee successfully created: ", response.data);
        alert("Employee successfully created");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("Server error while creating employee");
      }
    }
  };

  return (
    <div className="bg-white w-[26rem] mx-auto rounded-lg p-4 shadow-lg">
      <h3 className="text-xl text-gray-700 font-semibold mb-4">
        Add New Employee
      </h3>
      <form onSubmit={handleEditorCreateEmployee}>
        <div className="mb-4">
          <label htmlFor="emp_name" className="block">
            Name
          </label>
          <input
            type="text"
            name="emp_name"
            onChange={handleInputChange}
            value={employee.emp_name}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            value={employee.email}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tel" className="block">
            Telephone
          </label>
          <input
            type="phone"
            name="tel"
            onChange={handleInputChange}
            value={employee.tel}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="pr-4">
            Department
          </label>
          <select
            onChange={handleInputChange}
            value={employee.department}
            name="department"
            className="border border-gray-300 rounded-lg px-2"
          >
            <option value="">Select</option>
            {depList.length > 0 ? (
              depList.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))
            ) : (
              <option disabled>No Departments Available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="salary" className="block">
            Salary
          </label>
          <input
            type="money"
            name="salary"
            onChange={handleInputChange}
            value={employee.salary}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="hover:bg-gray-700 py-1 px-3 rounded-xl text-gray-800 border border-gray-400 hover:text-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 py-1 px-3 rounded-xl text-slate-50"
          >
            Create Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
