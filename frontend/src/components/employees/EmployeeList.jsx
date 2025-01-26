import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import EmployeeDetails from "./EmployeeDetails";


const EmployeeList = () => {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState('none')

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/employee/list"
        );
        console.log(response.data.employees)
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
  
  const filteredEmployees = employees.filter((emp) =>{
    const name = emp.userId?.name || '';
    return name.toLowerCase().includes(searchTerm)
  }
  );


  const handleFormOpen = (employee = null) => {
    setSelectedEmployee(employee);
    setViewMode('edit')
    setShowForm(true);
  };

  const handleFormClose = () => {
    setSelectedEmployee(null);
    setViewMode('none')
    setShowForm(false);
  };

  const handleViewDetails = (employee) =>{
    setSelectedEmployee(employee)
    setViewMode('view')
    setShowForm(true)
  }
  const handleEditorCreateEmployee = async (formData) => {
    try {
      if (editingEmployee) {
        //editing employee
        const response = await axios.put(
          `http://localhost:3000/api/employee/update/${editingEmployee._id}`,
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
          console.log('updated employee: ', updatedEmployee)

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
          console.log('Created employee: ', response.data.employees)
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
    const confirmDelete = window.confirm(`Are you sure you want to delete record?`)
    if(!confirmDelete)return
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/employee/delete",
        {
            params: {id},
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      if (response.data.success) {
        alert("Employee successfully deleted");
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        handleFormClose()
      }
    } catch (error) {
      console.error("Error deleting employee:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Server error deleting employee.");
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
                viewDetails ={handleViewDetails}
              />
            ))
          ) : (
            <p>No Employee data</p>
          )}
        </div>
      </div>

      {/* Pop-up Model */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleFormClose}
          ></div>

          {/* Form */}
          
           
          <div className="relative z-20">
            {
              viewMode === 'edit' &&(
                <EmployeeForm
              onCancel={handleFormClose}
              onSave={handleEditorCreateEmployee}
              selectedEmployee={selectedEmployee} //how the employee object comes from the EmployeeCard to the EmployeList through useState hook to the EmployeeForm
              deleteEmployee={handleDeleteEmployee}
            />
              )
            }
            
            {
            viewMode === 'view' && (
              <EmployeeDetails selectedEmployee = {selectedEmployee} onCancel={handleFormClose} editEmployee={handleFormOpen} deleteEmployee={handleDeleteEmployee}/>
            )
          }
          </div>
            
            
          
         
          
        </div>
      )}
      <div></div>
    </div>
  );
};

export default EmployeeList;
