import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const AddLeave = () => {
  const {user}= useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    userId: user._id,
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
  });



  useEffect(() => {
    
    // if both dates exist, compare them
    if(formData.fromDate){
      if (new Date(formData.fromDate) < new Date()) {
        setError("From-Date cant be in the past");
      } else {
        setError("");
      }
    }
    if (formData.fromDate && formData.toDate) {
      if (new Date(formData.toDate) < new Date(formData.fromDate)) {
        setError("To-Date cannot be earlier than From-Date");
      } else {
        setError("");
      }
    }
  }, [formData.fromDate, formData.toDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(new Date(formData.fromDate) > new Date(formData.toDate)){
      alert(error)
      return;
    }
    
    try{
     
      const response = await axios.post(
        "http://localhost:3000/api/leaves/add",
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if(response.data.success){
        alert(response.data.message)
        navigate(-1)
      }
    }catch (error) {
      console.log("error is:", error);
      console.log("error.response is:", error.response);
      alert(error.response?.data?.error || "No error message found");
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
            <option value="Sick leave">Sick leave</option>
            <option value="Casual leave">Casual leave</option>
            <option value="Annual leave">Annual leave</option>
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
            required
            onChange={handleInputChange}
            value={formData.toDate}
            className="p-2 border border-gray-200 rounded-xl w-full"
          />
          {error && <p className="text-red-600">{error}</p>}
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
          type="submit" disabled= {Boolean(error)}
          className="bg-indigo-500 hover:bg-indigo-700 py-1 px-3 rounded-xl text-slate-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
