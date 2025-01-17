const DepartmentCard = ({department, editDep, deleteDep}) => {
  return (
    <div className="border-b border-gray-200 py-2 flex justify-between">
      <div className="">
        <span className="font-semibold block">{department.dep_name}</span>
        <span className="block">{department.description}</span>
        <span className="block">{new Date(department.createAt).toLocaleDateString()}</span>
      </div>

      <div className="space-x-6">
        <button className="border border-gray-400 text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-200" onClick={()=>editDep(department)}>
          Edit
        </button>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded-lg" onClick={() =>deleteDep(department._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
