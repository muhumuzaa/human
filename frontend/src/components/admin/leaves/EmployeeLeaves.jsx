
import moment from "moment";

const EmployeeLeaves = ({leaves, selectedEmployee}) => {
    if(!leaves){
        return <div>Employee has not requested for leaves yet</div>
    }
  return (
    <div className="mt-10 w-full z-10">
        <h2>Leaves for {selectedEmployee?.userId?.name}</h2>
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="text-xs uppercase border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">SNO</th>
     
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Leave Type</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">From</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">To</th>
                
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave, index) => ( 
                    <tr key={leave._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                     
                      <td className="px-6 py-4 whitespace-nowrap">{leave.leaveType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{moment(leave.fromDate).format('YYYY-MM-DD')}</td> 
                      <td className="px-6 py-4 whitespace-nowrap">{moment(leave.toDate).format('YYYY-MM-DD')}</td> 
                
                      <td className="px-6 py-4 whitespace-nowrap">{leave.status}</td>
                    </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
  )
}

export default EmployeeLeaves