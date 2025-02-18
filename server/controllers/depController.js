import mongoose from "mongoose";
import { Department } from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Salary from "../models/Salary.js";

const addDepartment = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const departments = await Department.insertMany(
        req.body.map((dep) => ({
          dep_name: dep.dep_name,
          description: dep.description,
          lead: dep.lead || "Not Assigned",
          employees: dep.employees || 0,
        }))
      );
      return res.status(200).json({
        success: true,
        message: `Added ${departments.length} departments to the database`,
        departments,
      });
    } else {
      const {
        dep_name,
        description,
        lead = "Not Assigned",
        employees = 0,
      } = req.body;

      if (!dep_name || !description) {
        return res.status(400).json({
          success: false,
          error: "Department name and description are required",
        });
      }

      const newDep = new Department({ dep_name, description, lead, employees });
      await newDep.save();

      // Immediately fetch sorted departments
      const sortedDepartments = await Department.find().sort({ createdAt: -1 });

      return res.status(201).json({
        success: true,
        department: newDep,
        departments: sortedDepartments,
        message: "Successfully added new department",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error while adding department" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    if (!departments || departments.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No departments found" });
    }

    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error fetching department list" });
  }
};

const delDepartment = async (req, res) => {

  try {
    const { id } = req.query;
    if (!id) {

      return res
        .status(404)
        .json({ success: false, error: "There is no department ID provided" });
    }

    // Dept to delete
    const depToDelete = await Department.findById(id)
    if (!depToDelete) {

      return res
        .status(404)
        .json({ success: false, error: "Department was not found" });
    }

    // Find employees belonging to the department to delete
    const employees = await Employee.find({ department: id })
    // Correctly map the employee ids
    const employeeIds = employees.map((emp) => emp._id);

    // Delete all leaves and salaries for these employees
    await Leave.deleteMany({ employeeId: { $in: employeeIds } })
    await Salary.deleteMany({ employeeId: { $in: employeeIds } })

    // Delete employee records for that department by looping over each employee individually
    await Employee.deleteMany({department: id})

    // Finally, delete the department
    await Department.findByIdAndDelete(id)


    return res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {

    console.error("Error deleting department:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error on deleting department" });
  }
};


const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description, lead, employees } = await req.body;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, error: "Dept id for editing not provided" });
    }
    if (!dep_name || !description) {
      return res
        .status(400)
        .json({ success: false, error: "All field should be filled" });
    }
    const updatedDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description, lead, employees },
      { new: true }
    );
    if (!updatedDep) {
      return res.status(404).json({
        success: false,
        error: `Department with Id -${id} can't be found in the database`,
      });
    }
    return res.status(200).json({
      success: true,
      department: updatedDep,
      message: `Department ${id} updated successfully`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error when updating department" });
  }
};
export { addDepartment, getDepartments, delDepartment, updateDepartment };
