const DepartmentCard = ({department, editDep, deleteDep}) => {
  return (
    <div className="border-b border-gray-200 py-2 flex justify-between">
      <div className="">
        <span className="font-semibold block">{department.dep_name}</span>
        <span className="block">{department.description}</span>
        <span className="block">{new Date(department.createdAt).toLocaleString()}</span>
      </div>

      <div className="space-x-2">
        <button className="bg-indigo-600 text-white py-1 px-2 rounded-lg" onClick={()=>editDep(department)}>
          Edit
        </button>
        <button className="bg-red-500 text-white py-1 px-2 rounded-lg" onClick={() =>deleteDep(department._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
