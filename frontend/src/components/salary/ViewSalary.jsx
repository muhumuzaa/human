import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'

const ViewSalary = ({ selectedEmployee }) => {
  const [empSalary, setEmpSalary] = useState({});

  const navigate = useNavigate()

  
//fetch salary
  useEffect(() => {
    const fetchEmpSalary = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmpSalary(response.data.salary);
          console.log(empSalary);
        }
      } catch (error) {
        alert(error.response.data.error || error.message);
      }
    };
    if (selectedEmployee && selectedEmployee._id) {
      fetchEmpSalary(selectedEmployee._id);
    }
  }, [selectedEmployee]);

 

  if (!selectedEmployee) {
    return <div>No Employee data</div>;
  }

  const handleEdit = () =>{
    {navigate('/admin-dashboard/salary', {state: {salary: empSalary}})
  }}

  return (
    <div className="bg-white min-w-lg mx-auto rounded-lg shadow-lg w-full items-center justify-center">
      <div className="bg-indigo-300 p-6 rounded-t-lg">
        <h2 className="text-xl font-semibold text-white">
          View Salary for {selectedEmployee.userId.name}
        </h2>
      </div>
      <div className="space-y-4 py-6 px-8">
        <p>
          <strong>Basic Salary:</strong> {empSalary.basicSalary}
        </p>
        <p>
          <strong>Allowances:</strong> {empSalary.allowances}
        </p>
        <p>
          <strong>Deductions:</strong> {empSalary.deductions}
        </p>
        <p>
          <strong>Net Salary:</strong> {empSalary.netSalary}
        </p>
        <p>
          <strong>Pay Date:</strong>{" "}
          {new Date(empSalary.payDate).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-between px-8 py-4">
        <button className="border border-gray-400 bg-gray-100 rounded-lg py-1 px-3 hover:bg-gray-200" onClick={handleEdit}>Edit</button>
        <button className="border border-red-400 bg-red-100 rounded-lg py-1 px-3 hover:bg-red-400 hover:text-white">Delete</button>
      </div>
    </div>
  );
};

export default ViewSalary;
