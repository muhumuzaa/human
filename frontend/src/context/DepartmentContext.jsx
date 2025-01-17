import axios from "axios"

import { createContext, useContext, useEffect, useState } from "react"

const DepartmentContext = createContext()
const DepartmentProvider = ({children}) => {
    const [depList, setDepList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() =>{
        const fetchDepartments = async() =>{
            try {
                const response = await axios.get(
                  "http://localhost:3000/api/department/list"
                );
                
                if (response.data.success) {
                  setDepList(response.data.departments);
                }else{
                    setError('Error fetching departments')
                }
              } catch (error) {
                if (error.response && !error.response.data.success) {
                  alert(error.response.data.error);
                } else {
                  setError(error.message || 'Server error when fetching departments')
                }
              }finally{
                setLoading(false)
              }
            };
            fetchDepartments()
    }, [])
  return (
    <DepartmentContext.Provider value={{depList, loading, error}}>
        {children}
    </DepartmentContext.Provider>
  )
}

export const DepContext = () => useContext(DepartmentContext)

export default DepartmentProvider