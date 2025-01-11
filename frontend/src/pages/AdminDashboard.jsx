import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"



const AdminDashboard = () => {
const {user} = useAuth()
const naviagte = useNavigate()
if(!user){
  naviagte('/login')
}
  return (
    <div>AdminDashboard as {user && user.role}</div>
  )
}

export default AdminDashboard
