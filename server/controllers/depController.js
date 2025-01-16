import { Department } from "../models/Department.js";

const addDepartment = async(req, res) =>{
    try{ 
        
        const {dep_name, description} = req.body;
        if(!req.body.dep_name || !req.body.description){
            return res.status(404).json({success: false, error: 'A field is missing data'})
        }
        const newDep = new Department({
            dep_name, description
        })
        await newDep.save()
        return res.status(200).json({success: true, department: newDep, message: 'Successfully added new department'})
    }catch(error){
        return res.status(500).json({success: false, error: 'Server error while adding department'})
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

const delDepartment = async(req, res) =>{
    try{
        const {id } = await req.query
        if(!id){
            return res.status(404).json({success: false, error: 'There is no department ID provided'})
        }
        const depToDelete = await Department.findByIdAndDelete(id);
        if(!depToDelete){
            return res.status(404).json({success: false, error: 'Department was not found'})
        }
        return res.status(200).json({success: true, message: 'Department deleted successfully'})

    }catch(error){
        return res.status(500).json({success: false, error: 'Server error on deleting department'})
    }
    
}
export {addDepartment, getDepartments, delDepartment}