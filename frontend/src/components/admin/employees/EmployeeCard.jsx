import axios from "axios";
import { useState } from "react";


const EmployeeCard = ({employee, editEmployee, deleteEmployee, viewDetails, onViewSalary, onViewEmployeeLeaves, }) => {

  

  return (
    <div className="border-b border-gray-200 py-2 grid grid-cols-10 items-center gap-4 w-full ">
      <div className="col-span-3 space-x-4 flex">
        <div className="rounded-full w-12 h-12 bg-gray-400 overflow-hidden">
        <img
  src={
    employee.userId?.image?.startsWith("http")
      ? employee.userId.image
      : employee.userId?.image
      ? `http://localhost:3000${employee.userId.image}`
      : "/placeholder.png"
  }
  alt={employee.userId?.name || "Employee"}
  className="w-full object-cover h-full"
/>
        </div>
        <div className="flex flex-col">
          <span className="block text-gray-700 font-semibold cursor-pointer hover:text-indigo-500" onClick={() =>viewDetails(employee)}>{employee.userId?.name || 'No name'}</span>
          <span className="block text-gray-700 text-xs">{employee.userId?.email ||'No email'}</span>
        </div>
      </div>

      <div className="col-span-2 rounded-lg bg-indigo-100 text-indigo-600 text-xs px-2 py-1 truncate">
        {employee.department?.dep_name || 'No dept'}
      </div>

      <span className="col-span-1 text-sm text-gray-700">{new Date(employee.createdAt).toLocaleDateString()}</span>
      <div className=" space-x-2 flex justify-between">
        <button className="text-xs border border-gray-500 bg-gray-200 rounded-lg px-2 py-1 hover:bg-gray-200" onClick={() =>editEmployee(employee)}>Edit</button>
        <button className="text-xs border border-green-500 rounded-lg px-2 py-1  hover:bg-green-400" onClick={() =>onViewSalary(employee)}>Salary</button>
        <button className="text-xs border bg-red-100 border-red-500 rounded-lg px-2 py-1 hover:bg-red-400" onClick={() =>deleteEmployee(employee._id)}>Delete</button>
        
        <button className="text-xs border border-red-500 rounded-lg px-2 py-1 hover:bg-gray-200" onClick={() =>onViewEmployeeLeaves(employee._id)}>Leaves</button>
        
      </div>
    </div>
  );
};

export default EmployeeCard;
