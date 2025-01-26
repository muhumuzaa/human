import { useEffect, useState } from "react";
import { useDepartments } from "../../context/DepartmentContext";
import { FaXmark } from "react-icons/fa6";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

const EmployeeDetails = ({ onCancel, editEmployee, selectedEmployee, deleteEmployee }) => {
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
          {selectedEmployee.userId.name}
        </h2>
        <p className="text-gray-700">{selectedEmployee.userId?.email}</p>
        <p className="text-gray-700">{selectedEmployee.department.dep_name}</p>
        <p className="text-gray-700">
          {selectedEmployee.userId?.tel || "not tel"}
        </p>
        <div className="flex justify-between mt-10 space-x-4">
          <button className="p-1 border border-gray-400 text-gray-700 hover:bg-gray-400 hover:text-white rounded-xl w-full" onClick={onCancel}>
            Cancel
          </button>
          <button className="p-1 border bg-indigo-500 text-white hover:text-white rounded-xl w-full" onClick={() =>editEmployee(selectedEmployee)}>
            Edit
          </button>
          <button className="p-1 border border-red-500 text-red-700 hover:bg-red-400 hover:text-white rounded-xl w-full" onClick={deleteEmployee}>
            Delete
          </button>
        </div>
      </div>
      </div>
      <div className="p-1 flex-1 rounded-r-xl object-cover">
        <img
          src={selectedEmployee.userId?.image}
          alt={selectedEmployee.userId?.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default EmployeeDetails;
