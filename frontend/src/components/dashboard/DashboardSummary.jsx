import {
  FaArrowUpRightDots,
  FaEarthAfrica,
  FaFileCircleXmark,
  FaPeopleRoof,
  FaWalkieTalkie,

} from "react-icons/fa6";
import InfoCard from "./dashboard_elements/InfoCard";
import {
  FaArrowAltCircleRight,
  FaBatteryThreeQuarters,
  FaPage4,
} from "react-icons/fa";
import Bargraph from "./dashboard_elements/Bargraph";
import InfoCardLong from "./dashboard_elements/InfoCardLong";
import { useDepartments } from "../../context/DepartmentContext";



const Dashboard = () => {

  const {depList} = useDepartments()
  
  return (
    <div>
      <div className="flex justify-between rounded-lg border-2 border-white px-4 py-6 bg-slate-50 mt-6 ">
        <InfoCard
          icon={FaPeopleRoof}
          smallTitle={"Total Employees"}
          bigtitle="189"
          borderType={"border-r"}
          navigateTo={'/admin-dashboard/departments'}
        />
        <InfoCard
          icon={FaEarthAfrica}
          smallTitle="Total Departments"
          bigtitle={depList.length}
          bgColor="bg-green-600"
          iconColor="text-green-400"
          borderType={"border-r"}
        navigateTo='/admin-dashboard/employees'
        />
        <InfoCard
          icon={FaBatteryThreeQuarters}
          smallTitle="Monthly Pay"
          bigtitle="$454k"
          bgColor="bg-indigo-500"
          iconColor="text-indigo-600"
        />
      </div>
      <div className="flex justify-between space-x-4 w-full ">
        <div className="rounded-lg border-2 border-white px-4 py-6  mt-6 bg-slate-50">
          <span className="text-gray-600">Monthly Revenue</span>
          <Bargraph />
        </div>
        <div className="relative rounded-lg px-4 py-6 bg-indigo-600 mt-6 flex-1 items-center flex flex-col overflow-clip">
          {/* Decorative Shape 1 */}
          <div
            className="absolute top-0 -left-10 w-32 h-32 bg-indigo-800 rounded-full 
                      mix-blend-multiply opacity-30 pointer-events-none"
          />
          {/* Decorative Shape 2 */}
          <div
            className="absolute -bottom-1 -right-10 w-40 h-40 bg-blue-800 rounded-xl 
                      mix-blend-multiply opacity-30 pointer-events-none"
          />
          <div
            className="absolute -bottom-6 -right-14 w-40 h-40 bg-blue-800 rounded-xl 
                      mix-blend-multiply opacity-60 pointer-events-none z-5"
          />
          <span className="font-semibold text-sm text-white">
            Employee Spotlight
          </span>
          <div className="rounded-full w-full h-32 bg-gray-400 overflow-clip shadow-lg my-4 z-10">
            <img
              src="man.jpg"
              alt="man"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="z-10">
            <span className="block font-semibold text-gray-200">
              Aaron Schenieder
            </span>
            <span className="block text-xs font-semibold text-gray-300">
              Marketing
            </span>
            <div className="flex space-x-2 items-center">
              <span className="text-gray-300 text-xs">Total Sales:</span>
              <span className="font-bold text-gray-100 ">374k</span>
              <FaArrowUpRightDots className="text-gray-100" />
            </div>
            <div className="mt-2">
              <button
                type="button"
                className="inline-flex items-center bg-slate-100 rounded-lg shadow border border-slate-50 
             py-1 px-2 text-sm font-semibold text-indigo-500 
             hover:bg-slate-200 hover:shadow-md transition"
              >
                <span className="mr-1">View Stats</span>
                <FaArrowAltCircleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="block text-xl text-gray-700 font-semibold py-4">
          Leave Details
        </span>
        <div className="flex justify-between space-x-6">
          <InfoCardLong
            smallTitle={"Leaves Applied"}
            bigtitle={"78"}
            icon={FaArrowUpRightDots}
            iconColor="text-indigo-700"
            bgColor="bg-indigo-600"
          />
          <InfoCardLong
            smallTitle={"Leaves Approved"}
            bigtitle={"24"}
            icon={FaPage4}
            iconColor="text-green-700"
            bgColor="bg-green-600"
          />
        </div>
        <div className="flex justify-between space-x-6 mt-2">
          <InfoCardLong
            smallTitle={"Leaves Pending"}
            bigtitle={"78"}
            icon={FaWalkieTalkie}
            iconColor="text-yellow-700"
            bgColor="bg-yellow-600"
          />
          <InfoCardLong
            smallTitle={"Leaves Rejected"}
            bigtitle={"24"}
            icon={FaFileCircleXmark}
            iconColor="text-red-700"
            bgColor="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
