import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";

const DepartmentContext = createContext();
const DepartmentProvider = ({ children }) => {
  const [depList, setDepList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/department/list",
        
      );

      if (response.data.success) {
        setDepList(response.data.departments);
      } else {
        setError("Error fetching departments");
        console.log("FETCH ERROR:", error);
        console.log("FETCH ERROR RESPONSE:", error.response);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        setError(
          error.response.data.error || "Server error when fetching departments"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/department/delete",
        {
          params: { id },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        console.log("successfully deleted");

        setDepList((prev) => prev.filter((dep) => dep._id !== id));
        alert("Deleted");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        console.log("Server error");
      }
    }
  };

  const addOrEditDepartment = async (department) => {
    try {
      if (department._id) {
        // Update existing department
        const response = await axios.put(
          `http://localhost:3000/api/department/update/${department._id}`,
          department,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepList((prev) =>
            prev.map((dep) =>
              dep._id === department._id ? response.data.department : dep
            )
          );
        }
      } else {
        // Add new department
        const response = await axios.post(
          "http://localhost:3000/api/department/add",
          department,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepList((prev) => [response.data.department, ...prev]);
        }
      }
    } catch (error) {
      console.error("Error in addOrEditDepartment:", error.message);
      alert(error.response?.data?.error || "Error saving department");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log('No token provided')
    };
    fetchDepartments();
  }, []);
  return (
    <DepartmentContext.Provider
      value={{
        depList,
        loading,
        error,
        fetchDepartments,
        deleteDepartment,
        addOrEditDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartments = () => useContext(DepartmentContext);

export default DepartmentProvider;
