import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Salary = () => {
  const { user } = useAuth();
  const [salaries, setSalaries] = useState([])

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/salary/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if(response.data.success){
            setSalaries(response.data.salaries)
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.error);
      }
    };
    fetchSalary();
  }, [user]);

  if(salaries.length < 1){
    return <p>No salary data</p>
  }
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
      <span className="font-semibold text-xl text-white block">
        Salary for: {user?.name}
      </span>

    <div className="mt-10 w-full z-10">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="text-xs uppercase border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">SNO</th>
     
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Basic Salary</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Allowances</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Deductions</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Net Salary</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((salary, index) => ( 
                    <tr key={salary._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                     
                      <td className="px-6 py-4 whitespace-nowrap">{salary.basicSalary}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{salary.allowances}</td> 
                      <td className="px-6 py-4 whitespace-nowrap">{salary.deductions}</td> 
                      <td className="px-6 py-4 whitespace-nowrap">{salary.netSalary}</td> 
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(salary.payDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {salaries.length === 0 && ( 
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center">No Salaries found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>


      
    </div>
  );
};

export default Salary;
