import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"




const AdminDashboard = () => {
const {user} = useAuth()
const navigate = useNavigate()

useEffect(() =>{
  if(user === null){
    navigate('/login')
  }
}, [user, navigate])

if(user === undefined){
  return <p>Loading ...</p>
}

  return (
    <div>AdminDashboard as {user && user.role}</div>
  )

  
}

export default AdminDashboard
