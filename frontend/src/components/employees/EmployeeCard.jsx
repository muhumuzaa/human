const EmployeeCard = ({employee}) => {
  return (
    <div className="border-b border-gray-200 py-2 grid grid-cols-10 items-center gap-4 w-full">
      <div className="col-span-4 space-x-4 flex">
        <div className="rounded-full w-12 h-12 bg-gray-400 overflow-hidden">
            <img src={employee.image?.startsWith('http')? employee.image : `http://localhost:3000${employee.image}` } alt="" className="w-full object-cover h-full"/>
        </div>
        <div className="flex flex-col">
          <span className="block text-gray-700 font-semibold">{employee.emp_name}</span>
          <span className="block text-gray-700 text-xs">{employee.email}</span>
        </div>
      </div>

      <div className="col-span-3 rounded-lg border border-indigo-600 bg-indigo-100 text-indigo-600 text-xs px-2 py-1">
        {employee.department.dep_name}
      </div>

      <span className="col-span-1 text-sm text-gray-700">{new Date(employee.createdAt).toLocaleDateString()}</span>
      <div className="col-span-2 space-x-6">
        <button className="text-xs border border-green-500 rounded-lg px-2 py-1 hover:bg-gray-200" onClick={() =>editEmployee(employee._id)}>Edit</button>
        <button className="text-xs border border-red-500 rounded-lg px-2 py-1 hover:bg-gray-200">Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
