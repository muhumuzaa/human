import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <div className="p-4 flex items-center space-x-4">
        <span>
          <FaSearch className="text-gray-400 text-sm" />
        </span>
        <input placeholder="Type to search" className="text-sm rounded-md py-1 px-3 focus:outline-none focus:ring-1 focus:border-gray-600 bg-transparent"/>
      </div>
      <div className="flex space-x-8 items-center">
        <span className="relative">
          <FaBell className="text-xl text-gray-300"/>
          <span className="absolute -right-1 -top-1 bg-indigo-600 rounded-full text-white text-xs w-4 h-4 flex items-center justify-center">3</span>
        </span>
        <div className="flex space-x-2 items-center">
          <div className="rounded-full w-8 h-8 bg-gray-400 overflow-clip">
            <img src="man.jpg" alt="man" className="w-full h-full object-cover"/>
          </div>
          <span className="flex flex-col">
            <span>Ambroze Muhumuza</span>
            <span className="text-xs text-gray-600 -mt-1">Engineer</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
