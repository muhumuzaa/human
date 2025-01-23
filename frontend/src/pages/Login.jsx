import {useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {

  const [loginCreds, setLoginCreds] = useState({
    email: "", 
    password: ""
  });

  const [credError, setCredError] = useState(null);
  const navigate = useNavigate()

  const {login} = useAuth()


  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setLoginCreds({...loginCreds, [name]: value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3000/api/auth/login', loginCreds)
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem('token', response.data.token)

        if(response.data.user.role ==='admin'){
          navigate('/admin-dashboard')
          
        }else{
          navigate('/employee-dashboard')
        }
      }
      
      
      
      
    }catch(error){
      console.log(error);
      if(error.response){
        setCredError(error.response.data.error)
      }else{
        setCredError('Server error')
      }
      

    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Hforce"
            src="/ems.png"
            className="mx-auto h-60 w-auto"
          />
          <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Human Force EMS
          </h2>
          <p className="mt-6 text-center font-bold tracking-tight text-gray-900">
            Sign in to your account
          </p>
         
         {
          credError && <p>{credError}</p>
         }
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center">
                <input type="checkbox" className="" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="font-semibold text-indigo-600 text-sm hover:text-indigo-500">
                Forgot Password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500"

              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login