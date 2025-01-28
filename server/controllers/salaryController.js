import { error } from "console";
import { parse } from "path";
import Employee from "../models/Employee.js";
import { Salary } from "../models/Salary.js";

export const addSalary = async(req, res) =>{
    try{
        const {employeeId, basicSalary, deductions, allowances, payDate} = req.body;

        //check for missing fields
        if(!employeeId || !basicSalary){
            return res.status(404).json({success: false, error: 'Required fields are missing'})
        }

        //check if employee Exists
        const employeeExists = await Employee.findById(employeeId)
        if(!employeeExists){
            return res.status(404).json({success: false, error: 'Employee doesnt exist in the database'})
        }

        const netSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)
        const newSalary = new Salary({
            
            employeeId, 
            basicSalary, 
            allowances: allowances || 0,
            deductions: deductions || 0, 
            netSalary:  netSalary,
            payDate
        })

        await newSalary.save()
        return res.status(200).json({success: true, message: 'Salary saved successfully'})
    }catch(error){
        return res.status(500).json({success: false, error: 'Server error adding salary'})
    }
    

}

