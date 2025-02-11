import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const AddLeave = () => {
  const {user}= useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userId: user._id,
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try{
      console.log('Sending data, ', formData)
      const response = await axios.post(
        "http://localhost:3000/api/leaves/add",
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if(response.data.success){
        alert(response.data.message)
        navigate('leaves')
      }
    }catch(error){
      
      alert(error.response.message || error.response.data.error)
    }
    
  };
  return (
    <div className="bg-white max-w-4xl mx-auto rounded-lg p-4">
      <div className="">
        <span className="text-xl font-semibold text-gray-700 mb-6 block text-center">
          Add Leave
        </span>
      </div>

      <form className="w-full" onSubmit={handleSave}>
        <div className="mb-4 flex space-x-4 items-center">
          <label
            htmlFor="leaveType"
            value={formData.leaveType}
            className="block"
          >
            Leave Type
          </label>
          <select
            name="leaveType"
            onChange={handleInputChange}
            required
            className="border border-gray-200 rounded-lg p-2"
          >
            <option value="">Select Leave type</option>
            <option value="sick leave">Sick Leave</option>
            <option value="casual leave">Casual Leave</option>
            <option value="annual leave">Annual Leave</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="fromDate" className="block">
            From Date
          </label>
          <input
            type="date"
            name="fromDate"
            rows="4"
            onChange={handleInputChange}
            required
            value={formData.fromDate}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="toDate" className="block">
            To Date
          </label>
          <input
            type="date"
            name="toDate"
            onChange={handleInputChange}
            value={formData.toDate}
            placeholder="optional"
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
            placeholder="optional"
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 py-1 px-3 rounded-xl text-slate-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
