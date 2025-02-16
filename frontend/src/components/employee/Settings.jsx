import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.newPassword && formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Passwords don't match");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  }, [formData.newPassword, formData.confirmPassword]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(
            `http://localhost:3000/api/auth/changepasswd/${user._id}`, formData,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
      
          if(response.data.success){
              alert(response.data.message)
              { response.data.user.role === 'employee' ? navigate('/employee-dashboard'): navigate('/admin-dashboard')}
          }
    }catch(error){
        alert(error.response.data.error || "Error data not showing")
    }
    
  };
  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="py-6 text-2xl font-semibold">Change your password</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              required
              autoComplete="email"
              value={formData.email}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="items-center justify-between">
            <label
              htmlFor="oldPassword"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Old Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              required
              onChange={handleInputChange}
              autoComplete="old-password"
              value={formData.oldPassword}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="items-center justify-between">
            <label
              htmlFor="newPassword"
              className="block text-sm/6 font-medium text-gray-900"
            >
              New Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              onChange={handleInputChange}
              autoComplete="new-password"
              value={formData.newPassword}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="items-center justify-between">
            <label
              htmlFor="confirmPassword"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              onChange={handleInputChange}
              autoComplete="confirm-password"
              value={formData.confirmPassword}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
