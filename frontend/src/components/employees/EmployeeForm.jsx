import { useEffect, useState } from "react";
import { useDepartments } from "../../context/DepartmentContext";
import { FaXmark } from "react-icons/fa6";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

const EmployeeForm = ({ onSave, onCancel, editingEmployee, deleteEmployee }) => {
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
        department: editingEmployee.department._id || "",
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
      setImageFile(null);
    }
  }, [editingEmployee]);

  const { depList } = useDepartments();

  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setEmployee({ ...employee, department: value });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
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
    <div className="bg-white w-[32rem] mx-auto rounded-lg shadow-lg">
      <div className="flex justify-between bg-indigo-200 p-6 rounded-t-lg relative">
        <span className="text-xl font-semibold text-gray-700 mb-6 block">
          {editingEmployee ? "Update Employee" : "Add Employee"}
        </span>
        <div
          onClick={onCancel}
          className="p-1 border border-gray-100 hover:bg-gray-200 rounded-full w-6 h-6 cursor-pointer"
        >
          <FaXmark className="text-gray-100 hover:text-indigo-700" />
        </div>

        <div className="rounded-full w-20 h-20 absolute border-2 border-white bg-gray-500 -bottom-12 left-2 overflow-clip shadow-lg shadow-gray-300">
          <img
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : editingEmployee?.image?.startsWith("http")
                ? editingEmployee.image
                : editingEmployee?.image
                ? `http://localhost:3000${editingEmployee.image}`
                : "/placeholder.png"
            }
            alt={employee.emp_name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="mt-10 p-4">
        {editingEmployee&&(
          <div>
             <h3 className="text-gray-800 font-semibold text-xl">
          {editingEmployee.emp_name}
        </h3>
        <p className="text-gray-700 text-sm w-full">{editingEmployee.email}</p>
          </div>
        ) }
       

        <form onSubmit={handleSave} className=" mt-10">
          <div className="mb-6 flex w-full space-x-4 items-center">
            <label htmlFor="emp_name " className=" text-gray-600 text-sm flex-shrink-0 min-w-max">
              Full Name
            </label>
            <input
              type="text"
              name="emp_name"
              onChange={handleInputChange}
              value={employee.emp_name}
              className="p-2 border border-gray-200 rounded-xl flex-grow"
            />
          </div>

          <div className="mb-6 flex w-full space-x-4 items-center">
            <label htmlFor="email" className="block text-gray-600 text-sm flex-shrink-0 min-w-max">
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={handleInputChange}
              value={employee.email}
              className="p-2 border border-gray-200 rounded-xl w-full flex-grow"
            />
          </div>

          <div className="mb-6 flex space-x-4 w-full items-center">
            <label htmlFor="tel" className="block text-gray-600 text-sm flex-shrink-0 min-w-max">
              Telephone
            </label>
            <input
              type="phone"
              name="tel"
              onChange={handleInputChange}
              value={employee.tel}
              className="p-2 border border-gray-200 rounded-xl w-full flex-grow"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
          <div className="">
            <label htmlFor="department" className=" text-gray-600 text-sm">
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
          
            <div className="">
              <label htmlFor="salary" className="block text-gray-600 text-sm">
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
            
          </div>
          <div className="mb-4">
              <label htmlFor="image" className="block text-gray-600 text-sm">
                Upload Image
                <div className="group">
                  {/* Image Preview */}
                  {/* File Input */}
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center space-x-4 cursor-pointer">
                    <div className="rounded-full w-16 h-16 bg-gray-200 overflow-hidden border">
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile) // Preview selected file
                            : editingEmployee?.image?.startsWith("http")
                            ? editingEmployee.image // Use full URL for existing image
                            : editingEmployee?.image
                            ? `http://localhost:3000${editingEmployee.image}` // Use backend-hosted image
                            : `/placeholder.png` // Placeholder for no image
                        }
                        alt={employee.emp_name || "Placeholder"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="mt-2 text-indigo-500 text-sm group-hover:underline">
                      {imageFile || editingEmployee?.image
                        ? "Change Image"
                        : "Add Image"}
                    </span>
                  </div>
                </div>
              </label>
            </div>
          <div className="flex justify-between my-6 ">
          {editingEmployee && <button
              type="button"
              className="hover:bg-red-400 bg-red-50 py-1 px-3 rounded-xl text-red-500 border border-red-100 hover:text-white text-sm flex items-center space-x-2 "
           
              onClick={() =>deleteEmployee(editingEmployee._id)}
            >
              <FaTrashAlt />
              <span>Delete Employee</span>
            </button>}
          <div className="flex space-x-4">
            <button
              type="button"
              className="hover:bg-gray-700 py-1 px-3 rounded-xl text-gray-800 border border-gray-400 hover:text-slate-50 text-sm"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 py-1 px-3 rounded-xl text-slate-50 text-sm" 
            >
              {editingEmployee ? "Update Employee" : "Create Employee"}
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
