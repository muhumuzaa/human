import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = () => {

    const [showForm, setShowForm] = useState(false)
    const [employees, setEmployees] = useState([])
    const [searchTerm, setSearchTerm] = useState(undefined)
    const [filteredEmployees, setFilteredEmployees] = useState([])

    useEffect(() =>{
        const fetchEmployees = async() =>{
            try{
                const response = await axios.get('http://localhost:3000/api/employee/list')
                if(response.data.success){
                    setEmployees(response.data.employees)
                    setFilteredEmployees(response.data.employees)
                }
            }catch(error){
                if(error.response && !error.response.data.success){
                    console.log(error.response.data.error)
                }
            }
        }
        fetchEmployees()
    }, [employees])

    // Filter employees based on search term
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === undefined ) {
      // If search term is empty, reset to full list
      setFilteredEmployees(employees);
    } else {
      // Filter employees by name
      const filtered = employees.filter((employee) =>
        employee.emp_name.toLowerCase().includes(value)
      );
      setFilteredEmployees(filtered);
    }
  };


    const handleFormOpen = () =>{
        setShowForm(true)
    }

    const handleFormClose = () =>{
        setShowForm(false)
    }

    const handleEditorCreateEmployee = async (formData) => {

        try {
          const response = await axios.post(
            "http://localhost:3000/api/employee/add",
            formData,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` ,
            "Content-Type": "multipart/form-data"
            },
            }
          );
          if (response.data.success) {
            console.log("Employee successfully created: ", response.data);
            alert("Employee successfully created");
            handleFormClose()
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
    <div className="relative">
        {/* Main content */}
      <div>
        <h3>Employee List</h3>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search Employee(s) by Name"
            className="py-1 px-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300" style={{width: '250px'}}
            onChange={handleSearch}
            value={searchTerm}
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2" onClick={handleFormOpen}>
            Add Employee
          </button>
        </div>
        <div className="bg-white rounded-xl p-6 mt-4">
            {filteredEmployees.length > 0 ? (filteredEmployees.map((emp) =>(
                <EmployeeCard key={emp._id} employee={emp}/>
            ))) : <p>No Employee data</p>
           }
        </div>
      </div>

      {/* Pop-up Model */}
      {
        showForm && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
                {/* overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleFormClose}></div>

                {/* Form */}
                <div className="relative z-20">
                    <EmployeeForm onCancel = {handleFormClose} onSave = {handleEditorCreateEmployee}/>
                </div>
            </div>
        )
      }
      <div>

      </div>

    </div>
  );
};

export default EmployeeList;
