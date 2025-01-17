import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  return (
    <div className="relative">
      <div>
        <h3>Employee List</h3>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search Employee(s) by Name"
            className="py-1 px-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300" style={{width: '250px'}}
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2">
            Add Employee
          </button>
        </div>
        <div>
            <EmployeeForm />
        </div>
      </div>

    </div>
  );
};

export default EmployeeList;
