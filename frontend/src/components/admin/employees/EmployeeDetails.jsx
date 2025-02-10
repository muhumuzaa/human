import { useEffect, useState } from "react";
import { useDepartments } from "../../../context/DepartmentContext";
import { FaXmark } from "react-icons/fa6";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const EmployeeDetails = ({
  onCancel,
  editEmployee,

  deleteEmployee,
}) => {
  const [employee, setEmployee] = useState(null);
  const { userId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!userId) return;
      console.log(userId)
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.employee) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert("Error fetching employee- ", error);
      }
    };
    fetchEmployee();
  }, [userId]);
  

  if (!employee) {
    return <div>Loading...</div>;
  }
  const canManage = user?.role === "admin" || user?._id === employee.userId._id;

  return (
    <div className="bg-white rounded-lg flex p-2 w-[40rem]">
      <div
        onClick={onCancel}
        className="p-1 border border-gray-300 hover:border-indigo-600 hover:bg-gray-200 rounded-full w-6 h-6 cursor-pointer"
      >
        <FaXmark className="text-gray-400 hover:text-indigo-700" />
      </div>
      <div className="p-4">
        <div className="flex flex-col h-full justify-center">
          <h2 className="text-2xl text-gray-700 font-semibold">
            {employee.userId.name}
          </h2>
 
          <p className="text-gray-700">{employee?.userId?.email || 'no email'}</p>
          <p className="text-gray-700">{employee.department.dep_name}</p>
          <p className="text-gray-700">{employee.userId?.tel || "not tel"}</p>
          {canManage && (
            <div className="flex justify-between mt-10 space-x-4">
              <button
                className="p-1 border border-gray-400 text-gray-700 hover:bg-gray-400 hover:text-white rounded-xl w-full"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="p-1 border bg-indigo-500 text-white hover:text-white rounded-xl w-full"
                onClick={() => editEmployee(employee)}
              >
                Edit
              </button>
              <button
                className="p-1 border border-red-500 text-red-700 hover:bg-red-400 hover:text-white rounded-xl w-full"
                onClick={deleteEmployee}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-1 flex-1 rounded-r-xl w-[400px] h-[400px] object-cover">
        <img
          src={
            employee?.userId?.image?.startsWith("http")
              ? employee?.userId?.image
              : employee?.userId?.image
              ? `http://localhost:3000${employee.userId.image}`
              : "placeholder.png"
          }
          alt={employee.userId?.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default EmployeeDetails;
