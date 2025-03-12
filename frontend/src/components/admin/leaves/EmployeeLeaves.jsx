import moment from "moment";
import { FaXmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeLeaves = ({ leaves, leaveEmployee, onCancel }) => {

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-xl p-8">
      <div className="flex justify-between">
      <h2 className="text-lg font-semibold mb-6">Leaves for {leaveEmployee}</h2>
      <div
        onClick={onCancel}
        className="p-1 border border-gray-400 hover:bg-gray-200 rounded-full w-6 h-6 cursor-pointer"
      >
        <FaXmark className="text-indigo-700 hover:text-gray-700" />
      </div>
      </div>
      <table className="w-full  ">
        <thead className="text-xs uppercase border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-500">
              SNO
            </th>

            <th className="px-6 py-3 text-left font-medium text-gray-500">
              Leave Type
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500">
              From
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500">
              To
            </th>

            <th className="px-6 py-3 text-left font-medium text-gray-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={leave._id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

              <td className="px-6 py-4 whitespace-nowrap">{leave.leaveType}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {moment(leave.fromDate).format("YYYY-MM-DD")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {moment(leave.toDate).format("YYYY-MM-DD")}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaves;
