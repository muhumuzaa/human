

const EmployeeCard = ({
  employee,
  editEmployee,
  deleteEmployee,
  viewDetails,
  onViewSalary,
  onViewEmployeeLeaves,

}) => {
  return (
    <div className="border-b border-gray-200 py-2 grid grid-cols-[3fr_2fr_2fr_3fr] items-center gap-2 w-full"> {/* Use fr units for grid */}
  <div className="flex items-center gap-2"> 
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
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex flex-col">
      <span
        className="text-gray-700 font-semibold cursor-pointer hover:text-indigo-500"
        onClick={() => viewDetails(employee)}
      >
        {employee.userId?.name || "No name"}
      </span>
      <span className="text-gray-700 text-xs">
        {employee.userId?.email || "No email"}
      </span>
    </div>
  </div>

  <div className="rounded-lg bg-indigo-100 text-indigo-600 text-xs px-2 py-1 truncate">
    {employee.department?.dep_name || "No dept"}
  </div>

  <span className="text-sm text-gray-700">
    {new Date(employee.createdAt).toLocaleDateString()}
  </span>

  <div className="flex space-x-2 justify-end"> 
    <button
      className="text-xs border border-gray-500 bg-gray-200 rounded-lg px-2 py-1 hover:bg-gray-300" 
      onClick={() => editEmployee(employee)}
    >
      Edit
    </button>
    <button
      className="text-xs border border-green-500 rounded-lg px-2 py-1 hover:bg-green-600 text-gray-600 hover:text-white" 
      onClick={() => onViewSalary(employee)}
    >
      Salary
    </button>
    <button
      className="text-xs border border-red-500 rounded-lg px-2 py-1 hover:bg-red-600 text-red-600 hover:text-white" 
      onClick={() => deleteEmployee(employee._id)}
    >
      Delete
    </button>
    <button
      className="text-xs border border-red-500 rounded-lg px-2 py-1 hover:bg-gray-300"
      onClick={() => onViewEmployeeLeaves(employee)}
    >
      Leaves
    </button>
  </div>
</div>
  );
};

export default EmployeeCard;
