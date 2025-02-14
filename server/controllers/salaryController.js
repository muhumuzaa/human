import { error } from "console";
import { parse } from "path";
import Employee from "../models/Employee.js";
import { Salary } from "../models/Salary.js";
import { populate } from "dotenv";

export const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, deductions, allowances, payDate } =
      req.body;

    //check for missing fields
    if (!employeeId || !basicSalary) {
      return res
        .status(404)
        .json({ success: false, error: "Required fields are missing" });
    }

    //check if employee Exists
    const employeeExists = await Employee.findById(employeeId);
    if (!employeeExists) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Employee doesnt exist in the database",
        });
    }

    const netSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances: allowances || 0,
      deductions: deductions || 0,
      netSalary: netSalary,
      payDate,
    });

    await newSalary.save();
    return res
      .status(200)
      .json({ success: true, message: "Salary saved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error adding salary" });
  }
};

export const getSalaryByEmpId = async (req, res) => {
  try {
    const { empId } = req.params;
    //check if id was collected
    if (!empId) {
      return res.status(404).json({ success: true, error: "No Id recieved" });
    }
    //find salary with matching id
    const salary = await Salary.findOne({ employeeId: empId })
      .populate({ path: "employeeId", populate: { path: "department" } })
      .exec();
    if (!salary) {
      return res
        .status(404)
        .json({ success: false, error: "No salary found for this employee" });
    }
    return res
      .status(200)
      .json({ success: true, salary, message: "Successfuly fetched salary" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error fetching salary" });
  }
};

export const getSalaryByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    //check if id was collected
    if (!userId) {
      return res.status(404).json({ success: true, error: "No Id recieved" });
    }

    //get employee table
    const employee = await Employee.findOne({userId})
    if(!employee){
      return res.status(400).json({success: false, error: 'Employee not found in employee table'})
    }
    //find salary with matching id
    const salaries = await Salary.find({ employeeId: employee._id })
      
    if (!salaries) {
      return res
        .status(404)
        .json({ success: false, error: "No salary found for this employee" });
    }
    return res
      .status(200)
      .json({ success: true, salaries, message: "Successfuly fetched salaries" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error fetching salaries" });
  }
};


export const deleteSalary = async (req, res) =>{
    try{
        
    const {id} = req.params
    if(!id){
        return res.status(404).json({success: false, error: 'No id provided'})
    }

    //check if salary obj exists
    const salaryExists = await Salary.findById({_id: id})
    if(!salaryExists){
        return res.status(404).json({success: false, error: 'Salary you are trying to delete doesnt exist'})
    }

    await Salary.findByIdAndDelete({_id:id})
    return res.status(200).json({success: true, message: 'Salary successfully deleted'})

    }catch(error){
        return res.status(500).json({success: false, error: 'Server error deleting salary'})
    }
    
}

