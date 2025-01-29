import axios from "axios";
import { useEffect, useState } from "react";

const ViewSalary = ({ selectedEmployee }) => {
  const [empSalary, setEmpSalary] = useState(null);

  useEffect(() => {
    const fetchEmployeeSalary = async (id) => {
        console.log('sending id: ', id)
      try {
        const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setEmpSalary(response.data.salary);
        }
      } catch (error) {
        alert(error.response?.data?.error || error.message);
      }
    };

    // Only fetch if we have a valid employee with an _id
    if (selectedEmployee && selectedEmployee._id) {
      fetchEmployeeSalary(selectedEmployee._id);
    }
  }, [selectedEmployee]);

  if (!selectedEmployee) {
    return <div>No employee data...</div>
  }

  return (
    <div className="w-full bg-white p-4 rounded-md">
      <h3 className="font-semibold text-lg mb-4">
        Salary for {selectedEmployee.userId?.name}
      </h3>

      {empSalary ? (
        <div className="space-y-2">
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
            <strong>Pay Date:</strong> {new Date(empSalary.payDate).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>No salary data found for this employee.</p>
      )}
    </div>
  );
};

export default ViewSalary;
