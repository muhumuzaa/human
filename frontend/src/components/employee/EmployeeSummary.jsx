import { useAuth } from "../../context/AuthContext"


const EmployeeSummary = () => {
    const {user} = useAuth()
  return (
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
              <span className="font-semibold text-xl text-white">
                Welcome Back {user?.name}
              </span>
              
              
            </div>
  )
}

export default EmployeeSummary