import { useEffect, useState } from "react";
import { useDepartments } from "../../context/DepartmentContext";
import { FaXmark } from "react-icons/fa6";

const EmployeeForm = ({ onSave, onCancel, editingEmployee }) => {
  const [employee, setEmployee] = useState({
    emp_name: "",
    email: "",
    tel: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee({
        emp_name: editingEmployee.emp_name || "",
        email: editingEmployee.email || "",
        tel: editingEmployee.tel || "",
        department: editingEmployee.department || "",
        salary: editingEmployee.salary || "",
      });
      setImageFile(null); //set to null on editing

    } else {
      setEmployee({
        emp_name: "",
        email: "",
        tel: "",
        department: "",
        salary: "",
      });
      setImageFile(null)
    }
  }, [editingEmployee]);

  const { depList } = useDepartments();

  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(employee).forEach((key) => {
      formData.append(key, employee[key]);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSave(formData);
  };

  return (
    <div className="bg-white w-[26rem] mx-auto rounded-lg p-4 shadow-lg">
      <div className="flex justify-between">
        <span className="text-xl font-semibold text-gray-700 mb-6 block">
          {editingEmployee ? "Update Employee" : "Add Employee"}
        </span>
        <div
          onClick={onCancel}
          className="p-1 border border-gray-200 hover:bg-gray-200 rounded-full w-6 h-6 cursor-pointer"
        >
          <FaXmark className="text-gray-300 hover:text-gray-500" />
        </div>
      </div>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label htmlFor="emp_name" className="block">
            Name
          </label>
          <input
            type="text"
            name="emp_name"
            onChange={handleInputChange}
            value={employee.emp_name}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            value={employee.email}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tel" className="block">
            Telephone
          </label>
          <input
            type="phone"
            name="tel"
            onChange={handleInputChange}
            value={employee.tel}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="pr-4">
            Department
          </label>
          <select
            onChange={handleInputChange}
            value={employee.department}
            name="department"
            className="border border-gray-300 rounded-lg px-2"
          >
            <option value="">Select</option>
            {depList.length > 0 ? (
              depList.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))
            ) : (
              <option disabled>No Departments Available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="salary" className="block">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            onChange={handleInputChange}
            value={employee.salary}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="hover:bg-gray-700 py-1 px-3 rounded-xl text-gray-800 border border-gray-400 hover:text-slate-50"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 py-1 px-3 rounded-xl text-slate-50"
          >
            {editingEmployee ? "Update Employee" : "Create Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
