import mongoose, { Schema } from "mongoose";

const leaveSchema = mongoose.Schema({
    employeeId: {type: Schema.Types.ObjectId, ref: 'Employee', required: true},
    leaveType: {type: String, enum: ['Sick leave', 'Casual leave', 'Annual leave'], required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true},
    status: {type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'}
}, {timestamps: true})

const Leave = mongoose.model('Leave', leaveSchema)
export default Leave