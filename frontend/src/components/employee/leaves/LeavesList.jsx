import { Link } from "react-router-dom"

const LeavesList = () => {
   
    return (
        <div className="relative rounded-lg px-4 py-6 bg-indigo-600 mt-6 items-center flex flex-col overflow-clip">
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
                  <span className="font-semibold text-xl text-white">
                    Manage Leaves
                  </span>
                  <Link to={'add-leave'} className="flex justify-between w-full z-10">
                    <input type="text" placeholder="Filter by status" className="rounded-lg p-2"/>
                    <button className="rounded-lg p-2 bg-white text-indigo-600 hover:bg-gray-200">Request Leave</button>
                  </Link>
                  
                  
                </div>
      )
}

export default LeavesList