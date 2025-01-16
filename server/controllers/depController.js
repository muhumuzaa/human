import { Department } from "../models/Department.js";

const addDepartment = async(req, res) =>{
    try{
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name, description
        })
        await newDep.save()
        res.status(200).json({success: true, department: newDep})
    }catch(error){
        res.status(500).json({success: false, error: 'Server error while adding department'})
    }
}

const getDepartments = async(req, res) =>{
    try{
        const departments = await Department.find()
        if(departments){
            return res.status(200).json({success: true, departments})
        }else{
            return res.status(404).json({success: false, error: 'Error fetching the list of departments'})
        }
    }catch(error){
        return res.status(500).json({success: false, error: 'Server error fetching department list'})
    }
}
export {addDepartment, getDepartments}