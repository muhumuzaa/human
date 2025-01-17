import { Department } from "../models/Department.js"
import Employee from "../models/Employee.js"


const addEmployee = async(req, res) =>{
    try{
        const {emp_name, email, tel, salary, department} = req.body
        if(!emp_name || !email ||!department){
            return res.status(404).json({success: false, error: 'Required fields are missing'})
        }

        const deptExisits = await Department.findById(department)
        if(!deptExisits){
            return res.status(404).json({success: false, error: "The selected dept does not exist"})
        }
        const newEmployee = new Employee({
            emp_name, email, tel, salary, department
        })
    
        await newEmployee.save()
        return res.status(201).json({success: true, message: 'New employee added successfully', employee:newEmployee})
    }catch(error){
        console.error('Error adding employee: ',error.message)
        return res.status(500).json({success: false, error: 'Server error when creating an employ: ' })
    }
   
}

export {addEmployee}