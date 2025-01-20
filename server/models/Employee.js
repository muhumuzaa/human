import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    emp_name: {type: String, required: true},
    email: {type: String},
    tel: {type: String},
    department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true},
    salary: {type: String, required: true},
    image: {type: String}
    
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee