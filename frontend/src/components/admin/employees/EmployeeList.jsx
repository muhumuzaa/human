import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import EmployeeDetails from "./EmployeeDetails";
import ViewSalary from "../salary/ViewSalary";
import EmployeeLeaves from "../leaves/EmployeeLeaves";

const EmployeeList = () => {
  const [showPopup, setShowpopup] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState("none");

  const [empSalary, setEmpSalary] = useState({});
  const [leaves, setLeaves] = useState([]);
  const [leaveEmployee, setLeaveEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/employee/list",
        );
        console.log(response.data.employees);
        if (response.data.success) {
          setEmployees(response.data.employees);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error);
        }
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter((emp) => {
    const name = emp.userId?.name || "";
    return name.toLowerCase().includes(searchTerm);
  });

  const handleFormOpen = (employee = null) => {
    setSelectedEmployee(employee);
    setViewMode("edit");
    setShowpopup(true);
  };

  const handleFormClose = () => {
    setSelectedEmployee(null);
    setViewMode("none");
    setShowpopup(false);
    console.log('closing')
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowpopup(true);
    setViewMode("view");
    
  };

  const handleEditorCreateEmployee = async (formData) => {
    try {
      if (selectedEmployee) {
        //editing employee
        const response = await axios.put(
          `http://localhost:3000/api/employee/update/${selectedEmployee._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("upading object: ", formData);
        if (response.data.success) {
          const updatedEmployee = response.data.employee;
          console.log("updated employee: ", updatedEmployee);

          setEmployees((prev) =>
            prev.map((emp) =>
              emp._id === updatedEmployee._id ? updatedEmployee : emp
            )
          );

          alert("Employee update successful");
        }
      } else {
        //Creating new employee
        const response = await axios.post(
          "http://localhost:3000/api/employee/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setEmployees((prev) => [...prev, ...response.data.employees]);
          alert("Employee successfully created");
          console.log("Created employee: ", response.data.employees);
        }
      }
      handleFormClose();
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("Server error while creating employee");
      }
    }
  };

  const handleDeleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Employee?`
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/employee/delete",
        {
          params: { id },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        alert("Employee successfully deleted");
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        handleFormClose();
      }
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error.response?.data?.error || error.message
      );
      alert(error.response?.data?.error || "Server error deleting employee.");
    }
  };

  const handleViewSalary = async (employee) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/salary/employee/${employee._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setEmpSalary(response.data.salary);
        setSelectedEmployee(employee);
        setViewMode("salary");
        setShowpopup(true);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSelectedEmployee(employee);
        setEmpSalary(null); // Means no salary which displays ui with button
        setViewMode("salary"); // Then in your <ViewSalary>, you handle the no-salary fallback UI
        setShowpopup(true);
      }
    }
  };

  const handleViewEmployeeLeaves = async (employee) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/leaves/emp/${employee._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves);
        setViewMode("leaves");
        setShowpopup(true);
        setLeaveEmployee(employee.userId.name);
      }
    } catch (error) {
      console.log(error.response?.data?.error);
      alert("Employee has no leaves yet")
    }
  };

  return (
    <div className="relative">
      {/* Main content */}
      <div>
        <h3>Employee List</h3>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search Employee(s) by Name"
            className="py-1 px-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300"
            style={{ width: "250px" }}
            onChange={handleSearch}
            value={searchTerm}
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2"
            onClick={() => handleFormOpen()}
          >
            Add Employee
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 mt-4">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <EmployeeCard
                key={emp._id}
                employee={emp}
                editEmployee={handleFormOpen}
                deleteEmployee={handleDeleteEmployee}
                viewDetails={handleViewDetails}
                onViewSalary={handleViewSalary}
                onViewEmployeeLeaves={handleViewEmployeeLeaves}
               
              />
            ))
          ) : (
            <p>No Employee data</p>
          )}
        </div>
      </div>

      {/* Pop-up Model */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleFormClose}
          ></div>

          {/* popup content -scrollable */}

          <div className="relative z-20  w-full max-w-4xl ">
            {viewMode === "edit" && (
              <EmployeeForm
                onCancel={handleFormClose}
                onSave={handleEditorCreateEmployee}
                selectedEmployee={selectedEmployee} //how the employee object comes from the EmployeeCard to the EmployeList through useState hook to the EmployeeForm
                deleteEmployee={handleDeleteEmployee}
              />
            )}

            {viewMode === "view" && (
              <EmployeeDetails
                selectedEmployee={selectedEmployee}
                onCancel={handleFormClose}
                editEmployee={handleFormOpen}
                deleteEmployee={() =>
                  handleDeleteEmployee(selectedEmployee._id)
                }
              />
            )}

            {viewMode === "salary" && (
              <ViewSalary
                selectedEmployee={selectedEmployee}
                onCancel={handleFormClose}
                empSalary={empSalary}
              />
            )}

            {viewMode === "leaves" && (
              <
                EmployeeLeaves 
                leaves = {leaves}
                leaveEmployee = {leaveEmployee}
                onCancel={handleFormClose}
                />
            )}
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default EmployeeList;
