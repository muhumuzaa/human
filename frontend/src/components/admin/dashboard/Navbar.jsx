import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { useAuth } from "../../../context/AuthContext";
import { useDepartments } from "../../../context/DepartmentContext";
import { useEffect, useState } from "react";
import axios from "axios";


const Navbar = () => {
  const { user } = useAuth();
  const { depList } = useDepartments();
  const [employee, setEmployee] = useState(null);

  useEffect(() =>{
    const fetchEmployee = async () => {
      try {
        if (!user ||!user._id) return;
        const response = await axios.get(
          `http://localhost:3000/api/employee/user/${user._id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if(response.data.success && response.data.employee){
          setEmployee(response.data.employee)
        }
      } catch (error) {
        console.error("Error fetching employee: ", error);
      }
    };
    fetchEmployee();
  
  }, [user])
  
  const department = depList.find((dep) => dep._id === employee?.department?._id);
  return (
    <div className="flex justify-between">
      <div className="p-4 flex items-center space-x-4">
        <span>
          <FaSearch className="text-gray-400 text-sm" />
        </span>
        <input
          placeholder="Type to search"
          className="text-sm rounded-md py-1 px-3 focus:outline-none focus:ring-1 focus:border-gray-600 bg-transparent"
        />
      </div>
      <div className="flex space-x-8 items-center">
        <span className="relative">
          <FaBell className="text-xl text-gray-300" />
          <span className="absolute -right-1 -top-1 bg-indigo-600 rounded-full text-white text-xs w-4 h-4 flex items-center justify-center">
            3
          </span>
        </span>
        <div className="flex space-x-2 items-center">
          <div className="rounded-full w-8 h-8 bg-gray-400 overflow-clip">
            <img
              src={
                user?.image?.startsWith("http")
                  ? user?.image
                  : user?.image
                  ? `http://localhost:3000${user.image}`
                  : "/placeholder.png"
              }
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="flex flex-col">
            <span>{user?.name}</span>
            <span className="text-xs text-gray-600 -mt-1">
              {department ? department.dep_name : "No Department"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
