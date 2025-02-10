import { NavLink } from "react-router-dom";
import {
    FaArrowCircleLeft,
    FaHouseUser,
    FaMoneyBillAlt,
  } from "react-icons/fa";
  import {
    FaBuilding,
    FaCamera,
    FaDownload,
    FaKey,
    FaPeopleGroup,
    FaPhone,
    FaUpload,
  } from "react-icons/fa6";
    import { useAuth } from "../../context/AuthContext";
    import { useNavigate } from "react-router-dom";


const EmployeeSidebar = () => {

    const {logout, user} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async() =>{
        logout()
        navigate('/login')
    }
    return (
        <div className="flex flex-col justify-between min-h-screen py-8">
          <div>
            <a href="#" className="font-bold text-gray-700">
              Human Force
            </a>
    
            <div className="mt-16">
              <NavLink
                to={"/employee-dashboard"}
                className={({ isActive }) =>
                  isActive
                    ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                    : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
                }
                end
              >
                <FaHouseUser className="" />
                <span className="">Dashboard</span>
              </NavLink>
    
              <NavLink
                to={`profile/${user._id}`}
                className={({ isActive }) =>
                  isActive
                    ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                    : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
                }
              >
                <FaBuilding className="" />
                <span className="">My Profile</span>
              </NavLink>
    
              <NavLink
                to={"leaves"}
                className={({ isActive }) =>
                  isActive
                    ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                    : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
                }
              >
                <FaPeopleGroup className="" />
                <span className="">Leaves</span>
              </NavLink>
    
              
              <NavLink
                to={"salary"}
                className={({ isActive }) =>
                  isActive
                    ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                    : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
                }
              >
                <FaMoneyBillAlt className="" />
                <span className="">Salary</span>
              </NavLink>
    
             
    
              <div className="flex space-x-2 items-center rounded-lg text-gray-800 text-sm bg-transparent py-3 px-2 mb-2">
                <span className="">User Management</span>
              </div>
    
              <NavLink
                to={"support"}
                className={({ isActive }) =>
                  isActive
                    ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                    : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
                }
              >
                <FaKey className="" />
                <span className="">Security & access</span>
              </NavLink>
              <NavLink
                to={"support"}
                className={({ isActive }) =>
                  isActive
                    ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                    : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
                }
              >
                <FaCamera className="" />
                <span className="">Authentication</span>
              </NavLink>
    
              <NavLink
                to={"support"}
                className={({ isActive }) =>
                  isActive
                    ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                    : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
                }
              >
                <FaUpload className="" />
                <span className="">Import data</span>
              </NavLink>
    
              <NavLink
                to={"support"}
                className={({ isActive }) =>
                  isActive
                    ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                    : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
                }
              >
                <FaDownload className="" />
                <span className="">Export data</span>
              </NavLink>
    
              <NavLink
                to={"support"}
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
          </div>
          <div >
            <NavLink
              to={"/logout"}
              className={({ isActive }) =>
                isActive
                  ? "flex space-x-2 items-center rounded-lg text-white text-sm hover:text-white bg-indigo-600 py-3 px-2 mb-2"
                  : "flex space-x-2 items-center rounded-lg text-gray-700 text-sm hover:text-white hover:bg-indigo-600 py-3 px-2 mb-2"
              }
              onClick={handleLogout}
            >
              <FaArrowCircleLeft className="" />
              <span className="" >Log Out</span>
            </NavLink>
          </div>
        </div>
      );
    };


export default EmployeeSidebar