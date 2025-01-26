import mongoose, { Schema } from "mongoose";

const employeeSchema = mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}, //for every employee, I create a User account. Employee has 1 to 1 connection with user,
    // emp_name: {type: String, required: true}, already in User,
    // email: {type: String, required: true},
    //tel: {type: String},
    department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true},
    salary: {type: String, required: true},
    // role: {type: String, enum: ['admin', 'employee']}, already in User model,
    // image: {type: String} already in User model,
    
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee