import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewSalary = ({ selectedEmployee, onCancel, empSalary }) => {
  const navigate = useNavigate();


  const handleEdit = () => {
    {
      navigate("/admin-dashboard/salary", { state: { salary: empSalary } });
    }
  };

  const handleDelete = async (id) => {
    console.log("id sent from front end is: ", id);
    const confirmDelete = window.confirm('You are about to delete this salary record')
    if(!confirmDelete) return;
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/salary/delete/${id}`,
        {
            params: {id},
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        onCancel();
      }
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    }
  };


  if(!selectedEmployee){
    return <div>No employee data</div>
  }

  if (!empSalary || !empSalary._id) {
    return (
      <div className="bg-white min-w-lg mx-auto rounded-lg shadow-lg p-6">
        <p>This employee has no salary data. First add their data:</p>
        <button
          onClick={() => navigate("/admin-dashboard/salary")}
          className="mt-4 bg-indigo-500 text-white py-1 px-3 rounded hover:bg-indigo-600"
        >
          Add Salary Data
        </button>
      </div>
    );
  }

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
        <button
          className="border border-gray-400 bg-gray-100 rounded-lg py-1 px-3 hover:bg-gray-200"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="border border-red-400 bg-red-100 rounded-lg py-1 px-3 hover:bg-red-400 hover:text-white"
          onClick={() => handleDelete(empSalary._id)}
        >
          Delete
        </button>
      </div>
    </div>
   
   
  );
};

export default ViewSalary;
