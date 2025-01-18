import { useState } from "react";
import DepartmentForm from "./DepartmentForm";

import DepartmentCard from "./DepartmentCard";
import { useDepartments } from "../../context/DepartmentContext";

const DepartmentList = () => {
  const [showDepForm, setShowDepForm] = useState(false);
  const [editDept, setEditDept] = useState(null);

  const {
    depList,
    error,
    loading,
    fetchDepartments,
    deleteDepartment,
    addOrEditDepartment,
  } = useDepartments();

  const handleFormOpen = (deparment = null) => {
    setEditDept(deparment);
    setShowDepForm(true);
  };

  const handleFormClose = () => {
    setEditDept(null);
    setShowDepForm(false);
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative shadow rounded-lg">
      {/* Main Content */}
      <div className={`${showDepForm ? "blur-sm pointer-events-none" : ""}`}>
        <h3>Department List</h3>
        <div className="flex justify-between mb-2">
          <input
            placeholder="Search by Department Name"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2"
            onClick={() =>handleFormOpen()}
          >
            Add Department
          </button>
        </div>
        <div className="mb-4 bg-white rounded-lg p-4">
          {depList.map((dep) => (
            <DepartmentCard
              key={dep._id}
              department={dep}
              editDep={() => handleFormOpen(dep)}
              deleteDep={() => deleteDepartment(dep._id)}
            />
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {showDepForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleFormClose} // Close modal if background is clicked
          ></div>

          {/* Modal */}
          <div className="relative z-10">
            <DepartmentForm
              onClose={handleFormClose}
              department={editDept}
              onAddOrEdit={ addOrEditDepartment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
