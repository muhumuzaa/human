import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const AddDepartment = ({ onClose, getDepartmentList }) => {
  const [dep, setDep] = useState({
    dep_name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDep({ ...dep, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formdata", dep);
    console.log("token", localStorage.getItem("token"));
    try {
      const response = await axios.post(
        "http://localhost:3000/api/department/add",
        dep,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        console.log("Successfully added the new department.", response.data);
        onClose();
        getDepartmentList();
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
    onClose();
  };

  return (
    <div className="bg-white w-[26rem] mx-auto rounded-lg p-4">
      <div className="flex justify-between">
        <span className="text-xl font-semibold text-gray-700 mb-6 block">
          Add Department
        </span>
        <div
          onClick={onClose}
          className="p-1 border border-gray-200 hover:bg-gray-200 rounded-full w-6 h-6"
        >
          {" "}
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
            value={dep.dep_name}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            rows="4"
            onChange={handleInputChange}
            value={dep.description}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>

        <div className="flex justify-between">
          <button
            className="hover:bg-gray-700 py-1 px-3 rounded-xl text-gray-800 border border-gray-400 hover:text-slate-50"
            type="button"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 py-1 px-3 rounded-xl text-slate-50"
            type="submit"
          >
            Create Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
