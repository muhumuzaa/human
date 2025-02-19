import { Department } from "../models/Department.js";
import Employee from "../models/Employee.js";
import mongoose from "mongoose";

import User from "../models/User.js";
import bcrypt from "bcrypt";
import Salary from "../models/Salary.js";
import Leave from "../models/Leave.js";


const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department", "dep_name").populate("userId", "name email role image").sort({createdAt: -1});
    if (!employees || employees.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No employees found." });
    }

   
      return res.status(200).json({
        success: true,
        employees,
        message: `Successfully fetched ${employees.length} employees`,
      });
    
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error when fetching employees." });
  }
};

const getEmployeeByUserId = async(req, res) =>{
  try{
    const {id} = req.params
    const employee = await Employee.findOne({userId: id}).populate('department', 'dep_name').populate('userId')
    if(!employee){
      return res.status(404).json({success: false, error: 'Employee wasnot found'})
    }
    return res.status(200).json({success: true, employee})
  }catch(error){
    return res.status(500).json({success: false, error: 'Server error fetching employee'})
  }
}



const addEmployee = async (req, res) => {
  try {
    const { employees } = req.body; // Can be a single object or an array

    // Normalize to always work with an array
    const employeeData = Array.isArray(employees) ? employees : [req.body];

    if (employeeData.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No employee data provided.",
      });
    }

    const createdEmployees = []; // To store successfully created employees

    for (const emp of employeeData) {
      const { name, email, password, role, department, tel, image } = emp;

      // Basic validation
      if (!name || !email || !password || !role) {
        return res.status(400).json({
          success: false,
          error: "Required fields (name, email, password, role) are missing.",
        });
      }

      // Check if email already exists
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: `The email ${email} has already been used.`,
        });
      }

      // Validate department ID
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
          error: `The selected department does not exist: ${department}.`,
        });
      }

      // Hash password
      const hashedPwd = await bcrypt.hash(password, 10);

      // Determine image source:
      // - Use req.file if uploaded
      // - Use image URL if provided in the employee data
      let finalImage = "";
      if (req.file) {
        finalImage = `/uploads/${req.file.filename}`; // From file upload
      } else if (image) {
        finalImage = image; // From URL in the data
      }

      // Create User
      const newUser = new User({
        name,
        email,
        password: hashedPwd,
        role,
        tel,
        image: finalImage, // Save either the file path or the URL
      });
      const savedUser = await newUser.save();

      // Create Employee, referencing the new user
      const newEmployee = new Employee({
        userId: savedUser._id,
        department,
      });
      await newEmployee.save();

      // Populate user & department
      const populatedEmployee = await Employee.findById(newEmployee._id)
        .populate("userId", "name email role tel image")// Include user fields (name, email, role, etc.)
        .populate("department", "dep_name"); // Include department name

      // Add to the results array
      createdEmployees.push(populatedEmployee);
    }

    // Respond with the created employees
    return res.status(201).json({
      success: true,
      message:
        createdEmployees.length > 1
          ? "Employees added successfully."
          : "Employee added successfully.",
      employees: createdEmployees,
    });
  } catch (error) {
    console.error("Error adding employee(s):", error.message);
    return res.status(500).json({
      success: false,
      error: "Server error when creating employee(s).",
    });
  }
};


const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, department, tel } = req.body;

    if (!name || !email || !department ) {
      return res
        .status(400)
        .json({ success: false, error: "Required fields are missing" });
    }

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "No Id provided when updating" });
    }

    //if dept exists
    const depExists = await Department.findById(department);
    if (!depExists) {
      return res
        .status(404)
        .json({ success: false, error: "Dept doesnot exist" });
    }

    //find employeeDoc to get userId. userID contains name, email,  etc
    const employeeDoc = await Employee.findById(id)
    if(!employeeDoc){
      return res.status(404).json({success: false, error:"Employee doesn't exist"})
    }

    //update the user object for name, email, etc
    const userDataToUpdate = {name, email, tel, role}
    if(req.file){
      userDataToUpdate.image = `uploads/${req.file.filename}`
    }

    await User.findByIdAndUpdate(
      employeeDoc.userId, // the userId from the employee doc. Becoz the employee schema has userId which references the User schema.
      userDataToUpdate,
      {new: true}
    )

    //update employee doc for dep
    const employeeDataToUpdate = {department}

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id, 
      employeeDataToUpdate,
      {new: true},
    ).populate('department', 'dep_name')
    .populate("userId", "name email role tel image") //userid populates the employee with other fields from the userSchema
    return res
      .status(201)
      .json({
        success: true,
        message: `Employee ${id} updated successfuly`,
        employee: updatedEmployee,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error updating employee" });
  }
};

const deleteEmployee = async (req, res) => {

  try {
    const { id } = req.query;
    if (!id) {

      return res.status(404).json({ success: false, error: "No id provided" });
    } 
  
    const employeeToDelele = await Employee.findById(id).populate('userId');
    if (!employeeToDelele) {

      return res
        .status(404)
        .json({ success: false, error: "Employee to delete was not found" });
    }
    const userToDelete = employeeToDelele.userId._id;

    //delete employee
    await Employee.findByIdAndDelete(id)
    //delete user record for that employee
    await User.findByIdAndDelete(userToDelete)

    //delete Salary record for that employee
    await Salary.deleteMany({employeeId: id})

    //delete leave records for that employee
    await Leave.deleteMany({employeeId: id})
    return res
      .status(200)
      .json({
        success: true,
        error: `Successfully deleted employee - ${employeeToDelele.emp_name} and their user account`,
      });
  } catch (error) {

    console.error('Error deleting employee: ', error.message);
    return res
      .status(404)
      .json({ success: false, error: "Server error deleting employee" });
  }
};

export { addEmployee, getEmployees, updateEmployee, deleteEmployee, getEmployeeByUserId };
