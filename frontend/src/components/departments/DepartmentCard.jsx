const DepartmentCard = ({ department, editDep, deleteDep }) => {
  return (
    <div className="border-b border-gray-200 py-2 flex justify-between">
      <div className="">
        <span className="font-semibold block">{department.dep_name}</span>
        <span className="block text-gray-700 text-xs">{department.description}</span>
        <span className="block text-gray-700 text-sm">
          {new Date(department.createAt).toLocaleDateString()}
        </span>

        <div className="space-x-4">
          <span className="text-sm text-gray-700">Lead:</span>
          <a href="#" className="text-sm text-green-700 hover:font-semibold">{department.lead}</a>
        </div>
        <div className="space-x-4">
          <span className="text-sm text-gray-700">Employees:</span>
          <span className="text-sm text-gray-700">{department.employees}</span>
        </div>
      </div>

      <div className="space-x-6">
        <button
          className="border border-gray-400 text-gray-800 py-1 px-2 rounded-lg hover:bg-gray-200 text-sm"
          onClick={() => editDep(department)}
        >
          Edit
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded-lg text-sm"
          onClick={deleteDep}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
