import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaXmark } from "react-icons/fa6";

const LeaveDetails = () => {
  const [leave, setLeave] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveById = async (leaveId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leaves/${leaveId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        alert(error.response.data, error || "Unknown Error");
      }
    };
    fetchLeaveById(id);
  }, [id]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/leaves/update/${id}`,
        {status: newStatus},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        alert("Leave status has been updated successfully");
        navigate(-1)
      }
    } catch (error) {
      alert(error?.response?.data?.error);
    }
  };

  if (!leave) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-slate-50 rounded-lg shadow-sm">
      <div className="space-y-4 p-10">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold mb-6">
            Leave Details for {leave?.employeeId?.userId?.name}
          </h3>
          <div
            className="p-1 border border-gray-300 hover:border-indigo-600 hover:bg-gray-200 rounded-full w-6 h-6 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaXmark className="text-gray-400 hover:text-indigo-700" />
          </div>
        </div>

        <p>
          <strong>From Date:</strong>{" "}
          {moment(leave.fromDate).format("MMM Do YYYY")}
        </p>
        <p>
          <strong>To Date:</strong> {moment(leave.toDate).format("MMM Do YYYY")}
        </p>
        <p>
          <strong>Leave Type:</strong> {leave.leaveType}
        </p>
        <p>
          <strong>Reason:</strong> {leave.reason}
        </p>
        <p>
          <strong>Days:</strong>{" "}
          {moment(leave.toDate).diff(moment(leave.fromDate), "days") + 1}
        </p>

        <div className="space-x-6">
          <strong>Status:</strong>
          {leave.status === "Pending" ? (
            <span className="space-x-4">
              <button
                className="border border-gray-400 bg-green-500 rounded-lg py-1 px-3 hover:bg-green-600 text-white"
                onClick={ () =>handleStatusChange(leave._id, "Approved")}
              >
                Accept
              </button>
              <button
                className="border border-red-400 bg-red-500 rounded-lg py-1 px-3 hover:bg-red-600 text-white"
                onClick={() =>handleStatusChange(leave._id, "Rejected")}
              >
                Reject
              </button>
            </span>
          ) : (
            leave.status
          )}
        </div>
      </div>
      {/* <div className="flex justify-between px-8 py-4">
        
      </div> */}
    </div>
  );
};

export default LeaveDetails;
