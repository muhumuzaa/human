import { Leave } from "../models/Leave.js";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import { populate } from "dotenv";
import path from "path";
import mongoose from "mongoose";

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


export const fetchLeavesByUser = async(req, res) =>{
    try{
        const {id} = req.params;
        //first find the user associated with the id. In the backend, we have the id of a user (user._id) from the user table.
        //But the leaves table instead stores employeeId, which then references the user id in the employee table as userId.
        //So we have to first get the employee from the employee table
        const employee = await Employee.findOne({userId: id})
        if(!employee){
            return res.status(404).json({success: false, error: 'No employee record found'})
        }
        //Now that we have gotten the employee, we use their employeeId in the leaves table to find leaves for that particular employee.
        //Now I find all leaves where employeeId is the same as employee._id
        const leaves = await Leave.find({employeeId: employee._id});
        if(!leaves || leaves.length ===0){
            return res.status(400).json({success: false, error: "No leaves data available"})
        }
        return res.status(200).json({success: true, leaves})
    }catch(error){
        console.error(error)
        return res.status(500).json({success: false, error: error.message || "Server error fetching leaves"})
    }
}

export const fetchLeaveById = async(req, res) =>{
    try{
        const {id} = req.params;
       
        
        // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid leave ID format" 
        });
      }

        const leave = await Leave.findById(id).populate({path: 'employeeId', populate: [{path: 'userId'}]})
        if(!leave){
            return res.status(404).json({success: false, error: 'No leave record found'})
        }
        
        return res.status(200).json({success: true, leave})
    }catch(error){
        console.error(error)
        return res.status(500).json({success: false, error: "Server error fetching leaves"})
    }
}

export const fetchLeaves = async(req, res) =>{
    try{
        
        //Now that we have gotten the employee, we use their employeeId in the leaves table to find leaves for that particular employee.
        //Now I find all leaves where employeeId is the same as employee._id
        const leaves = await Leave.find().populate({path: 'employeeId', populate: [ {path: 'userId'}, {path: 'department'}]})
        if(!leaves || leaves.length <1){
            return res.status(400).json({success: false, error: "No leaves data available"})
        }
        return res.status(200).json({success: true, leaves})
    }catch(error){
        console.error(error)
        return res.status(500).json({success: false, error: error.message || "Server error fetching leaves"})
    }
}

export const updateLeave = async(req, res) =>{
    try{
        const {id} = req.params;
        const {status} = req.body;

        const leaveExists = await Leave.findOne({_id: id})
        
        if(!leaveExists){
            return res.status(404).json({success: false, error: 'Leave doesnot exist'})
        }
        await Leave.findByIdAndUpdate(id, {status}, {new: true})
        return res.status(200).json({success:true, message: 'Leave updated successfully'})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success: false, error: 'Server error adding leave'})
    }

}