import axios from "axios";
import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa";

const DepartmentForm = ({ onClose, onAddOrEdit, department }) => {
  const [dep, setDep] = useState({
    dep_name: "",
    description: "",
    lead: "",
    employees: ""
  });

  // If 'department' is provided (edit mode), pre-fill form with its data.
  // Otherwise (add mode), reset to an empty department object.
  useEffect(() => {
    if (department) {
        
      setDep({
        dep_name: department.dep_name || "",
        description: department.description || "",
        lead: department.lead || "",
        employees: department.employees || "",
        _id: department._id || ""
      });
    } else {
      setDep({ dep_name: "", description: "", lead: "", employees: "" });
    }
  }, [department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDep((prevDep) => ({ ...prevDep, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dep.dep_name || !dep.description) {
      alert("Department Name and Description are required.");
      return;
    }

    console.log("Form data to be submitted:", dep);
    onAddOrEdit(dep)
    onClose()

  };

  return (
    <div className="bg-white w-[26rem] mx-auto rounded-lg p-4">
      <div className="flex justify-between">
        <span className="text-xl font-semibold text-gray-700 mb-6 block">
          {department ? "Edit Department" : "Add Department"}
        </span>
        <div
          onClick={onClose}
          className="p-1 border border-gray-200 hover:bg-gray-200 rounded-full w-6 h-6 cursor-pointer"
        >
          <FaXmark className="text-gray-300 hover:text-gray-500" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="dep_name" className="block">
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            onChange={handleInputChange}
            value={dep.dep_name || ""}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            onChange={handleInputChange}
            value={dep.description || ""}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lead" className="block">
            Department Lead
          </label>
          <input
            type="text"
            name="lead"
            onChange={handleInputChange}
            value={dep.lead || ""}
            placeholder="optional"
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="hover:bg-gray-700 py-1 px-3 rounded-xl text-gray-800 border border-gray-400 hover:text-slate-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 py-1 px-3 rounded-xl text-slate-50"
          >
            {department ? "Update Department" : "Create Department"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
