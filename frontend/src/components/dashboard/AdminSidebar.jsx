import {
  FaHouseUser,
  FaMoneyBill,
  FaMoneyBillAlt,
  FaWalking,
} from "react-icons/fa";
import {
  FaBuilding,
  FaPeopleGroup,
  FaPhone,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <a href="#" className="font-bold">
        Human Force
      </a>

      <div className="mt-8">
        <NavLink className="flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-2 px-2 mb-2">
          <FaHouseUser className="" />
          <span className="">Dashboard</span>
        </NavLink>
        <NavLink className="flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-2 px-2 mb-2">
          <FaPeopleGroup className="" />
          <span className="">Employees</span>
        </NavLink>
        <NavLink className="flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-2 px-2 mb-2">
          <FaBuilding className="" />
          <span className="">Departments</span>
        </NavLink>
        <NavLink className="flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-2 px-2 mb-2">
          <FaWalking className="" />
          <span className="">Leaves</span>
        </NavLink>
        <NavLink className="flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-2 px-2 mb-2">
          <FaMoneyBillAlt className="" />
          <span className="">Salary</span>
        </NavLink>
        <NavLink className="flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-2 px-2 mb-2">
          <FaPhone className="" />
          <span className="">Support</span>
        </NavLink>
      </div>
      <div>
        <NavLink className="flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-2 px-2 mb-2">
          <FaPhone className="" />
          <span className="">Log Out</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
