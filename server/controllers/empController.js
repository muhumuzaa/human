import { response } from "express";
import { Department } from "../models/Department.js";
import Employee from "../models/Employee.js";
import mongoose from "mongoose";

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department', 'dep_name');
    if (!employees || employees.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No employees found." });
    }

    if (employees) {
      return res
        .status(200)
        .json({
          success: true,
          employees,
          message: `Successfully fetched ${employees.length} employees`,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error when fetching employees." });
  }
};

const addEmployee = async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        // Bulk addition logic
        const errors = [];
        const employees = [];
        for (const emp of req.body) {
          const { emp_name, email, tel, salary, department, image } = emp;
  
          // Validate required fields
          if (!emp_name || !email || !department) {
            errors.push({
              emp_name,
              email,
              error: "Required fields are missing.",
            });
            continue;
          }
  
          // Validate department ID format
          if (!mongoose.Types.ObjectId.isValid(department)) {
            errors.push({
              emp_name,
              email,
              error: "Invalid department ID format.",
            });
            continue;
          }
  
          // Check if department exists
          const deptExists = await Department.findById(department);
          if (!deptExists) {
            errors.push({
              emp_name,
              email,
              error: "The selected department does not exist.",
            });
            continue;
          }
  
          // Check if email exists
          const emailExists = await Employee.findOne({ email });
          if (emailExists) {
            errors.push({
              emp_name,
              email,
              error: "This email has already been used. Use a new email.",
            });
            continue;
          }
  
          // Create employee if all validations pass
          const newEmployee = new Employee({
            emp_name,
            email,
            tel,
            salary,
            department,
            image
          });
  
          const savedEmployee = await newEmployee.save();
          employees.push(savedEmployee);
        }
  
        // Return response
        return res.status(200).json({
          success: errors.length === 0,
          message: `Processed ${req.body.length} employees.`,
          employees,
          errors,
        });
      } else {
        // Single employee addition logic
        const { emp_name, email, tel, salary, department} = req.body;
        const image = req.file ? req.file.filename : null;
        if(typeof image !== 'string'){
            return res.status(404).json({success: false, error: 'Invalid image format'})
        }
        // Validate required fields
        if (!emp_name || !email || !department) {
          return res.status(400).json({
            success: false,
            error: "Required fields are missing.",
          });
        }
  
        // Validate department ID format
        if (!mongoose.Types.ObjectId.isValid(department)) {
          return res.status(400).json({
            success: false,
            error: "Invalid department ID format.",
          });
        }
  
        // Check if department exists
        const deptExists = await Department.findById(department);
        if (!deptExists) {
          return res.status(404).json({
            success: false,
            error: "The selected department does not exist.",
          });
        }
  
        // Check if email exists
        const emailExists = await Employee.findOne({ email });
        if (emailExists) {
          return res.status(400).json({
            success: false,
            error: "This email has already been used. Use a new email.",
          });
        }

        //check image validity
        const imageFile = req.file ? `/uploads/${req.file.filename}`: null
  
        // Create new employee
        const newEmployee = new Employee({
          emp_name,
          email,
          tel,
          salary,
          department,
          image: imageFile ? `/uploads/${image}` : null
        });
  
        await newEmployee.save();
        return res.status(201).json({
          success: true,
          message: "New employee added successfully.",
          employee: newEmployee,
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error.message);
      return res.status(500).json({
        success: false,
        error: "Server error when creating an employee.",
      });
    }}


    const updateEmployee = async(req, res) =>{
        try{
            const {id} =  req.params;
            console.log('id from params: ', id)
            const {emp_name, email, tel, department, salary} = req.body
            console.log('body is: ', req.body)
            if(!emp_name || !email || !department || !salary){
                return res.status(404).json({success: false, error: 'Required fields are missing'})
            }
            if(!id){
                return res.status(404).json({success: false, error: 'No Id provided when updating'})
            }
            const employeeToUpdate = await Employee.findByIdAndUpdate(id, {emp_name, email, tel, department, salary}, {new: true});
            if(!employeeToUpdate){
                
                return res.status(404).json({success: false, error: 'Employee wasnot found'})
            }
            
            return res.status(201).json({success: true, message: `Employee ${id} updated successfuly`, employee:employeeToUpdate})
        }catch(error){
            return res.status(500).json({success: false, error: 'Server error updating employee'})
        }
        
    }

export { addEmployee, getEmployees, updateEmployee };
