import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const userContext = createContext()
const AuthContext = ({children}) => {

    const [user, setUser] = useState(null)

    useEffect(() =>{
        const verifyUser = async() =>{
            
            try{
                const token = localStorage.getItem('token')
            if(token){
                const response = await axios.get('http://localhost:3000/api/auth/verify', {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                if(response.data.success){
                    setUser(response.data.user)
                }else{
                    setUser(null)
                    
                }
            }
                
            }catch(error){
                if(error.response && !error.response.data.error){
                    console.log('Server error: ', error.response.data.error);
                    
                }
            }
            
        } 
        verifyUser()
    }, [])

    const login =(user) =>{
        setUser(user)
        localStorage.getItem(user.token)
    }
    const logout = () =>{
        setUser(null)
        localStorage.removeItem('token')

    }
  return (
    <userContext.Provider value={{user, login, logout}}>
        {children}
    </userContext.Provider>
  )
}
export const useAuth = () => useContext(userContext)
export default AuthContext