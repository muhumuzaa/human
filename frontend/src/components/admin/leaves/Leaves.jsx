import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/leaves`, {
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
  }, []);

  const filteredLeaves = leaves.filter((leave) =>{
    const name = leave.employeeId?.userId?.name;
    const meetsName = name.toLowerCase().includes(filterTerm.toLowerCase())

    const meetsStatusFilter = filterStatus ? leave.status === filterStatus : true;

    return meetsName && meetsStatusFilter;
  }
    
  );

  const handleStatusClick = (status) =>{
    setFilterStatus(status)
  }

  return (
    <div>
      <div>
        <h3>Leaves List</h3>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search by Name"
            className="py-1 px-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300"
            style={{ width: "250px" }}
            onChange={(e) => setFilterTerm(e.target.value)}
            value={filterTerm}
          />
          <div className="space-x-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2" onClick={() =>handleStatusClick('Pending')}>
              Pending
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2"onClick={() =>handleStatusClick('Approved')}>
              Approved
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2"onClick={() =>handleStatusClick('Rejected')}>
              Rejected
            </button>
          </div>
        </div>

        <div className="mt-10 w-full z-10">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="text-xs uppercase border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  SNO
                </th>

                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Department
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  Days
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className={index % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leave?.employeeId?.userId?.name || "No name"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leave?.leaveType || "No type"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leave?.employeeId?.department?.dep_name || "no dep"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leave?.status || "no status"}
                  </td>
                  
                  <td>{moment(leave.toDate)
                    .startOf("day")
                    .diff(moment(leave.fromDate).startOf("day"), "days")
                    }</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-indigo-500 hover:bg-indigo-600 px-2 py-1 text-white rounded-lg" onClick={() =>{
                        navigate(`/admin-dashboard/leaves/${leave._id}`)
                        }}>View</button>
                  </td>
                </tr>
              ))}
              {filteredLeaves.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No leaves found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
