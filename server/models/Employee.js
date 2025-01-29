import mongoose, { Schema } from "mongoose";

const employeeSchema = mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
    department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true},
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee