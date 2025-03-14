import {
  FaArrowUpRightDots,
  FaEarthAfrica,
  FaFileCircleXmark,
  FaPeopleRoof,
  FaWalkieTalkie,

} from "react-icons/fa";
import InfoCard from "./dashboard_elements/InfoCard";
import {
  FaArrowAltCircleRight,
  FaBatteryThreeQuarters,
  FaPage4,
} from "react-icons/fa";
import Bargraph from "./dashboard_elements/Bargraph";
import InfoCardLong from "./dashboard_elements/InfoCardLong";

import {useState, useEffect} from 'react'
import axios from 'axios'


const DashboardSummary = () => {

  const [summary, setSummary] = useState({})
  const [randomEmployee, setRandomEmployee] = useState(null)


   useEffect(() => {
    const fetchSummary = async() =>{
      try{
        const summary = await axios.get('http://localhost:3000/api/summary')
        setSummary(summary.data)
      }catch(error){
        console.log(error.response.data.error)
      }
    }
    fetchSummary()
  }, []);

  //Get employee to show in employee spotlight
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/employee/list"
        );
        if (response.data.success && response.data.employees.length) {
          const randomIndex = Math.floor(Math.random() * response.data.employees.length);
          setRandomEmployee(response.data.employees[randomIndex]);
        }
      } catch (error) {
        console.error(error.response.data.error);
      }
    };
    fetchEmployees();
  }, []);


  
  return (
    <div>
      <div className="flex justify-between rounded-lg border-2 border-white px-4 py-6 bg-slate-50 mt-6 ">
        <InfoCard
          icon={FaPeopleRoof}
          smallTitle={"Total Employees"}
          bigtitle={summary?.employees}
          borderType={"border-r"}
          navigateTo={'/admin-dashboard/employees'}
        />
        <InfoCard
          icon={FaEarthAfrica}
          smallTitle="Total Departments"
          bigtitle={summary?.departments}
          bgColor="bg-green-600"
          iconColor="text-green-400"
          borderType={"border-r"}
        navigateTo='/admin-dashboard/departments'
        />
        <InfoCard
          icon={FaBatteryThreeQuarters}
          smallTitle="Monthly Pay"
          bigtitle={summary.totalSalary}
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
              src={
                randomEmployee?.userId?.image.startsWith("http")
                  ? randomEmployee?.userId?.image
                  : randomEmployee?.userId?.image
                  ? `http://localhost:3000${randomEmployee?.userId?.image}`
                  : "/placeholder.png"
              }
              alt={randomEmployee?.userId?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="z-10">
            <span className="block font-semibold text-gray-200">
              {randomEmployee?.userId?.name}
             
            </span>
            <span className="block text-xs font-semibold text-gray-300">
              {randomEmployee?.department?.dep_name}
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
            bigtitle={summary?.leaveSummary?.appliedFor}
            icon={FaArrowUpRightDots}
            iconColor="text-indigo-700"
            bgColor="bg-indigo-600"
          />
          <InfoCardLong
            smallTitle={"Leaves Approved"}
            bigtitle={summary?.leaveSummary?.approved}
            icon={FaPage4}
            iconColor="text-green-700"
            bgColor="bg-green-600"
          />
        </div>
        <div className="flex justify-between space-x-6 mt-2">
          <InfoCardLong
            smallTitle={"Leaves Pending"}
            bigtitle={summary?.leaveSummary?.pending}
            icon={FaWalkieTalkie}
            iconColor="text-yellow-700"
            bgColor="bg-yellow-600"
          />
          <InfoCardLong
            smallTitle={"Leaves Rejected"}
            bigtitle={summary?.leaveSummary?.rejected}
            icon={FaFileCircleXmark}
            iconColor="text-red-700"
            bgColor="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
