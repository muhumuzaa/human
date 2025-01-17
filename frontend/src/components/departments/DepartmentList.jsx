import { useEffect, useState } from "react";
import AddDepartment from "./DepartmentForm";
import axios from "axios";
import DepartmentCard from "./DepartmentCard";
import {useDepartments} from '../../context/DepartmentContext'

const DepartmentList = () => {

  const {departments, error, loading} = useDepartments();
  const [showDepForm, setShowDepForm] = useState(false);
  const [editDept, setEditDept] = useState(null)


  

  const handleFormOpen = () => {
    console.log('handleFormOpen called ');
    setEditDept(null)
    setShowDepForm(true)
  };
  const handleFormClose = () => {
    setEditDept(null)
    setShowDepForm(false)
  };


  const getDepartmentList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/department/list"
      );
      
      if (response.data.success) {
        setDepList(response.data.departments);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        console.log("Server error");
      }
    }
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  const handleDelDep = async(id) =>{
    try{
      
    const response = await axios.delete('http://localhost:3000/api/department/delete', {
      params: {id}, 
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    if(response.data.success){
      alert(response.data.message)
      getDepartmentList();
    }
    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }else{
        console.log('Server error')
      }
    }
  }

  const handleEditDep = async(department) =>{
    setEditDept(department)
    setShowDepForm(true)
  }

  return (
    <div className="relative shadow rounded-lg">
      {/* Main Content */}
      <div className={`${showDepForm ? "blur-sm pointer-events-none" : ""}`}>
        <h3>Department List</h3>
        <div className="flex justify-between mb-2">
          <input
            placeholder="Search by Department Name"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-slate-50 rounded-lg py-1 px-2"
            onClick={handleFormOpen}
          >
            Add Department
          </button>
        </div>

        <div className="mb-4 bg-white rounded-lg p-4">
          {depList.map((dep) => (
           
              <DepartmentCard key={dep._id} department={dep} editDep={handleEditDep} deleteDep={handleDelDep}/>
            
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {showDepForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleFormClose} // Close modal if background is clicked
          ></div>

          {/* Modal */}
          <div className="relative z-10">
            <AddDepartment
              onClose={handleFormClose}
              onRefresh={getDepartmentList}
              department={editDept}
              
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
