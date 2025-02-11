import { Leave } from "../models/Leave.js";
import User from "../models/User.js";
import Employee from "../models/Employee.js";

export const addOrEditLeave = async(req, res) =>{
    try{
        const {userId, leaveType, fromDate, toDate, description} = req.body;

        const employee = await Employee.findOne({userId})
        console.log('employee obj: ', employee)
        if(!employee){
            return res.status(404).json({success: false, error: err.message||'employee doesnot exist'})
        }
        const leave = new Leave({employeeId: employee._id, leaveType, fromDate, toDate, description})
        await leave.save()
        return res.status(200).json({success:true, leave, message: 'Leave saved successfully'})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success: false, error: 'Server error adding leave'})
    }

}


export const fetchLeaves = async(req, res) =>{
    try{
        const leaves = await Leave.find();
        if(!leaves || leaves.length ==0){
            return res.status(400).json({success: false, error: "No leaves data available"})
        }
        return res.status(200).json({success: true, leaves})
    }catch(error){
        return res.status(500).json({success: false, error: err.message || "Server error fetching leaves"})
    }
}