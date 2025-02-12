import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
import { useAuth } from "../../../context/AuthContext";

const LeavesList = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  const {user} = useAuth();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/leaves/${user._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        alert(error.response?.data?.error || "An error occurred"); 
      }
    };
    fetchLeaves();
  }, [user]);

  const filteredLeaves = leaves.filter(leave => 
    leave.status.toLowerCase().includes(filterStatus.toLowerCase())
  ); 




  return (
    <div className="relative rounded-lg px-4 py-6 bg-indigo-600 mt-6 overflow-hidden"> 
      <div className="absolute top-0 -left-10 w-32 h-32 bg-indigo-800 rounded-full mix-blend-multiply opacity-30 pointer-events-none" />
      <div className="absolute -bottom-1 -right-10 w-40 h-40 bg-blue-800 rounded-xl mix-blend-multiply opacity-30 pointer-events-none" />
      <div className="absolute -bottom-6 -right-14 w-40 h-40 bg-blue-800 rounded-xl mix-blend-multiply opacity-60 pointer-events-none" />

      <div className="z-10 flex flex-col items-center">
        <span className="font-semibold text-xl text-white mb-4">Manage Leaves</span> 
        <div className="flex w-full"> 
          <input
            type="text"
            placeholder="Filter by status"
            className="rounded-lg p-2 w-1/2 mr-2"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)} // Controlled input
          />
          <Link to={"add-leave"} className="rounded-lg p-2 bg-white text-indigo-600 hover:bg-gray-200 w-1/2">
            Request Leave
          </Link>
        </div>


        <div className="mt-10 w-full z-10">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="text-xs uppercase border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">SNO</th>
 
                <th className="px-6 py-3 text-left font-medium text-gray-500">Leave Type</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">From</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">To</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Reason</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave, index) => ( 
                <tr key={leave._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                 
                  <td className="px-6 py-4 whitespace-nowrap">{leave.leaveType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{moment(leave.fromDate).format('YYYY-MM-DD')}</td> 
                  <td className="px-6 py-4 whitespace-nowrap">{moment(leave.toDate).format('YYYY-MM-DD')}</td> 
                  <td className="px-6 py-4 whitespace-nowrap">{leave.description}</td> 
                  <td className="px-6 py-4 whitespace-nowrap">{leave.status}</td>
                </tr>
              ))}
              {filteredLeaves.length === 0 && ( 
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">No leaves found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeavesList;