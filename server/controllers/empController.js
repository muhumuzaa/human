import { response } from "express";
import { Department } from "../models/Department.js";
import Employee from "../models/Employee.js";
import mongoose from "mongoose";





const getEmployees = async(req, res) =>{
    try{
        const employees = await Employee.find();
        if(!employees || employees.length ===0){
            return res.status(404).json({success: false, error: 'No employees found.'})
        }
        
        if(employees){
            return res.status(200).json({success: true, employees, message: `Successfully fetched ${employees.length} employees`})
        }

    }catch(error){
        return res.status(500).json({success: false, error: 'Server error when fetching employees.'})
    }
}


const addEmployee = async (req, res) => {
  try {
    const { emp_name, email, tel, salary, department } = req.body;

    // Validate required fields
    if (!emp_name || !email || !department) {
      return res.status(400).json({
        success: false,
        error: "Required fields are missing",
      });
    }

    // Validate department ID format
    if (!mongoose.Types.ObjectId.isValid(department)) {
      return res.status(400).json({
        success: false,
        error: "Invalid department ID format",
      });
    }

    // Check if department exists
    const deptExists = await Department.findById(department);
    if (!deptExists) {
      return res.status(404).json({
        success: false,
        error: "The selected department does not exist",
      });
    }

    //check if email exists
    const emailExists = await Employee.findOne({ email })
    if(emailExists){
        return res.status(400).json({success: false, error: 'This email has already been used. Use new email'})
    }

    // Create new employee
    const newEmployee = new Employee({
      emp_name,
      email,
      tel,
      salary,
      department,
    });

    await newEmployee.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "New employee added successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee: ", error.message);
    return res.status(500).json({
      success: false,
      error: "Server error when creating an employee",
    });
  }
};

export { addEmployee, getEmployees };
