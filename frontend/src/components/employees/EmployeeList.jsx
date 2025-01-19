import { useEffect, useState } from "react";
// import EmployeeForm from "./EmployeeForm";
import axios from "axios";

const EmployeeList = () => {

    // const [showForm, setShowForm] = useState(null)
    const [employees, setEmployees] = useState([])

    useEffect(() =>{
        const fetchEmployees = async() =>{
            try{
                const response = await axios.get('http://localhost:3000/api/employee/list')
                if(response.data.success){
                    setEmployees(response.data.employees)
                }
            }catch(error){
                if(error.response && !error.response.data.success){
                    console.log(error.response.data.error)
                }
            }
        }
        fetchEmployees()
    }, [employees])
  return (
    <div className="relative">
      <div>
        <h3>Employee List</h3>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search Employee(s) by Name"
            className="py-1 px-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300" style={{width: '250px'}}
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2">
            Add Employee
          </button>
        </div>
        <div>
            {/* <EmployeeForm /> */}
            { employees.map((emp) =>(
                <p key={emp._id}>{emp.emp_name}</p>
            ))}
        </div>
      </div>

    </div>
  );
};

export default EmployeeList;
