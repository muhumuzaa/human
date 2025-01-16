import { useEffect, useState } from "react";
import AddDepartment from "./AddDepartment";
import axios from "axios";

const DepartmentList = () => {
  const [showDepForm, setShowDepForm] = useState(false);

  const handleFormOpen = () => setShowDepForm(true);
  const handleFormClose = () => setShowDepForm(false);

  const [depList, setDepList] = useState([]);

  const getDepartmentList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/department/list"
      );
      if (response.data.success) {
        setDepList(response.data.departments);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        console.log("Server error");
      }
    }
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  return (
    <div className="relative">
      {/* Main Content */}
      <div className={`${showDepForm ? "blur-sm pointer-events-none" : ""}`}>
        <h3>Department List</h3>
        <div className="flex justify-between">
          <input
            placeholder="Search by Department Name"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-xl py-1 px-2"
            onClick={handleFormOpen}
          >
            Add Department
          </button>
        </div>

        <ul className="mb-4">
          {depList.map((dep) => (
            <li key={dep._id} className="border-b border-gray-200 py-2">
              {dep.dep_name} - {dep.description}
            </li>
          ))}
        </ul>
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
            <AddDepartment
              onClose={handleFormClose}
              onRefresh={getDepartmentList}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
