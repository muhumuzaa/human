import { Leave } from "../models/Leave.js";
import User from "../models/User.js";
import Employee from "../models/Employee.js";

export const addOrEditLeave = async(req, res) =>{
    try{
        const {userId, leaveType, fromDate, toDate, description} = req.body;

        const employee = await Employee.findOne({userId})
        if(!employee){
            return res.status(404).json({success: false, error: 'employee doesnot exist'})
        }
        const leave = new Leave({employeeId: employee._id, leaveType, fromDate, toDate, description})
        await leave.save()
        return res.status(200).json({success:true, leave, message: 'Leave saved successfully'})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success: false, error: 'Server error adding leave'})
    }

}