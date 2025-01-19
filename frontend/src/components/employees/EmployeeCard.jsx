const EmployeeCard = ({employee}) => {
  return (
    <div className="border-b border-gray-200 py-2 flex justify-between">
      <div className="space-x-4 flex">
        <div className="rounded-full w-12 h-12 bg-gray-400"></div>
        <div className="flex flex-col">
          <span className="block text-gray-700 font-semibold">{employee.emp_name}</span>
          <span className="block text-gray-700 text-xs">{employee.email}</span>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-600 bg-indigo-100 text-indigo-600 text-xs items-center flex">
        {employee.department}
      </div>

      <span className="text-sm text-gray-700">{new Date(employee.createdAt).toLocaleDateString()}</span>
      <div className="space-x-6">
        <button className="text-xs border border-green-500 rounded-lg px-2 py-1 hover:bg-gray-200">Edit</button>
        <button className="text-xs border border-red-500 rounded-lg px-2 py-1 hover:bg-gray-200">Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
