import {
  FaArrowCircleLeft,
  FaHouseUser,
  FaMoneyBillAlt,
  FaWalking,
} from "react-icons/fa";
import { FaBuilding, FaPeopleGroup, FaPhone } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen py-8">
      <a href="#" className="font-bold text-gray-700">
        Human Force
      </a>

      <div className="mt-8">
        <NavLink
          to={"/admin-dashboard"}
          className={({ isActive }) =>
            isActive
              ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
              : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
          }
        >
          <FaHouseUser className="" />
          <span className="">Dashboard</span>
        </NavLink>

        <NavLink to={'/employee-dashboard'}
          className={({ isActive }) =>
            isActive
              ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
              : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
          }
        >
          <FaPeopleGroup className="" />
          <span className="">Employees</span>
        </NavLink>
        <NavLink to={'/departments'}
          className={({ isActive }) =>
            isActive
              ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
              : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
          }
        >
          <FaBuilding className="" />
          <span className="">Departments</span>
        </NavLink>
        <NavLink to={'/leaves'}
          className={({ isActive }) =>
            isActive
              ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
              : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
          }
        >
          <FaWalking className="" />
          <span className="">Leaves</span>
        </NavLink>
        <NavLink to={'/salary'}
          className={({ isActive }) =>
            isActive
              ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
              : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
          }
        >
          <FaMoneyBillAlt className="" />
          <span className="">Salary</span>
        </NavLink>
        <NavLink to={'/support'}
          className={({ isActive }) =>
            isActive
              ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
              : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
          }
        >
          <FaPhone className="" />
          <span className="">Support</span>
        </NavLink>
      </div>
      <div>
        <NavLink to={'/logout'}
          className={({ isActive }) =>
            isActive
              ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
              : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
          }
        >
          <FaArrowCircleLeft className="" />
          <span className="">Log Out</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
